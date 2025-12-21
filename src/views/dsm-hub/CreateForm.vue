<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Create Advanced Assessment</h4>
          </div>
        </div>
        <div class="card-body">
          <form @submit.prevent="saveForm">
            <div class="row mb-4">
                <div class="col-md-4">
                    <label class="form-label">Form Title (Acronym)</label>
                    <input type="text" class="form-control" v-model="formMeta.title" placeholder="e.g., SLEEP-10" required>
                </div>
                <div class="col-md-8">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="formMeta.description" placeholder="Short description for the library" required>
                </div>
                <div class="col-md-4 mt-3">
                    <label class="form-label">Target Population</label>
                    <select class="form-select" v-model="formMeta.population">
                        <option value="All">All Ages</option>
                        <option value="Adult">Adult</option>
                        <option value="Child">Child / Adolescent</option>
                    </select>
                </div>
                <div class="col-md-4 mt-3">
                    <label class="form-label">Specialty</label>
                    <input type="text" class="form-control" v-model="formMeta.specialty" placeholder="e.g. Psychiatry">
                </div>
            </div>

            <hr>
            
            <h5 class="mb-3">Questions & Logic</h5>
            
            <div v-for="(q, index) in questions" :key="q.id" class="card mb-3 border">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-primary">Q{{ index + 1 }}</span>
                        <button type="button" class="btn btn-sm btn-outline-danger" @click="removeQuestion(index)">
                            <i class="bi bi-trash"></i> Remove
                        </button>
                    </div>
                    
                    <div class="row g-3">
                        <div class="col-md-7">
                            <label class="form-label small text-muted">Question Text</label>
                            <input type="text" class="form-control" v-model="q.text" placeholder="Enter question..." required>
                        </div>
                        
                        <div class="col-md-3">
                            <label class="form-label small text-muted">Response Type</label>
                            <select class="form-select" v-model="q.type">
                                <option value="scale04">Scale 0-4 (Standard)</option>
                                <option value="likert_agree">Likert (Agree/Disagree)</option>
                                <option value="yesno">Yes / No</option>
                                <option value="freq">Frequency (Never-Daily)</option>
                                <option value="number">Numeric Entry</option>
                                <option value="duration">Duration</option>
                                <option value="text">Free Text</option>
                            </select>
                        </div>

                        <div class="col-md-2">
                            <label class="form-label small text-muted">Section</label>
                            <input type="text" class="form-control" v-model="q.section" placeholder="e.g. Mood" list="sections">
                            <datalist id="sections">
                                <option value="Mood"></option>
                                <option value="Anxiety"></option>
                                <option value="Sleep"></option>
                                <option value="Risk"></option>
                            </datalist>
                        </div>
                    </div>

                    <div class="mt-3">
                        <a href="#" class="text-decoration-none small fw-bold" @click.prevent="q.showSettings = !q.showSettings">
                            {{ q.showSettings ? 'Hide Settings ▲' : 'Show Metadata & Logic ▼' }}
                        </a>
                    </div>

                    <div v-if="q.showSettings" class="bg-soft-light p-3 mt-2 rounded">
                        <div class="row g-3">
                            
                            <div class="col-md-3">
                                <label class="form-label small">Clinical Domain</label>
                                <select class="form-select form-select-sm" v-model="q.metadata.domain">
                                    <option value="">None</option>
                                    <option value="Mood">Mood</option>
                                    <option value="Anxiety">Anxiety</option>
                                    <option value="Psychosis">Psychosis</option>
                                    <option value="Substance">Substance Use</option>
                                    <option value="Safety">Safety/Risk</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label class="form-label small">Required?</label>
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" v-model="q.metadata.required">
                                </div>
                            </div>

                            <div class="col-md-7 border-start">
                                <label class="form-label small fw-bold">Conditional Logic (Show only if...)</label>
                                <div class="d-flex gap-2 align-items-center">
                                    <select class="form-select form-select-sm" v-model="q.logic.dependsOn">
                                        <option value="">Always Visible</option>
                                        <option v-for="prevQ in questions.slice(0, index)" :key="prevQ.id" :value="prevQ.id">
                                            Q{{ questions.indexOf(prevQ) + 1 }}: {{ prevQ.text.substring(0, 20) }}...
                                        </option>
                                    </select>
                                    
                                    <span v-if="q.logic.dependsOn" class="small">Equals</span>
                                    
                                    <div v-if="q.logic.dependsOn" class="flex-grow-1">
                                         <select 
                                            v-if="getParentOptions(q.logic.dependsOn).length > 0" 
                                            class="form-select form-select-sm" 
                                            v-model="q.logic.value"
                                         >
                                            <option value="" disabled>Select Answer</option>
                                            <option v-for="opt in getParentOptions(q.logic.dependsOn)" :key="opt.value" :value="opt.value">
                                                {{ opt.text }} ({{ opt.value }})
                                            </option>
                                         </select>
                                         
                                         <input v-else type="text" class="form-control form-control-sm" v-model="q.logic.value" placeholder="Value...">
                                    </div>
                                </div>
                            </div>
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

const formMeta = ref({ title: '', description: '', population: 'All', specialty: '' })

// Option Sets
const optionSets = {
    scale04: [
        { text: '0 - None', value: '0' },
        { text: '1 - Slight', value: '1' },
        { text: '2 - Mild', value: '2' },
        { text: '3 - Moderate', value: '3' },
        { text: '4 - Severe', value: '4' }
    ],
    likert_agree: [
        { text: 'Strongly Disagree', value: '0' },
        { text: 'Disagree', value: '1' },
        { text: 'Neutral', value: '2' },
        { text: 'Agree', value: '3' },
        { text: 'Strongly Agree', value: '4' }
    ],
    yesno: [
        { text: 'No', value: '0' },
        { text: 'Yes', value: '1' }
    ],
    freq: [
        { text: 'Never', value: '0' },
        { text: 'Rarely', value: '1' },
        { text: 'Sometimes', value: '2' },
        { text: 'Often', value: '3' },
        { text: 'Daily', value: '4' }
    ],
    duration: [
        { text: 'Less than 1 week', value: '0' },
        { text: '1 - 4 weeks', value: '1' },
        { text: '1 - 3 months', value: '2' },
        { text: 'More than 3 months', value: '3' }
    ]
}

const questions = ref([ createEmptyQuestion(0) ])

function createEmptyQuestion(idx) {
    return {
        id: `q_${Date.now()}_${idx}`, 
        text: '',
        type: 'scale04',
        section: 'General',
        showSettings: true,
        metadata: { domain: '', required: true, weight: 1 },
        logic: { dependsOn: '', value: '' }
    }
}

const getParentOptions = (parentId) => {
    const parentQ = questions.value.find(q => q.id === parentId)
    if (!parentQ) return []
    return optionSets[parentQ.type] || []
}

const addQuestion = () => {
    questions.value.push(createEmptyQuestion(questions.value.length))
}

const removeQuestion = (idx) => {
    questions.value.splice(idx, 1)
}

const saveForm = () => {
    // FIX: Using delete on a copy instead of destructuring to avoid unused var
    const cleanQuestions = questions.value.map(q => {
        const qCopy = { ...q }
        delete qCopy.showSettings
        return qCopy
    })
    
    createCustomForm(formMeta.value, cleanQuestions)
    
    Swal.fire({
        icon: 'success',
        title: 'Form Created',
        text: 'Advanced form added to library.',
        timer: 1500
    }).then(() => {
        router.push({ name: 'default.dsm-hub' })
    })
}
</script>