<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">DSM-5-TR Self-Rated Level 1 Cross-Cutting Symptom Measure—Adult</h4>
              <span v-if="isReadOnly" class="badge bg-success">Completed</span>
            </div>
          </b-card-header>
          <b-card-body>
            <p class="mb-4">
              <strong>Instructions:</strong> The questions below ask about things that might have bothered you. 
              For each question, select the number that best describes how much (or how often) you have been 
              bothered by each problem during the <strong>past TWO (2) WEEKS</strong>.
            </p>
            
            <b-form @submit.prevent="handleSubmit">
              <template v-for="(domain, dIndex) in domains" :key="dIndex">
                <div class="p-3 bg-soft-light rounded mb-3">
                  <h6 class="mb-1 text-primary">Domain {{ domain.roman }}: {{ domain.title }}</h6>
                </div>
                
                <b-form-group 
                  v-for="question in domain.questions" 
                  :key="question.id"
                  :label="`${question.id}. ${question.text}`"
                  label-class="form-label" 
                  class="mb-4 ms-2">
                  <b-form-radio-group 
                    v-model="formData[`q${question.id}`]" 
                    :options="options" 
                    :disabled="isReadOnly"
                    class="d-flex flex-column flex-sm-row gap-3"
                  >
                  </b-form-radio-group>
                </b-form-group>
                <hr v-if="dIndex < domains.length - 1" class="my-4">
              </template>

              <div class="d-flex gap-2 flex-wrap mt-4">
                <b-button v-if="!isReadOnly" variant="primary" type="submit">Submit Assessment</b-button>
                <b-button variant="secondary" type="button" @click="$router.push({name: 'default.user-dashboard'})">
                    {{ isReadOnly ? 'Return to Dashboard' : 'Cancel' }}
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
  { text: 'None (0)', value: '0' },
  { text: 'Slight (1)', value: '1' },
  { text: 'Mild (2)', value: '2' },
  { text: 'Moderate (3)', value: '3' },
  { text: 'Severe (4)', value: '4' }
]

const domains = [
  { roman: 'I', title: 'Depression', questions: [{ id: 1, text: 'Little interest or pleasure in doing things?' }, { id: 2, text: 'Feeling down, depressed, or hopeless?' }] },
  { roman: 'II', title: 'Anger', questions: [{ id: 3, text: 'Feeling more irritated, grouchy, or angry than usual?' }] },
  { roman: 'III', title: 'Mania', questions: [{ id: 4, text: 'Sleeping less than usual, but still have a lot of energy?' }, { id: 5, text: 'Starting lots more projects than usual or doing more risky things than usual?' }] },
  { roman: 'IV', title: 'Anxiety', questions: [{ id: 6, text: 'Feeling nervous, anxious, frightened, worried, or on edge?' }, { id: 7, text: 'Feeling panic or being frightened?' }, { id: 8, text: 'Avoiding situations that make you anxious?' }] },
  { roman: 'V', title: 'Somatic Symptoms', questions: [{ id: 9, text: 'Unexplained aches and pains (e.g., head, back, joints, abdomen, legs)?' }, { id: 10, text: 'Feeling that your illnesses are not being taken seriously enough?' }] },
  { roman: 'VI', title: 'Suicidal Ideation', questions: [{ id: 11, text: 'Thoughts of actually hurting yourself?' }] },
  { roman: 'VII', title: 'Psychosis', questions: [{ id: 12, text: 'Hearing things other people couldn’t hear, such as voices even when no one was around?' }, { id: 13, text: 'Feeling that someone could hear your thoughts, or that you could hear what another person was thinking?' }] },
  { roman: 'VIII', title: 'Sleep Problems', questions: [{ id: 14, text: 'Problems with sleep that affected your sleep quality over all?' }] },
  { roman: 'IX', title: 'Memory', questions: [{ id: 15, text: 'Problems with memory (e.g., learning new information) or with location (e.g., finding your way home)?' }] },
  { roman: 'X', title: 'Repetitive Thoughts/Behaviors', questions: [{ id: 16, text: 'Unpleasant thoughts, urges, or images that repeatedly enter your mind?' }, { id: 17, text: 'Feeling driven to perform certain behaviors or mental acts over and over again?' }] },
  { roman: 'XI', title: 'Dissociation', questions: [{ id: 18, text: 'Feeling detached or distant from yourself, your body, your physical surroundings, or your memories?' }] },
  { roman: 'XII', title: 'Personality Functioning', questions: [{ id: 19, text: 'Not knowing who you really are or what you want out of life?' }, { id: 20, text: 'Not feeling close to other people or enjoying your relationships with them?' }] },
  { roman: 'XIII', title: 'Substance Use', questions: [{ id: 21, text: 'Drinking at least 4 drinks of any kind of alcohol in a single day?' }, { id: 22, text: 'Smoking any cigarettes, a cigar, or pipe, or using snuff or chewing tobacco?' }, { id: 23, text: 'Using any of the following medicines ON YOUR OWN, that is, without a doctor’s prescription, in greater amounts or longer than prescribed?' }] }
]

// Initialize
const initialData = {}
for (let i = 1; i <= 23; i++) { initialData[`q${i}`] = null }
const formData = ref({ ...initialData })

onMounted(() => {
    // Check if this form is already assigned and completed
    const assignment = getAssignment('ccsm-level1')
    if (assignment && assignment.status === 'Completed' && assignment.results) {
        formData.value = assignment.results
        isReadOnly.value = true
    }
})

const handleSubmit = () => {
  const answered = Object.values(formData.value).filter(v => v !== null).length
  if (answered < 5) {
      Swal.fire('Incomplete', 'Please answer more questions before submitting.', 'warning')
      return
  }
  submitAssessment('ccsm-level1', formData.value)
  Swal.fire({
    title: 'Assessment Submitted',
    text: 'Your results have been sent to your physician for review.',
    icon: 'success',
    confirmButtonText: 'Return to Dashboard',
    confirmButtonColor: '#3a57e8'
  }).then(() => {
    router.push({ name: 'default.user-dashboard' })
  })
}
</script>