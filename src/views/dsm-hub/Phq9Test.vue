<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">PHQ-9 Test Form</h4>
            </div>
          </b-card-header>
          <b-card-body>
            <p>Over the <strong>last 2 weeks</strong>, how often have you been bothered by any of the following problems?</p>
            
            <b-form @submit.prevent="handleSubmit">
              
              <b-form-group label="1. Little interest or pleasure in doing things:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q1" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>
              
              <b-form-group label="2. Feeling down, depressed, or hopeless:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q2" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>

              <b-form-group label="3. Trouble falling or staying asleep, or sleeping too much:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q3" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>

              <b-form-group label="4. Feeling tired or having little energy:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q4" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>

              <b-form-group label="5. Poor appetite or overeating:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q5" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>

              <b-form-group label="6. Feeling bad about yourself — or that you are a failure or have let yourself or your family down:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q6" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>

              <b-form-group label="7. Trouble concentrating on things, such as reading the newspaper or watching television:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q7" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>

              <b-form-group label="8. Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q8" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>

              <b-form-group label="9. Thoughts that you would be better off dead, or of hurting yourself in some way:" label-class="form-label" class="mb-3">
                <b-form-radio-group v-model="formData.q9" :options="scoreOptions" stacked></b-form-radio-group>
              </b-form-group>
              <hr>

              <b-form-group label="10. If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?" label-for="q10" label-class="form-label">
                <b-form-textarea id="q10" v-model="formData.q10" rows="3"></b-form-textarea>
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
      <p classa="my-4">Thank you for completing the form.</p>
      <p>Your provisional score is: <strong>{{ totalScore }}</strong></p>
      <hr>
      <small>
        <strong>Provisional Score Interpretation:</strong>
        <ul>
          <li><strong>1-4:</strong> Minimal depression</li>
          <li><strong>5-9:</strong> Mild depression</li>
          <li><strong>10-14:</strong> Moderate depression</li>
          <li><strong>15-19:</strong> Moderately severe depression</li>
          <li><strong>20-27:</strong> Severe depression</li>
        </ul>
      </small>
    </b-modal>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Define the radio button options once
const scoreOptions = [
  { text: 'Not at all (0)', value: '0' },
  { text: 'Several days (1)', value: '1' },
  { text: 'More than half the days (2)', value: '2' },
  { text: 'Nearly every day (3)', value: '3' }
]

// This holds all the form answers
const initialData = {
  q1: null, q2: null, q3: null, q4: null,
  q5: null, q6: null, q7: null, q8: null, q9: null,
  q10: '',
}

const formData = ref({ ...initialData })
const showModal = ref(false) // This controls the popup

// This calculates the score as you fill out the form
const totalScore = computed(() => {
  let score = 0
  for (let i = 1; i <= 9; i++) {
    const value = formData.value[`q${i}`]
    if (value) {
      score += parseInt(value)
    }
  }
  return score
})

// This now shows the modal instead of an alert
function handleSubmit() {
  // In a real app, you would send the data to a server here
  showModal.value = true
}

// This resets the form
function resetForm() {
  formData.value = { ...initialData }
  showModal.value = false // Close the modal
}
</script>