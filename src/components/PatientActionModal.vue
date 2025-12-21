<template>
  <div v-if="isOpen" class="modal fade show" tabindex="-1" style="display: block; background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        
        <div class="modal-header">
          <div>
            <h5 class="modal-title">Review: {{ patient?.name }}</h5>
            <small class="text-muted">Form: {{ submission?.formName }}</small>
          </div>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <a class="nav-link" :class="{ active: activeTab === 'decision' }" href="#" @click.prevent="activeTab = 'decision'">Clinical Decision Support</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{ active: activeTab === 'readOnly' }" href="#" @click.prevent="activeTab = 'readOnly'">View Patient Response</a>
            </li>
          </ul>

          <div v-if="activeTab === 'decision' && analysis">
            
            <div v-if="analysis.action === 'EMERGENCY'" class="alert alert-danger border-start border-4 border-danger">
              <h6 class="alert-heading fw-bold"><i class="bi bi-exclamation-triangle-fill"></i> CRITICAL FLAG DETECTED</h6>
              <p class="mb-0">{{ analysis.messages[0] }}</p>
            </div>

            <h6 class="mb-3">Recommended Next Steps</h6>
            <div class="row g-3">
              <div v-for="(item, index) in analysis.suggestions" :key="index" class="col-12">
                <div class="card border h-100" :class="item.type === 'form' ? 'bg-soft-primary border-primary' : 'bg-soft-success border-success'">
                  <div class="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <span class="badge mb-2" :class="item.type === 'form' ? 'bg-primary' : 'bg-success'">
                        {{ item.type === 'form' ? 'ASSIGN FORM' : 'APPOINTMENT' }}
                      </span>
                      <h6 class="card-title mb-1">{{ item.name }}</h6>
                      <small class="text-dark">Logic: {{ item.reason }}</small>
                    </div>
                    
                    <div v-if="item.type === 'form'">
                      <button 
                        class="btn btn-sm btn-primary" 
                        @click="assignForm(item)"
                        :disabled="loading"
                      >
                        <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                        {{ loading ? 'Sending...' : 'Send Form' }}
                      </button>
                    </div>
                    <div v-else>
                      <button class="btn btn-sm btn-success" @click="scheduleAppointment">
                        Schedule Now
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'readOnly' && submission">
            <div class="alert alert-light border d-flex justify-content-between align-items-center">
              <strong>Total Score:</strong> 
              <span class="fs-6 text-dark">{{ submission.score }} / 27</span>
            </div>
            <div class="list-group list-group-flush">
              <div v-for="(value, key) in submission.data" :key="key" class="list-group-item px-0 py-3">
                <div class="d-flex justify-content-between">
                  <div class="me-3">
                    <small class="text-muted text-uppercase fw-bold d-block mb-1">{{ key }}</small>
                    <p class="mb-0">{{ getQuestionText(key) }}</p>
                  </div>
                  <div class="text-end" style="min-width: 140px;">
                    <span class="badge bg-soft-primary text-primary border border-primary p-2">
                       {{ getAnswerText(value) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { supabase } from '@/supabase' 
import { determineNextSteps } from '@/utilities/dsmLogic' 
import { QUESTION_MAPPING, ANSWER_MAPPING } from '@/utilities/formQuestions'

export default {
  props: {
    isOpen: Boolean,
    patient: Object,
    submission: Object
  },
  // 1. UPDATE: Added 'assignment-success' here
  emits: ['close', 'assignment-success'],
  setup(props, { emit }) {
    const activeTab = ref('decision')
    const analysis = ref(null)
    const loading = ref(false)

    watch(() => props.submission, (newVal) => {
      if (newVal) {
        analysis.value = determineNextSteps(newVal.formId || 'level-1-adult', newVal.data || {})
      }
    }, { immediate: true })

    const closeModal = () => {
      emit('close')
    }

    const assignForm = async (recommendation) => {
      if (!props.patient?.id) {
        alert("Error: Patient ID missing.")
        return
      }

      loading.value = true
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("Not authenticated")

        const newAssignment = {
          doctor_id: user.id,
          patient_id: props.patient.id,
          form_id: recommendation.id,
          form_title: recommendation.name, 
          status: 'Pending',
          created_at: new Date()
        }

        const { error } = await supabase
          .from('assignments')
          .insert(newAssignment)

        if (error) throw error

        // 2. UPDATE: Removed 'alert()' and replaced with emit
        emit('assignment-success') 
        closeModal()
        
      } catch (err) {
        console.error("Assignment Failed:", err)
        alert(`Assignment Failed: ${err.message}`)
      } finally {
        loading.value = false
      }
    }

    const scheduleAppointment = () => {
      alert("Opening Scheduling Calendar... (Integration Placeholder)")
    }

    const getQuestionText = (key) => {
      const formId = props.submission?.formId || 'level-1-adult'
      return QUESTION_MAPPING[formId]?.[key] || `Question ${key}`
    }

    const getAnswerText = (val) => {
      return ANSWER_MAPPING[val] || val
    }

    return { 
      activeTab, 
      analysis, 
      loading,
      closeModal, 
      assignForm, 
      scheduleAppointment,
      getQuestionText, 
      getAnswerText 
    }
  }
}
</script>