<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">DSM-5 Form Library</h4>
            <p>Search and manage patient assessments.</p>
          </div>
          <button class="btn btn-primary" @click="$router.push({name: 'default.create-form'})">
            + Create Custom Form
          </button>
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
                  <div class="d-flex justify-content-between">
                    <h5 class="card-title">{{ form.title }}</h5>
                    <span v-if="form.type === 'custom'" class="badge bg-soft-info">Custom</span>
                  </div>
                  <h6 class="card-subtitle mb-2 text-muted">{{ form.fullName }}</h6>
                  <p class="card-text">{{ form.description }}</p>
                </div>
                <div class="card-footer bg-transparent border-0 d-flex justify-content-end">
                  <router-link 
                    v-if="form.type === 'system'" 
                    :to="{ name: `default.${form.id}-test` }" 
                    class="btn btn-soft-secondary btn-sm me-2">
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
import { ref, computed, inject } from 'vue' 
import AssignPatientModal from '@/components/modals/AssignPatientModal.vue'
import { patients } from '../../mockdata/patients.js' 
import { useMockStore } from '@/store/MockStore.js' // Import Store

const swal = inject('$swal')
// Get forms and assign action from store
const { getLibraryForms, assignForm } = useMockStore()

const showAssignModal = ref(false)
const selectedForm = ref(null)
const searchQuery = ref('')

// Computed property to get latest list (System + Custom)
const allForms = computed(() => getLibraryForms())

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

function openAssignModal(form) {
  selectedForm.value = form
  showAssignModal.value = true
}

function handleAssign(patientId) {
  const patient = patients.find(p => p.id === patientId)
  showAssignModal.value = false

  // Use Store action to handle assignment
  assignForm(patient.id, selectedForm.value.id, selectedForm.value.title, selectedForm.value.description)

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
</script>