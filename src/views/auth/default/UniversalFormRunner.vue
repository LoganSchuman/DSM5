<template>
  <div>
    <b-row v-if="loading">
      <b-col class="text-center py-5">
        <b-spinner variant="primary"></b-spinner>
        <p class="mt-2 text-muted">Loading Assessment...</p>
      </b-col>
    </b-row>

    <b-row v-else-if="error">
      <b-col class="text-center py-5">
        <b-alert show variant="danger">{{ error }}</b-alert>
        <b-button @click="$router.push({name: 'default.user-dashboard'})">Return to Dashboard</b-button>
      </b-col>
    </b-row>

    <b-row v-else>
      <b-col lg="12">
        <b-card no-body>
          <b-card-header header-class="d-flex justify-content-between">
            <div class="header-title">
              <h4 class="card-title">{{ config.title }}</h4>
              <span v-if="isReadOnly" class="badge bg-success">
                Completed - Result: {{ scoreDisplay }}
              </span>
            </div>
          </b-card-header>
          
          <b-card-body>
            <p class="text-muted mb-4">{{ config.description }}</p>

            <b-form @submit.prevent="handleSubmit">
              
              <div v-for="(section, sIdx) in config.sections" :key="sIdx" class="mb-5">
                <h5 v-if="section.title" class="mb-3 text-primary border-bottom pb-2">
                  {{ section.title }}
                </h5>

                <b-form-group
                  v-for="question in section.questions"
                  :key="question.id"
                  :label="question.text"
                  class="mb-4"
                >
                  <b-form-radio-group
                    v-model="formData[question.id]"
                    :options="getOptions(section, question)"
                    :disabled="isReadOnly"
                    stacked
                  ></b-form-radio-group>
                </b-form-group>
              </div>

              <hr class="my-4">

              <div class="d-flex gap-2">
                <b-button v-if="!isReadOnly" variant="primary" type="submit" :disabled="submitting">
                  {{ submitting ? 'Submitting...' : 'Submit Assessment' }}
                </b-button>
                <b-button variant="secondary" @click="$router.push({name: 'default.user-dashboard'})">
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
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import Swal from 'sweetalert2'
import { FORM_CONFIGS, OPTION_SETS } from '@/utilities/form_configs'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const submitting = ref(false)
const error = ref(null)
const isReadOnly = ref(false)
const formData = ref({})
const config = ref(null)
const assignmentId = ref(null)
const scoreDisplay = ref('')

// Helper to resolve options for a specific question
const getOptions = (section, question) => {
  if (question.customOptions) return question.customOptions
  if (section.optionsType) return OPTION_SETS[section.optionsType]
  return []
}

onMounted(async () => {
  loading.value = true
  
  // 1. Determine which form we are running
  // The route params might be /assessment/:formId
  // OR we might pass an assignmentId in the query string
  const formId = route.params.formId
  config.value = FORM_CONFIGS[formId]

  if (!config.value) {
    error.value = `Form configuration not found for ID: ${formId}`
    loading.value = false
    return
  }

  // 2. Fetch User & Assignment
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    let query = supabase.from('assignments')
      .select('*')
      .eq('patient_id', user.id)
      .eq('form_id', formId)
    
    // If specific assignment requested
    if (route.query.assignmentId) {
      query = query.eq('id', route.query.assignmentId)
    } else {
      // Otherwise get latest pending
      query = query.neq('status', 'Completed').order('created_at', { ascending: false }).limit(1)
    }

    const { data } = await query
    
    if (data && data.length > 0) {
      const assignment = data[0]
      assignmentId.value = assignment.id

      // 3. If completed, load data
      if (assignment.status === 'Completed') {
        isReadOnly.value = true
        formData.value = assignment.answers || {}
        scoreDisplay.value = `${assignment.score} (${config.value.calculateScore(assignment.answers || {}, config.value).interpretation})`
      }
    } else if (!route.query.assignmentId) {
       // If no pending found and not specifically viewing an old one
       // Try to find ANY completed one to view? Or just show error?
       error.value = "No active assignment found for this test."
    }
  }
  
  loading.value = false
})

const handleSubmit = async () => {
  // 1. Calculate Score using the config's logic
  const result = config.value.calculateScore(formData.value, config.value)
  
  submitting.value = true
  try {
    const { error: dbError } = await supabase
      .from('assignments')
      .update({
        status: 'Completed',
        score: result.score,
        answers: formData.value,
        created_at: new Date().toISOString()
      })
      .eq('id', assignmentId.value)

    if (dbError) throw dbError

    Swal.fire({
      title: 'Assessment Submitted',
      html: `Score: <strong>${result.score}</strong><br/>${result.interpretation}`,
      icon: 'success'
    }).then(() => {
      router.push({ name: 'default.user-dashboard' })
    })

  } catch (e) {
    console.error(e)
    Swal.fire('Error', 'Failed to submit assessment.', 'error')
  } finally {
    submitting.value = false
  }
}
</script>