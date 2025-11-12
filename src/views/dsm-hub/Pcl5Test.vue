<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">PCL-5 (PTSD Checklist for DSM-5)</h4>
            </div>
          </b-card-header>
          <b-card-body>
            <p>Below is a list of problems that people sometimes have in response to a very stressful experience. Please read each problem carefully and then select one of the options to indicate how much you have been bothered by that problem in the <strong>past month</strong>.</p>
            
            <b-form @submit.prevent="handleSubmit">
              <template v-for="(cluster, clusterIndex) in questionClusters" :key="clusterIndex">
                <h5 class="mt-4 mb-3">{{ cluster.title }}</h5>
                <b-form-group 
                  v-for="question in cluster.questions" 
                  :key="question.id"
                  :label="`${question.id}. ${question.text}`"
                  label-class="form-label" 
                  class="mb-3">
                  <b-form-radio-group 
                    v-model="formData[`q${question.id}`]" 
                    :options="scoreOptions" 
                    stacked>
                  </b-form-radio-group>
                </b-form-group>
                <hr v-if="clusterIndex < questionClusters.length - 1">
              </template>

              <div class="d-flex gap-2 flex-wrap mt-4">
                <b-button variant="primary" type="submit">Submit Form</b-button>
                <b-button variant="secondary" type="button" @click="resetForm">Reset</b-button>
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-modal v-model="showModal" id="result-modal" title="Form Completed" ok-only @ok="resetForm" hide-backdrop size="lg">
      <p class="my-4">Thank you for completing the PCL-5.</p>
      <p>Your total score is: <strong>{{ totalScore }}</strong></p>
      <hr>
      <div>
        <h6>Cluster Scores:</h6>
        <ul class="list-unstyled">
          <li v-for="(score, cluster) in clusterScores" :key="cluster">
            <strong>{{ cluster }}:</strong> {{ score }}
          </li>
        </ul>
      </div>
      <hr>
      <small>
        <strong>Score Interpretation:</strong>
        <ul>
          <li>A PCL-5 cutoff score of 31-33 is suggestive of probable PTSD</li>
          <li>A total score of 33 or higher suggests the patient may benefit from PTSD treatment</li>
          <li>A 5-10 point change is reliable (i.e., not due to chance)</li>
          <li>A 10-20 point change is clinically meaningful</li>
        </ul>
        <p class="mt-2"><strong>Note:</strong> This screening tool is not a diagnostic test. A proper diagnosis can only be made by a qualified healthcare professional.</p>
      </small>
    </b-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const questionClusters = [
  {
    title: 'Criterion B: Intrusion Symptoms',
    questions: [
      { id: 1, text: 'Repeated, disturbing, and unwanted memories of the stressful experience?' },
      { id: 2, text: 'Repeated, disturbing dreams of the stressful experience?' },
      { id: 3, text: 'Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?' },
      { id: 4, text: 'Feeling very upset when something reminded you of the stressful experience?' },
      { id: 5, text: 'Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, trouble breathing, sweating)?' }
    ]
  },
  {
    title: 'Criterion C: Avoidance',
    questions: [
      { id: 6, text: 'Avoiding memories, thoughts, or feelings related to the stressful experience?' },
      { id: 7, text: 'Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?' }
    ]
  },
  {
    title: 'Criterion D: Negative Alterations in Cognitions and Mood',
    questions: [
      { id: 8, text: 'Trouble remembering important parts of the stressful experience?' },
      { id: 9, text: 'Having strong negative beliefs about yourself, other people, or the world?' },
      { id: 10, text: 'Blaming yourself or someone else for the stressful experience or what happened after it?' },
      { id: 11, text: 'Having strong negative feelings such as fear, horror, anger, guilt, or shame?' },
      { id: 12, text: 'Loss of interest in activities that you used to enjoy?' },
      { id: 13, text: 'Feeling distant or cut off from other people?' },
      { id: 14, text: 'Trouble experiencing positive feelings?' }
    ]
  },
  {
    title: 'Criterion E: Alterations in Arousal and Reactivity',
    questions: [
      { id: 15, text: 'Irritable behavior, angry outbursts, or acting aggressively?' },
      { id: 16, text: 'Taking too many risks or doing things that could cause you harm?' },
      { id: 17, text: 'Being "superalert" or watchful or on guard?' },
      { id: 18, text: 'Feeling jumpy or easily startled?' },
      { id: 19, text: 'Having difficulty concentrating?' },
      { id: 20, text: 'Trouble falling or staying asleep?' }
    ]
  }
]

const scoreOptions = [
  { text: 'Not at all (0)', value: '0' },
  { text: 'A little bit (1)', value: '1' },
  { text: 'Moderately (2)', value: '2' },
  { text: 'Quite a bit (3)', value: '3' },
  { text: 'Extremely (4)', value: '4' }
]

const initialData = Object.fromEntries(
  questionClusters.flatMap(cluster => 
    cluster.questions.map(q => [`q${q.id}`, null])
  )
)

const formData = ref({ ...initialData })
const showModal = ref(false)

const totalScore = computed(() => {
  return Object.values(formData.value)
    .filter(val => val !== null)
    .reduce((sum, val) => sum + Number(val), 0)
})

const clusterScores = computed(() => {
  return {
    'Intrusion (B)': questionClusters[0].questions
      .map(q => Number(formData.value[`q${q.id}`] || 0))
      .reduce((sum, val) => sum + val, 0),
    'Avoidance (C)': questionClusters[1].questions
      .map(q => Number(formData.value[`q${q.id}`] || 0))
      .reduce((sum, val) => sum + val, 0),
    'Cognitions & Mood (D)': questionClusters[2].questions
      .map(q => Number(formData.value[`q${q.id}`] || 0))
      .reduce((sum, val) => sum + val, 0),
    'Arousal & Reactivity (E)': questionClusters[3].questions
      .map(q => Number(formData.value[`q${q.id}`] || 0))
      .reduce((sum, val) => sum + val, 0)
  }
})

const handleSubmit = () => {
  showModal.value = true
}

const resetForm = () => {
  formData.value = { ...initialData }
  showModal.value = false
}
</script>