<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">PHQ-9 (Patient Health Questionnaire-9)</h4>
              <span v-if="isReadOnly" class="badge bg-success">Completed - Score: {{ loadedScore }}</span>
            </div>
          </b-card-header>
          <b-card-body>
            <div v-if="isLoading" class="text-center py-4">
              <b-spinner variant="primary"></b-spinner>
              <p class="mt-2 text-muted">Loading assignment...</p>
            </div>

            <div v-else>
              <p>Over the <strong>last 2 weeks</strong>, how often have you been bothered by any of the following problems?</p>
              
              <b-form @submit.prevent="handleSubmit">
                <b-form-group 
                  v-for="question in questions" 
                  :key="question.id"
                  :label="`${question.id}. ${question.text}`"
                  label-class="form-label" 
                  class="mb-4">
                  <b-form-radio-group 
                    v-model="formData[`q${question.id}`]" 
                    :options="options" 
                    :disabled="isReadOnly"
                    class="d-flex flex-column flex-sm-row gap-3"
                  ></b-form-radio-group>
                </b-form-group>

                <hr class="my-4">

                <div class="d-flex gap-2 flex-wrap mt-4">
                  <b-button v-if="!isReadOnly" variant="primary" type="submit" :disabled="isSubmitting">
                    {{ isSubmitting ? 'Submitting...' : 'Submit Assessment' }}
                  </b-button>
                  <b-button variant="secondary" type="button" @click="$router.push({name: 'default.user-dashboard'})">
                    {{ isReadOnly ? 'Back to Dashboard' : 'Cancel' }}
                  </b-button>
                </div>
              </b-form>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import { supabase } from '@/supabase' 

const router = useRouter()
const route = useRoute()

const isReadOnly = ref(false)
const isLoading = ref(true)
const isSubmitting = ref(false)
const currentAssignmentId = ref(null)
const loadedScore = ref(0)

const options = [
  { text: 'Not at all (0)', value: '0' },
  { text: 'Several days (1)', value: '1' },
  { text: 'More than half the days (2)', value: '2' },
  { text: 'Nearly every day (3)', value: '3' }
]

const questions = [
  { id: 1, text: 'Little interest or pleasure in doing things?' },
  { id: 2, text: 'Feeling down, depressed, or hopeless?' },
  { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much?' },
  { id: 4, text: 'Feeling tired or having little energy?' },
  { id: 5, text: 'Poor appetite or overeating?' },
  { id: 6, text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down?' },
  { id: 7, text: 'Trouble concentrating on things, such as reading the newspaper or watching television?' },
  { id: 8, text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual?' },
  { id: 9, text: 'Thoughts that you would be better off dead or of hurting yourself in some way?' }
]

const initialData = {}
for (let i = 1; i <= 9; i++) { initialData[`q${i}`] = null }
const formData = ref({ ...initialData })

onMounted(async () => {
  isLoading.value = true
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    let query = supabase.from('assignments').select('*').eq('patient_id', user.id).eq('form_id', 'phq-9')
    
    // If a specific assignment ID was passed (from "View" button), load that one
    if (route.query.assignmentId) {
      query = query.eq('id', route.query.assignmentId)
    } else {
      // Otherwise find the latest pending one
      query = query.neq('status', 'Completed').order('created_at', { ascending: false }).limit(1)
    }

    const { data } = await query

    if (data && data.length > 0) {
      const assignment = data[0]
      currentAssignmentId.value = assignment.id

      // If viewing a completed form, load the data
      if (assignment.status === 'Completed') {
        isReadOnly.value = true
        loadedScore.value = assignment.score || 0
        if (assignment.answers) {
          formData.value = assignment.answers
        }
      }
    } else {
      // Fallback: If no pending form found, maybe look for any completed one?
      if (!route.query.assignmentId) {
         // Just logic to handle edge cases
      }
    }
  }
  isLoading.value = false
})

const handleSubmit = async () => {
  // 1. Validate
  const answered = Object.values(formData.value).filter(v => v !== null).length
  if (answered < 9) {
      Swal.fire('Incomplete', 'Please answer all questions before submitting.', 'warning')
      return
  }

  // 2. Calculate Score
  let totalScore = 0
  Object.values(formData.value).forEach(val => {
    totalScore += parseInt(val)
  })

  isSubmitting.value = true

  try {
    // 3. Save to Supabase
    const { error } = await supabase
      .from('assignments')
      .update({ 
        status: 'Completed',
        score: totalScore,
        answers: formData.value,
        created_at: new Date().toISOString() // Update timestamp to show "completed at"
      })
      .eq('id', currentAssignmentId.value)

    if (error) throw error
    
    Swal.fire({
      title: 'Assessment Submitted',
      text: `Your PHQ-9 Score: ${totalScore}. Results sent to physician.`,
      icon: 'success',
      confirmButtonText: 'Return to Dashboard',
      confirmButtonColor: '#3a57e8'
    }).then(() => {
      router.push({ name: 'default.user-dashboard' })
    })

  } catch (err) {
    console.error('Submission error:', err)
    Swal.fire('Error', 'Failed to submit. Please try again.', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>