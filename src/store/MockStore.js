import { reactive, watch } from 'vue'
import { supabase } from '@/supabase' 

const STORAGE_KEY = 'dsm_dashboard_db_v2' 

// Standard System Forms
const SYSTEM_FORMS = [
  { id: 'phq-9', title: 'PHQ-9', fullName: 'Patient Health Questionnaire-9', description: 'A 9-item depression screening and severity monitoring tool.', type: 'system' },
  { id: 'gad-7', title: 'GAD-7', fullName: 'Generalized Anxiety Disorder-7', description: 'A 7-item screening tool for generalized anxiety disorder.', type: 'system' },
  { id: 'asrs', title: 'ASRS-v1.1', fullName: 'Adult ADHD Self-Report Scale', description: 'A 6-item screener to identify symptoms consistent with adult ADHD.', type: 'system' },
  { id: 'pcl-5', title: 'PCL-5', fullName: 'PTSD Checklist for DSM-5', description: 'A 20-item self-report measure that assesses PTSD symptoms.', type: 'system' },
  { id: 'mdq', title: 'MDQ', fullName: 'Mood Disorder Questionnaire', description: 'A screening tool for bipolar I disorder.', type: 'system' },
  { id: 'audit', title: 'AUDIT', fullName: 'Alcohol Use Disorders ID Test', description: 'A 10-item screening tool to assess alcohol consumption.', type: 'system' },
  { id: 'ccsm-level1', title: 'DSM-5 Level 1', fullName: 'DSM-5 Level 1 Cross-Cutting', description: 'A 23-item measure assessing mental health domains.', type: 'system' },
  { id: 'level-2-depression', title: 'Level 2: Depression', fullName: 'Level 2: Depression (PHQ-9)', description: 'Detailed assessment for depression severity.', type: 'system' },
  { id: 'level-2-anxiety', title: 'Level 2: Anxiety', fullName: 'Level 2: Anxiety (GAD-7)', description: 'Anxiety severity assessment.', type: 'system' }
]

const defaultState = {
  currentUser: { id: 'p1', name: 'Patient User', avatar: '' },
  assignments: [],
  customForms: [] 
}

const storedState = localStorage.getItem(STORAGE_KEY)
const state = reactive(storedState ? JSON.parse(storedState) : defaultState)

// --- HELPER: Validate UUID format ---
// Checks if ID is a valid database key (e.g. "a1b2c3d4-...")
const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

// --- AUTO-CLEANUP: Delete broken assignments on load ---
// This deletes "34" so you can start fresh with working assignments
const validAssignments = state.assignments.filter(a => isValidUUID(a.id))
if (validAssignments.length !== state.assignments.length) {
    console.log(`Cleaned up ${state.assignments.length - validAssignments.length} invalid assignments.`)
    state.assignments = validAssignments
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

watch(state, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

// --- HELPER: Generate Valid UUIDs ---
const generateUUID = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const useMockStore = () => {

  const getLibraryForms = () => [...SYSTEM_FORMS, ...state.customForms]

  const createCustomForm = (meta, questions) => {
    const newId = `custom-${Date.now()}`
    state.customForms.push({
      id: newId,
      title: meta.title,
      fullName: meta.title, 
      description: meta.description,
      population: meta.population,
      specialty: meta.specialty,
      questions: questions, 
      type: 'custom'
    })
  }

  const getFormDefinition = (formId) => {
    const custom = state.customForms.find(f => f.id === formId)
    if (custom) return custom
    return SYSTEM_FORMS.find(f => f.id === formId)
  }

  const assignForm = async (patientId, formId, formName, description) => {
    // Check duplicates
    if (state.assignments.find(a => a.patientId === patientId && a.formId === formId && a.status === 'Pending')) return

    // 1. Generate Valid UUID (Critical for DB)
    const newAssignmentId = generateUUID()
    const isCustom = formId.startsWith('custom-')
    const link = isCustom ? `/dashboard/dsm-hub/custom/${formId}` : `/dashboard/dsm-hub/${formId}-test`
    
    // 2. Update Local State (Immediate Feedback)
    state.assignments.unshift({
      id: newAssignmentId,
      patientId, formId, name: formName, description,
      status: 'Pending', statusVariant: 'primary',
      dueDate: new Date().toISOString(), link,
      results: null, scoreSummary: null, recommendations: []
    })

    // 3. Update Supabase
    try {
        await supabase.from('assignments').insert({
            id: newAssignmentId,
            patient_id: patientId,
            form_id: formId,
            form_title: formName,
            form_description: description,
            status: 'Pending',
            created_at: new Date().toISOString()
        })
    } catch (err) {
        console.error("Error assigning form to DB:", err)
    }
  }

  const submitAssessment = async (assignmentIdOrFormId, formData) => {
    // 1. Find assignment
    let assignment = state.assignments.find(a => a.id === assignmentIdOrFormId)
    if (!assignment) {
        assignment = state.assignments.find(a => a.formId === assignmentIdOrFormId && a.status !== 'Completed')
    }

    if (assignment) {
      // 2. Score & Update Local
      const sum = Object.values(formData).reduce((a, b) => Number(a) + Number(b), 0)
      let scoreSummary = `Score: ${sum}`
      let recs = []

      if (assignment.formId.startsWith('custom-')) {
          recs = [{ name: 'Review Complete', reason: 'Custom assessment filed.' }]
      } else {
          scoreSummary = calculateSystemScore(assignment.formId, formData)
          recs = generateSystemRecs(assignment.formId, formData)
      }
      
      assignment.status = 'Completed'
      assignment.statusVariant = 'success'
      assignment.lastActivity = 'Just Now'
      assignment.results = formData
      assignment.scoreSummary = scoreSummary
      assignment.recommendations = recs

      // 3. Update Supabase
      // We removed the blocking 'if' check. We now try to save everything.
      try {
        const { error } = await supabase.from('assignments').update({
                status: 'Completed',
                results: formData,
                // score_summary: scoreSummary, 
                // recommendations: recs      
            }).eq('id', assignment.id)
        
        if (error) console.error("Supabase Write Error:", error)
        else console.log("Assessment saved to database successfully.")
        
      } catch (err) {
        console.error("Submission Error:", err)
      }
    }
  }

  // Scoring Helpers
  const calculateSystemScore = (formId, data) => {
    const sum = Object.values(data).reduce((a, b) => Number(a) + Number(b), 0)
    if (formId === 'phq-9' || formId === 'level-2-depression') return `Score: ${sum} / 27`
    if (formId === 'gad-7' || formId === 'level-2-anxiety') return `Score: ${sum} / 21`
    if (formId === 'ccsm-level1') return `${Object.values(data).filter(v => Number(v) >= 2).length} Flagged`
    return `Score: ${sum}`
  }

  const generateSystemRecs = (formId, data) => {
    const s = Object.values(data).reduce((a, b) => Number(a) + Number(b), 0)
    if (['phq-9','level-2-depression','gad-7','level-2-anxiety'].includes(formId)) {
        return [{ name: s >= 10 ? 'Consult' : 'Monitor', reason: `Score ${s}` }]
    }
    return []
  }

  const getPatientAssignments = (pid) => state.assignments.filter(a => a.patientId === pid)
  const getAssignment = (fid) => state.assignments.find(a => a.formId === fid)
  const getAllPatientActivity = () => [] 
  const resetDemo = () => { localStorage.removeItem(STORAGE_KEY); location.reload() }

  return { state, getLibraryForms, createCustomForm, getFormDefinition, assignForm, submitAssessment, getPatientAssignments, getAssignment, getAllPatientActivity, resetDemo }
}