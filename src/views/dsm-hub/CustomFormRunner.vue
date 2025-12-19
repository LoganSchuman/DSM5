<template>
  <div v-if="formDef">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">{{ formDef.title }}</h4>
              <p class="mb-0 text-muted">
                  {{ formDef.description }} 
                  <span v-if="formDef.population" class="badge bg-soft-info ms-2">{{ formDef.population }}</span>
              </p>
            </div>
            <span v-if="isReadOnly" class="badge bg-success">Completed</span>
          </b-card-header>
          <b-card-body>
            <b-form @submit.prevent="handleSubmit">
              
              <template v-for="(q, idx) in formDef.questions" :key="q.id">
                  
                  <div v-if="shouldShowSectionHeader(idx)" class="mt-4 mb-3 border-bottom pb-2">
                      <h6 class="text-primary text-uppercase letter-spacing-1">{{ q.section || 'General' }}</h6>
                  </div>

                  <div v-if="checkDependency(q)" class="mb-4 fade-in-up">
                      
                      <div class="d-flex justify-content-between">
                        <label class="form-label fw-bold">
                            {{ getVisibleIndex(q.id) }}. {{ q.text }}
                            <span v-if="q.metadata?.required" class="text-danger">*</span>
                        </label>
                      </div>
                      
                      <div v-if="['scale04', 'yesno', 'freq', 'likert_agree', 'duration'].includes(q.type)">
                        <div class="d-flex flex-column gap-2 mt-1">
                             <div v-for="opt in getOptions(q.type)" :key="opt.value" class="form-check">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    :name="q.id" 
                                    :id="`${q.id}-${opt.value}`"
                                    :value="opt.value"
                                    v-model="formData[q.id]"
                                    :disabled="isReadOnly" 
                                    @change="handleLogicUpdate" 
                                >
                                <label class="form-check-label" :for="`${q.id}-${opt.value}`">
                                    {{ opt.text }}
                                </label>
                             </div>
                        </div>
                      </div>

                      <div v-else-if="q.type === 'number'">
                          <input type="number" class="form-control" style="max-width: 150px;" v-model="formData[q.id]" :disabled="isReadOnly">
                      </div>

                      <div v-else-if="q.type === 'text'">
                          <textarea class="form-control" rows="2" v-model="formData[q.id]" :disabled="isReadOnly"></textarea>
                      </div>

                  </div>
              </template>

              <div class="d-flex gap-2 mt-5">
                <b-button v-if="!isReadOnly" variant="primary" type="submit">Submit Assessment</b-button>
                <b-button variant="secondary" @click="$router.push({name: 'default.user-dashboard'})">
                    {{ isReadOnly ? 'Back to Dashboard' : 'Cancel' }}
                </b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
  <div v-else class="text-center p-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Loading form definition...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { supabase } from '@/supabase' 
import { useMockStore } from '@/store/MockStore.js'

const route = useRoute()
const router = useRouter()
const { getFormDefinition } = useMockStore()

const formId = route.params.id
const assignmentId = route.query.assignmentId // ID of the row in assignments table
const viewMode = route.query.mode // 'review' or 'edit'

const formDef = ref(null)
const formData = ref({})
const isReadOnly = ref(false)
const logicTrigger = ref(0) 

const optionSets = {
    scale04: [
        { text: '0 - None', value: '0' }, { text: '1 - Slight', value: '1' },
        { text: '2 - Mild', value: '2' }, { text: '3 - Moderate', value: '3' },
        { text: '4 - Severe', value: '4' }
    ],
    likert_agree: [
        { text: 'Strongly Disagree', value: '0' }, { text: 'Disagree', value: '1' },
        { text: 'Neutral', value: '2' }, { text: 'Agree', value: '3' },
        { text: 'Strongly Agree', value: '4' }
    ],
    yesno: [
        { text: 'No', value: '0' }, { text: 'Yes', value: '1' }
    ],
    freq: [
        { text: 'Never', value: '0' }, { text: 'Rarely', value: '1' },
        { text: 'Sometimes', value: '2' }, { text: 'Often', value: '3' },
        { text: 'Daily', value: '4' }
    ],
    duration: [
        { text: 'Less than 1 week', value: '0' }, { text: '1 - 4 weeks', value: '1' },
        { text: '1 - 3 months', value: '2' }, { text: 'More than 3 months', value: '3' }
    ]
}

const getOptions = (type) => optionSets[type] || []

onMounted(async () => {
    // 1. Load Definition
    formDef.value = getFormDefinition(formId)
    
    // 2. Init Empty Answers
    if (formDef.value) {
        formDef.value.questions.forEach((q) => {
            formData.value[q.id] = null 
        })
    }

    // 3. Set ReadOnly based on Query Param (Immediate UI Fix)
    if (viewMode === 'review') {
        isReadOnly.value = true
    }

    // 4. Load Data from Supabase if we have an assignment ID
    if (assignmentId) {
        try {
            const { data } = await supabase
                .from('assignments')
                .select('status, answers')
                .eq('id', assignmentId)
                .single()

            if (data) {
                // Check if we should enforce read-only from DB status as backup
                if (data.status === 'Completed') {
                    isReadOnly.value = true
                }

                // Parse Answers
                if (data.answers) {
                    let parsedAnswers = data.answers
                    if (typeof parsedAnswers === 'string') {
                        try { parsedAnswers = JSON.parse(parsedAnswers) } catch (e) { /**/ }
                    }
                    // Merge with defaults
                    formData.value = { ...formData.value, ...parsedAnswers }
                }
            }
        } catch (err) {
            console.error("Error fetching assignment:", err)
        }
    }
})

const handleLogicUpdate = () => { logicTrigger.value++ }

const checkDependency = (question) => {
    if (!question.logic || !question.logic.dependsOn) return true
    
    const parentId = question.logic.dependsOn
    const requiredValue = question.logic.value
    const actualValue = formData.value[parentId]
    
    return actualValue == requiredValue
}

const shouldShowSectionHeader = (idx) => {
    if (idx === 0) return true
    const currentQ = formDef.value.questions[idx]
    const prevQ = formDef.value.questions[idx - 1]
    return currentQ.section !== prevQ.section
}

const getVisibleIndex = (currentId) => {
    if (!formDef.value) return 0
    let count = 0
    for (const q of formDef.value.questions) {
        if (checkDependency(q)) count++
        if (q.id === currentId) return count
    }
    return count
}

const calculateScore = (data) => {
  let score = 0
  Object.values(data).forEach(val => {
    const num = parseInt(val)
    if (!isNaN(num)) {
      score += num
    }
  })
  return score
}

const handleSubmit = async () => {
    try {
        const updates = {
            status: 'Completed',
            answers: formData.value,
            score: calculateScore(formData.value)
        }

        const { error } = await supabase
            .from('assignments')
            .update(updates)
            .eq('id', assignmentId)

        if (error) throw error

        Swal.fire({
            icon: 'success',
            title: 'Submitted',
            text: 'Results sent to physician.',
            timer: 1500
        }).then(() => {
            router.push({name: 'default.user-dashboard'})
        })

    } catch (err) {
        console.error('Submission error:', err)
        Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: err.message
        })
    }
}
</script>

<style scoped>
.fade-in-up {
    animation: fadeInUp 0.4s ease-out;
}
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>