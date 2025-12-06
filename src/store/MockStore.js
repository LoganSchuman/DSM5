import { reactive, watch } from 'vue'

const STORAGE_KEY = 'dsm_dashboard_db_v2' 

// STANDARD SYSTEM FORMS (Hardcoded .vue files)
// These match the IDs used in your router for the specific .vue files
const SYSTEM_FORMS = [
  { id: 'phq-9', title: 'PHQ-9', fullName: 'Patient Health Questionnaire-9', description: 'A 9-item depression screening and severity monitoring tool.', type: 'system' },
  { id: 'gad-7', title: 'GAD-7', fullName: 'Generalized Anxiety Disorder-7', description: 'A 7-item screening tool for generalized anxiety disorder.', type: 'system' },
  { id: 'asrs', title: 'ASRS-v1.1', fullName: 'Adult ADHD Self-Report Scale', description: 'A 6-item screener to identify symptoms consistent with adult ADHD.', type: 'system' },
  { id: 'pcl-5', title: 'PCL-5', fullName: 'PTSD Checklist for DSM-5', description: 'A 20-item self-report measure that assesses PTSD symptoms.', type: 'system' },
  { id: 'mdq', title: 'MDQ', fullName: 'Mood Disorder Questionnaire', description: 'A screening tool for bipolar I disorder.', type: 'system' },
  { id: 'audit', title: 'AUDIT', fullName: 'Alcohol Use Disorders ID Test', description: 'A 10-item screening tool to assess alcohol consumption.', type: 'system' },
  { id: 'ccsm-level1', title: 'DSM-5 Level 1', fullName: 'DSM-5 Level 1 Cross-Cutting', description: 'A 23-item measure assessing mental health domains.', type: 'system' }
]

const defaultState = {
  currentUser: { id: 'p1', name: 'Patient User', avatar: require('@/assets/images/shapes/01.png') },
  assignments: [],
  customForms: [] // Store user-created forms here
}

const storedState = localStorage.getItem(STORAGE_KEY)
const state = reactive(storedState ? JSON.parse(storedState) : defaultState)

watch(state, (newVal) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
}, { deep: true })

// --- LOGIC ---

