<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">ASRS v1.1 Screener</h4>
            </div>
          </b-card-header>
          <b-card-body>
            <p>Please answer the questions below, rating yourself on each of the criteria shown using the scale provided.</p>
            <p>For each question, select the box that <strong>best describes</strong> how you have felt and conducted yourself over the <strong>past 6 months</strong>.</p>
            
            <b-form @submit.prevent="handleSubmit">
              <b-form-group 
                v-for="(question, index) in questions" 
                :key="index"
                :label="`${index + 1}. ${question}`"
                label-class="form-label" 
                class="mb-3">
                <b-form-radio-group 
                  v-model="formData[`q${index + 1}`]" 
                  :options="scoreOptions" 
                  stacked>
                </b-form-radio-group>
              </b-form-group>
              <hr>

              <div class="d-flex gap-2 flex-wrap">
                <b-button variant="primary" type="submit">Submit Form</b-button>
                <b-button variant="secondary" type="button" @click="resetForm">Reset</b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-modal v-model="showModal" id="result-modal" title="Form Completed" ok-only @ok="resetForm" hide-backdrop>
      <p class="my-4">Thank you for completing the ASRS v1.1 Screener.</p>
      <p>Based on your responses:</p>
      <p v-if="screenPositive" class="text-warning">
        <strong>Screening Result:</strong> Your responses suggest that ADHD symptoms may be present. A follow-up clinical evaluation is recommended.
      </p>
      <p v-else>
        <strong>Screening Result:</strong> Your responses suggest that ADHD symptoms are less likely to be present.
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
  'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',
  'How often do you have difficulty getting things in order when you have to do a task that requires organization?',
  'How often do you have problems remembering appointments or obligations?',
  'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?',
  'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?',
  'How often do you feel overly active and compelled to do things, like you were driven by a motor?'
]

const scoreOptions = [
  { text: 'Never (0)', value: '0' },
  { text: 'Rarely (1)', value: '1' },
  { text: 'Sometimes (2)', value: '2' },
  { text: 'Often (3)', value: '3' },
  { text: 'Very Often (4)', value: '4' }
]

const initialData = Object.fromEntries(
  questions.map((_, index) => [`q${index + 1}`, null])
)

const formData = ref({ ...initialData })
const showModal = ref(false)

const screenPositive = computed(() => {
  // ASRS v1.1 scoring is based on specific thresholds for each question
  const thresholds = {
    1: 2, // Sometimes or higher
    2: 2, // Sometimes or higher
    3: 2, // Sometimes or higher
    4: 3, // Often or higher
    5: 3, // Often or higher
    6: 3  // Often or higher
  }

  let positiveResponses = 0
  for (let i = 1; i <= 6; i++) {
    const response = Number(formData.value[`q${i}`])
    if (response >= thresholds[i]) {
      positiveResponses++
    }
  }

  return positiveResponses >= 4 // Screen is positive if 4 or more items exceed threshold
})

const handleSubmit = () => {
  showModal.value = true
}

const resetForm = () => {
  formData.value = { ...initialData }
  showModal.value = false
}
</script>