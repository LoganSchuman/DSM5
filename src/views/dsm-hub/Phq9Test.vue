<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">PHQ-9 (Patient Health Questionnaire-9)</h4>
              <span v-if="isReadOnly" class="badge bg-success">Completed</span>
            </div>
          </b-card-header>
          <b-card-body>
            <p>
              Over the <strong>last 2 weeks</strong>, how often have you been bothered by any of the following problems?
            </p>
            
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
                >
                </b-form-radio-group>
              </b-form-group>

              <hr class="my-4">

              <div class="d-flex gap-2 flex-wrap mt-4">
                <b-button v-if="!isReadOnly" variant="primary" type="submit">Submit Assessment</b-button>
                <b-button variant="secondary" type="button" @click="$router.push({name: 'default.user-dashboard'})">
                    {{ isReadOnly ? 'Back to Dashboard' : 'Cancel' }}
                </b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useMockStore } from '@/store/MockStore.js'

const router = useRouter()
const { submitAssessment, getAssignment } = useMockStore()
const isReadOnly = ref(false)

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

onMounted(() => {
    // Check if PHQ-9 is assigned and completed
    const assignment = getAssignment('phq-9')
    if (assignment && assignment.status === 'Completed' && assignment.results) {
        formData.value = assignment.results
        isReadOnly.value = true
    }
})

const handleSubmit = () => {
  const answered = Object.values(formData.value).filter(v => v !== null).length
  if (answered < 9) {
      Swal.fire('Incomplete', 'Please answer all questions before submitting.', 'warning')
      return
  }
  
  submitAssessment('phq-9', formData.value)
  
  Swal.fire({
    title: 'Assessment Submitted',
    text: 'Your PHQ-9 results have been sent to your physician.',
    icon: 'success',
    confirmButtonText: 'Return to Dashboard',
    confirmButtonColor: '#3a57e8'
  }).then(() => {
    router.push({ name: 'default.user-dashboard' })
  })
}
</script>