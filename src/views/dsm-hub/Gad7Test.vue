<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">GAD-7 Test Form</h4>
            </div>
          </b-card-header>
          <b-card-body>
            <p>Over the <strong>last 2 weeks</strong>, how often have you been bothered by any of the following problems?</p>
            
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
      <p class="my-4">Thank you for completing the form.</p>
      <p>Your provisional score is: <strong>{{ totalScore }}</strong></p>
      <hr>
      <small>
        <strong>Provisional Score Interpretation:</strong>
        <ul>
          <li><strong>0-4:</strong> Minimal anxiety</li>
          <li><strong>5-9:</strong> Mild anxiety</li>
          <li><strong>10-14:</strong> Moderate anxiety</li>
          <li><strong>15-21:</strong> Severe anxiety</li>
        </ul>
      </small>
    </b-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const questions = [
  'Feeling nervous, anxious, or on edge',
  'Not being able to stop or control worrying',
  'Worrying too much about different things',
  'Trouble relaxing',
  'Being so restless that it\'s hard to sit still',
  'Becoming easily annoyed or irritable',
  'Feeling afraid as if something awful might happen'
]

const scoreOptions = [
  { text: 'Not at all (0)', value: '0' },
  { text: 'Several days (1)', value: '1' },
  { text: 'More than half the days (2)', value: '2' },
  { text: 'Nearly every day (3)', value: '3' }
]

const initialData = Object.fromEntries(
  questions.map((_, index) => [`q${index + 1}`, null])
)

const formData = ref({ ...initialData })
const showModal = ref(false)

const totalScore = computed(() => {
  return Object.values(formData.value)
    .filter(val => val !== null)
    .reduce((sum, val) => sum + Number(val), 0)
})

const handleSubmit = () => {
  showModal.value = true
}

const resetForm = () => {
  formData.value = { ...initialData }
  showModal.value = false
}
</script>