export const useMockStore = () => {

  // 1. Get ALL Forms (System + Custom)
  const getLibraryForms = () => {
    return [...SYSTEM_FORMS, ...state.customForms]
  }

  // 2. Create a New Custom Form
  const createCustomForm = (meta, questions) => {
    const newId = `custom-${Date.now()}`
    const newForm = {
      id: newId,
      title: meta.title,
      fullName: meta.title, // Use title as full name for simplicity
      description: meta.description,
      questions: questions, // Array of objects
      type: 'custom'
    }
    state.customForms.push(newForm)
  }

  // 3. Get a specific form definition (Used by the Runner)
  const getFormDefinition = (formId) => {
    // First check custom forms
    const custom = state.customForms.find(f => f.id === formId)
    if (custom) return custom
    
    // Fallback for system forms if needed (though usually handled by specific .vue files)
    return SYSTEM_FORMS.find(f => f.id === formId)
  }

  // 4. Assign Form (Handles System vs Custom links)
  const assignForm = (patientId, formId, formName, description) => {
    // Check duplicates
    if (state.assignments.find(a => a.patientId === patientId && a.formId === formId)) return

    // Determine Link: System forms have hardcoded .vue files, Custom ones use the Dynamic Runner
    const isCustom = formId.startsWith('custom-')
    const link = isCustom 
        ? `/dashboard/dsm-hub/custom/${formId}` 
        : `/dashboard/dsm-hub/${formId}-test`

    state.assignments.unshift({
      id: Date.now().toString(),
      patientId,
      formId,
      name: formName,
      description,
      status: 'Pending',
      statusVariant: 'primary',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      link: link,
      lastActivity: new Date().toLocaleDateString(),
      results: null,
      scoreSummary: null,
      recommendations: []
    })
  }

  // 5. Submit Assessment
  const submitAssessment = (assignmentId, formData) => {
    const assignment = state.assignments.find(a => a.formId === assignmentId)
    if (assignment) {
      assignment.status = 'Completed'
      assignment.statusVariant = 'success'
      assignment.lastActivity = 'Just Now'
      assignment.results = formData
      
      // Basic Score Calculation
      const sum = Object.values(formData).reduce((a, b) => Number(a) + Number(b), 0)
      
      // Custom forms usually rely on summation
      if (assignment.formId.startsWith('custom-')) {
          assignment.scoreSummary = `Total Score: ${sum}`
          assignment.recommendations = [{ formId: 'none', name: 'Review Complete', reason: 'Custom assessment filed.' }]
      } else {
          // Use existing logic helpers for system forms
          assignment.scoreSummary = calculateSystemScore(assignment.formId, formData)
          assignment.recommendations = generateSystemRecs(assignment.formId, formData)
      }
    }
  }

  // 6. Helpers (System Specific)
  const calculateSystemScore = (formId, data) => {
    const sum = Object.values(data).reduce((a, b) => Number(a) + Number(b), 0)
    if (formId === 'phq-9') return `Score: ${sum} / 27`
    if (formId === 'gad-7') return `Score: ${sum} / 21`
    if (formId === 'audit') return `Score: ${sum} / 40`
    if (formId === 'ccsm-level1') {
        const flagged = Object.values(data).filter(v => Number(v) >= 2).length
        return `${flagged} Domains Flagged`
    }
    return 'Completed'
  }

  const generateSystemRecs = (formId, data) => {
    const recs = []
    if (formId === 'ccsm-level1') {
      if (data.q1 >= 2 || data.q2 >= 2) recs.push({ formId: 'phq-9', name: 'PHQ-9', reason: 'Depression flagged.' })
      if (data.q6 >= 2 || data.q7 >= 2 || data.q8 >= 2) recs.push({ formId: 'gad-7', name: 'GAD-7', reason: 'Anxiety flagged.' })
      if (data.q21 >= 2 || data.q23 >= 2) recs.push({ formId: 'audit', name: 'AUDIT', reason: 'Substance use flagged.' })
      if (recs.length === 0) recs.push({ formId: 'none', name: 'No Action', reason: 'Normal limits.' })
    }
    else if (formId === 'phq-9') {
        const s = Object.values(data).reduce((a, b) => Number(a) + Number(b), 0)
        recs.push({ formId: s >= 10 ? 'consult' : 'none', name: s >= 10 ? 'Consult' : 'Monitor', reason: `Score ${s}` })
    }
    else if (formId === 'gad-7') {
        const s = Object.values(data).reduce((a, b) => Number(a) + Number(b), 0)
        recs.push({ formId: s >= 10 ? 'consult' : 'none', name: s >= 10 ? 'Consult' : 'Monitor', reason: `Score ${s}` })
    }
    else if (formId === 'audit') {
        const s = Object.values(data).reduce((a, b) => Number(a) + Number(b), 0)
        recs.push({ formId: s >= 8 ? 'consult' : 'none', name: s >= 8 ? 'Referral' : 'Monitor', reason: `Score ${s}` })
    }
    return recs
  }

  const getPatientAssignments = (pid) => state.assignments.filter(a => a.patientId === pid)
  const getAssignment = (fid) => state.assignments.find(a => a.patientId === state.currentUser.id && a.formId === fid)
  const getAllPatientActivity = () => state.assignments.map(a => ({ ...a, patientName: state.currentUser.name, avatar: state.currentUser.avatar })).sort((a,b)=> new Date(b.lastActivity)-new Date(a.lastActivity))
  
  const resetDemo = () => {
    state.assignments = []
    state.customForms = []
    localStorage.removeItem(STORAGE_KEY)
    location.reload() 
  }

  return { state, getLibraryForms, createCustomForm, getFormDefinition, assignForm, submitAssessment, getPatientAssignments, getAssignment, getAllPatientActivity, resetDemo }
}