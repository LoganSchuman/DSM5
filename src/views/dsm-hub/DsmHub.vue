<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">DSM-5 Form Library</h4>
            <p>Search and manage patient assessments.</p>
          </div>
        </div>
        <div class="card-body">
          <div class="row justify-content-center mb-4">
            <div class="col-md-8">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
                <input type="text" class="form-control" placeholder="Search for a form (e.g., PHQ-9)..." v-model="searchQuery">
              </div>
            </div>
          </div>

          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div class="col" v-for="form in filteredForms" :key="form.id">
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">{{ form.title }}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">{{ form.fullName }}</h6>
                  <p class="card-text">{{ form.description }}</p>
                </div>
                <div class="card-footer bg-transparent border-0 d-flex justify-content-end">
                  <router-link :to="{ name: `default.${form.id}-test` }" class="btn btn-soft-secondary btn-sm me-2">
                    View Details
                  </router-link>
                  <button class="btn btn-primary btn-sm" @click="openAssignModal(form)">Assign to Patient</button>
                </div>
              </div>
            </div>
          </div>
           <div v-if="filteredForms.length === 0" class="text-center mt-4">
              <p class="text-muted">No forms found matching your search.</p>
            </div>
        </div>
      </div>
    </div>
  </div>

  <AssignPatientModal 
    v-model="showAssignModal" 
    :form="selectedForm" 
    @assign="handleAssign" 
  />
</template>

<script setup>
import { ref, computed, inject } from 'vue' // 1. Import inject
import AssignPatientModal from '@/components/modals/AssignPatientModal.vue'
import { patients } from '../../mockdata/patients.js' 
// import { useBToast } from 'bootstrap-vue-3' // <-- REMOVED THIS BROKEN LINE

const swal = inject('$swal') // 2. Get SweetAlert from your main.js

const showAssignModal = ref(false)
const selectedForm = ref(null)

function openAssignModal(form) {
  selectedForm.value = form
  showAssignModal.value = true
}

function handleAssign(patientId) {
  const patient = patients.find(p => p.id === patientId)
  
  showAssignModal.value = false

  // 3. Use swal.fire() for the confirmation toast
  swal.fire({
    title: 'Assignment Successful!',
    text: `Successfully assigned ${selectedForm.value.title} to ${patient.name}.`,
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  })
  
  selectedForm.value = null
}

const searchQuery = ref('')

const allForms = ref([
  {
    id: 'phq-9',
    title: 'PHQ-9',
    fullName: 'Patient Health Questionnaire-9',
    description: 'A 9-item depression screening and severity monitoring tool.'
  },
  {
    id: 'gad-7',
    title: 'GAD-7',
    fullName: 'Generalized Anxiety Disorder-7',
    description: 'A 7-item screening tool for generalized anxiety disorder.'
  },
  {
    id: 'asrs',
    title: 'ASRS-v1.1',
    fullName: 'Adult ADHD Self-Report Scale',
    description: 'A 6-item screener to identify symptoms consistent with adult ADHD.'
  },
   {
    id: 'pcl-5',
    title: 'PCL-5',
    fullName: 'PTSD Checklist for DSM-5',
    description: 'A 20-item self-report measure that assesses PTSD symptoms.'
  },
  {
    id: 'mdq',
    title: 'MDQ',
    fullName: 'Mood Disorder Questionnaire',
    description: 'A screening tool for bipolar I disorder.'
  },
  {
    id: 'audit',
    title: 'AUDIT',
    fullName: 'Alcohol Use Disorders Identification Test',
    description: 'A 10-item screening tool to assess alcohol consumption and related problems.'
  }
])

const filteredForms = computed(() => {
  if (!searchQuery.value) {
    return allForms.value
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase()
  return allForms.value.filter(form =>
    form.title.toLowerCase().includes(lowerCaseQuery) ||
    form.fullName.toLowerCase().includes(lowerCaseQuery)
  )
})
</script>