<template>
  <b-modal
    v-model="show"
    id="assign-patient-modal"
    :title="`Assign ${form ? form.title : 'Form'}`"
    @hidden="resetModal"
    @ok="handleAssign" 
    ok-title="Confirm Assignment"
    :ok-disabled="!selectedPatientId"
    size="lg"
    centered
    no-close-on-backdrop
    content-class="assign-modal-content-fix"
  >
    <b-form>
      <b-form-group label="Search for a patient" label-for="patient-search">
        <b-form-input
          id="patient-search"
          v-model="searchQuery"
          placeholder="Start typing a name or email..."
          class="mb-3"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Select a patient to assign this form to:">
        <div class="patient-list-container">
          <b-form-radio-group
            v-if="filteredPatients.length > 0"
            v-model="selectedPatientId"
            :options="patientOptions"
            name="patient-selection"
            stacked
            class="w-100"
          ></b-form-radio-group>
          <p v-else class="text-muted text-center">No patients found.</p>
        </div>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { patients } from '../../mockdata/patients.js' 

const props = defineProps({
  modelValue: Boolean,
  form: Object
})

const emit = defineEmits(['update:modelValue', 'assign'])

const searchQuery = ref('')
const selectedPatientId = ref(null)

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const filteredPatients = computed(() => {
  if (!searchQuery.value) {
    return patients
  }
  const lowerCaseQuery = searchQuery.value.toLowerCase() 
  return patients.filter(p =>
    p.name.toLowerCase().includes(lowerCaseQuery) ||
    p.email.toLowerCase().includes(lowerCaseQuery)
  )
})

const patientOptions = computed(() => {
  return filteredPatients.value.map(patient => ({
    text: `${patient.name} (${patient.email})`,
    value: patient.id
  }))
})

function handleAssign() {
  if (selectedPatientId.value) {
    emit('assign', selectedPatientId.value)
  }
}

function resetModal() {
  searchQuery.value = ''
  selectedPatientId.value = null
}
</script>

<style>
/* This style is not 'scoped' on purpose.
  It fixes the z-index issue where the modal was greyed out.
*/
.assign-modal-content-fix.modal-content {
  background-color: white !important;
  z-index: 1055 !important;
}

.patient-list-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 1rem;
}
</style>