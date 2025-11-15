<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">MDQ (Mood Disorder Questionnaire)</h4>
            </div>
          </b-card-header>
          <b-card-body>
            <p>Please answer each question to the best of your ability.</p>
            
            <b-form @submit.prevent="handleSubmit">
              <h5 class="mb-3">1. Has there ever been a period of time when you were not your usual self and...</h5>
              
              <b-form-group 
                v-for="(question, index) in questions" 
                :key="index"
                :label="question"
                label-class="form-label" 
                class="mb-3">
                <b-form-radio-group 
                  v-model="formData[`q${index + 1}`]" 
                  :options="yesNoOptions" 
                  stacked>
                </b-form-radio-group>
              </b-form-group>
              <hr>

              <h5 class="mb-3">2. If you checked YES to more than one of the above, have several of these ever happened during the same period of time?</h5>
              <b-form-radio-group 
                v-model="formData.concurrent" 
                :options="yesNoOptions" 
                stacked
                class="mb-3">
              </b-form-radio-group>
              <hr>

              <h5 class="mb-3">3. How much of a problem did any of these cause you – like being unable to work; having family, money or legal troubles; getting into arguments or fights?</h5>
              <b-form-radio-group 
                v-model="formData.impact" 
                :options="impactOptions" 
                stacked
                class="mb-3">
              </b-form-radio-group>

              <div class="d-flex gap-2 flex-wrap mt-4">
                <b-button variant="primary" type="submit">Submit Form</b-button>
                <b-button variant="secondary" type="button" @click="resetForm">Reset</b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-modal v-model="showModal" id="result-modal" title="Form Completed" ok-only @ok="resetForm" hide-backdrop>
      <p class="my-4">Thank you for completing the MDQ.</p>
      <p v-if="screenPositive" class="text-warning">
        <strong>Screening Result:</strong> Your responses suggest that further evaluation for bipolar spectrum disorder may be warranted.
      </p>
      <p v-else>
        <strong>Screening Result:</strong> Your responses suggest that bipolar spectrum disorder is less likely.
      </p>
      <hr>
      <small>
        <strong>Note:</strong> This screening tool is not a diagnostic test. A proper diagnosis can only be made by a qualified healthcare professional.
      </small>
    </b-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const questions = [
  'You felt so good or so hyper that other people thought you were not your normal self or you were so hyper that you got into trouble?',
  'You were so irritable that you shouted at people or started fights or arguments?',
  'You felt much more self-confident than usual?',
  'You got much less sleep than usual and found you didn\'t really miss it?',
  'You were much more talkative or spoke much faster than usual?',
  'Thoughts raced through your head or you couldn\'t slow your mind down?',
  'You were so easily distracted by things around you that you had trouble concentrating or staying on track?',
  'You had much more energy than usual?',
  'You were much more active or did many more things than usual?',
  'You were much more social or outgoing than usual, for example, you telephoned friends in the middle of the night?',
  'You were much more interested in sex than usual?',
  'You did things that were unusual for you or that other people might have thought were excessive, foolish, or risky?',
  'Spending money got you or your family into trouble?'
]

const yesNoOptions = [
  { text: 'Yes', value: 'yes' },
  { text: 'No', value: 'no' }
]

const impactOptions = [
  { text: 'No Problem', value: 'none' },
  { text: 'Minor Problem', value: 'minor' },
  { text: 'Moderate Problem', value: 'moderate' },
  { text: 'Serious Problem', value: 'serious' }
]

const initialData = {
  ...Object.fromEntries(questions.map((_, index) => [`q${index + 1}`, null])),
  concurrent: null,
  impact: null
}

const formData = ref({ ...initialData })
const showModal = ref(false)

const screenPositive = computed(() => {
  // MDQ is positive if:
  // 1. Seven or more "yes" responses in section 1
  // 2. Several symptoms occurred during the same period (concurrent = "yes")
  // 3. Symptoms caused moderate or serious problems (impact = "moderate" or "serious")
  
  const yesCount = Object.entries(formData.value)
    .filter(([key]) => key.startsWith('q'))
    .filter(([, value]) => value === 'yes')
    .length

  return yesCount >= 7 && 
         formData.value.concurrent === 'yes' && 
         ['moderate', 'serious'].includes(formData.value.impact)
})

const handleSubmit = () => {
  showModal.value = true
}

const resetForm = () => {
  formData.value = { ...initialData }
  showModal.value = false
}
</script>