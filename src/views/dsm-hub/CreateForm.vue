<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Create New Assessment Form</h4>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="saveForm">
            <div class="row mb-4">
                <div class="col-md-6">
                    <label class="form-label">Form Title (Acronym)</label>
                    <input type="text" class="form-control" v-model="formMeta.title" placeholder="e.g., SLEEP-10" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="formMeta.description" placeholder="Short description for the library" required>
                </div>
            </div>

            <hr>
            
            <h5 class="mb-3">Questions</h5>
            <div v-for="(q, index) in questions" :key="index" class="card bg-soft-light mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <h6>Question {{ index + 1 }}</h6>
                        <button type="button" class="btn btn-sm btn-danger" @click="removeQuestion(index)">Remove</button>
                    </div>
                    <div class="row">
                        <div class="col-md-8">
                            <input type="text" class="form-control" v-model="q.text" placeholder="Enter question text..." required>
                        </div>
                        <div class="col-md-4">
                            <select class="form-select" v-model="q.optionsType">
                                <option value="scale04">Scale 0-4 (None to Severe)</option>
                                <option value="yesno">Yes / No</option>
                                <option value="freq">Frequency (Never to Daily)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <button type="button" class="btn btn-soft-primary w-100 mb-4" @click="addQuestion">
                + Add Another Question
            </button>

            <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-secondary" @click="$router.go(-1)">Cancel</button>
                <button type="submit" class="btn btn-primary">Save to Library</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useMockStore } from '@/store/MockStore.js'

const router = useRouter()
const { createCustomForm } = useMockStore()

const formMeta = ref({ title: '', description: '' })
const questions = ref([
    { text: '', optionsType: 'scale04' }
])

const addQuestion = () => {
    questions.value.push({ text: '', optionsType: 'scale04' })
}

const removeQuestion = (idx) => {
    questions.value.splice(idx, 1)
}

const saveForm = () => {
    createCustomForm(formMeta.value, questions.value)
    
    Swal.fire({
        icon: 'success',
        title: 'Form Created',
        text: 'Your custom form has been added to the library.',
        timer: 1500
    }).then(() => {
        router.push({ name: 'default.dsm-hub' })
    })
}
</script>