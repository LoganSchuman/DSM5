<template>
  <div v-if="isOpen" class="modal fade show" tabindex="-1" style="display: block; background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        
        <div class="modal-header">
          <div>
            <h5 class="modal-title">{{ form?.title }}</h5>
            <small class="text-muted">Read-Only Preview</small>
          </div>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>

        <div class="modal-body">
           <div v-if="questions" class="list-group list-group-flush">
              <div v-for="(text, key) in questions" :key="key" class="list-group-item px-0 py-3">
                 <div class="d-flex justify-content-between">
                    <div class="me-3">
                        <small class="text-muted text-uppercase fw-bold d-block mb-1">{{ key }}</small>
                        <p class="mb-0 text-dark fw-medium">{{ text }}</p>
                    </div>
                    <div class="text-end text-muted" style="min-width: 100px;">
                        <span class="badge bg-soft-secondary">0 - 3 Scale</span>
                    </div>
                 </div>
              </div>
           </div>

           <div v-else class="text-center py-5">
              <div class="mb-3 text-warning">
                  <svg width="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.9945 16H12.0035" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
              <h5>Preview Not Available</h5>
              <p class="text-muted">The question definitions for this form ({{ form?.id }}) could not be loaded.</p>
           </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Close Preview</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* global defineProps, defineEmits */ 
// 1. The line above tells ESLint that these functions exist globally.

import { computed } from 'vue'
import { QUESTION_MAPPING } from '@/utilities/formQuestions'

const props = defineProps({
  isOpen: Boolean,
  form: Object
})

// 2. We removed "const emit =" because we don't need the variable in the script.
// Calling defineEmits(['close']) is enough to register the event.
defineEmits(['close'])

const questions = computed(() => {
  if (!props.form?.id) return null
  return QUESTION_MAPPING[props.form.id]
})
</script>