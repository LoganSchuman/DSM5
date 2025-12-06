<template>
  <div v-if="formDef">
    <b-row>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">{{ formDef.title }}</h4>
              <p class="mb-0 text-muted">{{ formDef.description }}</p>
            </div>
            <span v-if="isReadOnly" class="badge bg-success">Completed</span>
          </b-card-header>
          <b-card-body>
            <b-form @submit.prevent="handleSubmit">
              <div v-for="(q, idx) in formDef.questions" :key="idx" class="mb-4">
                  <label class="form-label fw-bold">{{ idx + 1 }}. {{ q.text }}</label>
                  
                  <b-form-radio-group
                    v-model="formData[`q${idx}`]"
                    :options="getOptions(q.optionsType)"
                    :disabled="isReadOnly"
                    class="d-flex flex-column flex-sm-row gap-3 mt-2"
                  ></b-form-radio-group>
              </div>

              <div class="d-flex gap-2 mt-5">
                <b-button v-if="!isReadOnly" variant="primary" type="submit">Submit Assessment</b-button>
                <b-button variant="secondary" @click="$router.push({name: 'default.user-dashboard'})">
                    {{ isReadOnly ? 'Back' : 'Cancel' }}
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
import { useMockStore } from '@/store/MockStore.js'

const route = useRoute()
const router = useRouter()
const { getFormDefinition, submitAssessment, getAssignment } = useMockStore()

const formId = route.params.id
const formDef = ref(null)
const formData = ref({})
const isReadOnly = ref(false)

// Option Presets
const optionSets = {
    scale04: [
        { text: '0 - None', value: '0' },
        { text: '1 - Slight', value: '1' },
        { text: '2 - Mild', value: '2' },
        { text: '3 - Moderate', value: '3' },
        { text: '4 - Severe', value: '4' }
    ],
    yesno: [
        { text: 'No (0)', value: '0' },
        { text: 'Yes (1)', value: '1' }
    ],
    freq: [
        { text: 'Never (0)', value: '0' },
        { text: 'Rarely (1)', value: '1' },
        { text: 'Sometimes (2)', value: '2' },
        { text: 'Often (3)', value: '3' },
        { text: 'Daily (4)', value: '4' }
    ]
}

const getOptions = (type) => optionSets[type] || optionSets.scale04

onMounted(() => {
    formDef.value = getFormDefinition(formId)
    
    if (formDef.value) {
        formDef.value.questions.forEach((_, idx) => {
            formData.value[`q${idx}`] = null
        })
    }

    const assignment = getAssignment(formId)
    if (assignment && assignment.status === 'Completed' && assignment.results) {
        formData.value = assignment.results
        isReadOnly.value = true
    }
})

const handleSubmit = () => {
    submitAssessment(formId, formData.value)
    Swal.fire({
        icon: 'success',
        title: 'Submitted',
        text: 'Results sent to physician.'
    }).then(() => router.push({name: 'default.user-dashboard'}))
}
</script>