<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">AUDIT (Alcohol Use Disorders Identification Test)</h4>
              <span v-if="isReadOnly" class="badge bg-success">Completed</span>
            </div>
          </b-card-header>
          <b-card-body>
            <p>Please select the answer that is correct for you during the <strong>past year</strong>.</p>
            
            <b-form @submit.prevent="handleSubmit">
              <template v-for="(section, sectionIndex) in sections" :key="sectionIndex">
                <h5 v-if="section.title" class="mt-4 mb-3">{{ section.title }}</h5>
                <b-form-group 
                  v-for="question in section.questions" 
                  :key="question.id"
                  :label="`${question.id}. ${question.text}`"
                  label-class="form-label" 
                  class="mb-3">
                  <b-form-radio-group 
                    v-model="formData[`q${question.id}`]" 
                    :options="question.options" 
                    :disabled="isReadOnly"
                    stacked>
                  </b-form-radio-group>
                </b-form-group>
                <hr v-if="sectionIndex < sections.length - 1">
              </template>

              <div class="d-flex gap-2 flex-wrap mt-4">
                <b-button v-if="!isReadOnly" variant="primary" type="submit">Submit Form</b-button>
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

const sections = [
  {
    title: 'Consumption',
    questions: [
      { id: 1, text: 'How often do you have a drink containing alcohol?', options: [{ text: 'Never (0)', value: '0' }, { text: 'Monthly or less (1)', value: '1' }, { text: '2-4 times a month (2)', value: '2' }, { text: '2-3 times a week (3)', value: '3' }, { text: '4 or more times a week (4)', value: '4' }] },
      { id: 2, text: 'How many drinks containing alcohol do you have on a typical day when you are drinking?', options: [{ text: '1 or 2 (0)', value: '0' }, { text: '3 or 4 (1)', value: '1' }, { text: '5 or 6 (2)', value: '2' }, { text: '7 to 9 (3)', value: '3' }, { text: '10 or more (4)', value: '4' }] },
      { id: 3, text: 'How often do you have six or more drinks on one occasion?', options: [{ text: 'Never (0)', value: '0' }, { text: 'Less than monthly (1)', value: '1' }, { text: 'Monthly (2)', value: '2' }, { text: 'Weekly (3)', value: '3' }, { text: 'Daily or almost daily (4)', value: '4' }] }
    ]
  },
  {
    title: 'Dependence',
    questions: [
      { id: 4, text: 'How often during the last year have you found that you were not able to stop drinking once you had started?', options: [{ text: 'Never (0)', value: '0' }, { text: 'Less than monthly (1)', value: '1' }, { text: 'Monthly (2)', value: '2' }, { text: 'Weekly (3)', value: '3' }, { text: 'Daily or almost daily (4)', value: '4' }] },
      { id: 5, text: 'How often during the last year have you failed to do what was normally expected of you because of drinking?', options: [{ text: 'Never (0)', value: '0' }, { text: 'Less than monthly (1)', value: '1' }, { text: 'Monthly (2)', value: '2' }, { text: 'Weekly (3)', value: '3' }, { text: 'Daily or almost daily (4)', value: '4' }] },
      { id: 6, text: 'How often during the last year have you needed a first drink in the morning to get yourself going after a heavy drinking session?', options: [{ text: 'Never (0)', value: '0' }, { text: 'Less than monthly (1)', value: '1' }, { text: 'Monthly (2)', value: '2' }, { text: 'Weekly (3)', value: '3' }, { text: 'Daily or almost daily (4)', value: '4' }] }
    ]
  },
  {
    title: 'Alcohol-Related Problems',
    questions: [
      { id: 7, text: 'How often during the last year have you had a feeling of guilt or remorse after drinking?', options: [{ text: 'Never (0)', value: '0' }, { text: 'Less than monthly (1)', value: '1' }, { text: 'Monthly (2)', value: '2' }, { text: 'Weekly (3)', value: '3' }, { text: 'Daily or almost daily (4)', value: '4' }] },
      { id: 8, text: 'How often during the last year have you been unable to remember what happened the night before because of your drinking?', options: [{ text: 'Never (0)', value: '0' }, { text: 'Less than monthly (1)', value: '1' }, { text: 'Monthly (2)', value: '2' }, { text: 'Weekly (3)', value: '3' }, { text: 'Daily or almost daily (4)', value: '4' }] },
      { id: 9, text: 'Have you or someone else been injured because of your drinking?', options: [{ text: 'No (0)', value: '0' }, { text: 'Yes, but not in the last year (2)', value: '2' }, { text: 'Yes, during the last year (4)', value: '4' }] },
      { id: 10, text: 'Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down?', options: [{ text: 'No (0)', value: '0' }, { text: 'Yes, but not in the last year (2)', value: '2' }, { text: 'Yes, during the last year (4)', value: '4' }] }
    ]
  }
]

const initialData = Object.fromEntries(
  sections.flatMap(section => 
    section.questions.map(q => [`q${q.id}`, null])
  )
)

const formData = ref({ ...initialData })

onMounted(() => {
    // Check if AUDIT is assigned and completed
    const assignment = getAssignment('audit')
    if (assignment && assignment.status === 'Completed' && assignment.results) {
        formData.value = assignment.results
        isReadOnly.value = true
    }
})

const handleSubmit = () => {
  submitAssessment('audit', formData.value)
  
  Swal.fire({
    title: 'Assessment Submitted',
    text: 'Your AUDIT results have been sent to your physician.',
    icon: 'success',
    confirmButtonText: 'Return to Dashboard',
    confirmButtonColor: '#3a57e8'
  }).then(() => {
    router.push({ name: 'default.user-dashboard' })
  })
}
</script>