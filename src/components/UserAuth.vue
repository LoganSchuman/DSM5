<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const loading = ref(false)
const email = ref('')
const password = ref('')
const role = ref('patient') // Default selection
const isSignUp = ref(false)
const message = ref('')

const handleAuth = async () => {
  loading.value = true
  message.value = ''
  
  try {
    if (isSignUp.value) {
      // SIGN UP: Pass the selected role to Supabase
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: { role: role.value } // This sends 'doctor' or 'patient' to the DB
        }
      })
      if (error) throw error
      message.value = 'Success! Check your email to confirm.'
    } else {
      // LOG IN
      const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      if (error) throw error
    }
  } catch (error) {
    message.value = error.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-items-center justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-lg">
        <div class="card-body p-5">
          <div class="text-center mb-4">
            <h2 class="text-primary fw-bold mb-2">Medical Pilot</h2>
            <p class="text-muted">
              {{ isSignUp ? 'Create your access portal' : 'Sign in to continue' }}
            </p>
          </div>

          <form @submit.prevent="handleAuth">
            <div v-if="isSignUp" class="mb-4">
              <label class="form-label d-block text-muted small fw-bold">I AM A:</label>
              <div class="btn-group w-100" role="group">
                <input type="radio" class="btn-check" name="role" id="patient" value="patient" v-model="role" checked>
                <label class="btn btn-outline-primary" for="patient">Patient</label>

                <input type="radio" class="btn-check" name="role" id="doctor" value="doctor" v-model="role">
                <label class="btn btn-outline-primary" for="doctor">Doctor</label>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Email Address</label>
              <input 
                v-model="email" 
                type="email" 
                class="form-control" 
                placeholder="name@example.com" 
                required 
              />
            </div>
            
            <div class="mb-4">
              <label class="form-label">Password</label>
              <input 
                v-model="password" 
                type="password" 
                class="form-control" 
                placeholder="••••••••" 
                required 
              />
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2 mb-3" :disabled="loading">
              {{ loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In') }}
            </button>
          </form>

          <div v-if="message" :class="['alert', message.includes('Success') ? 'alert-success' : 'alert-danger']">
            {{ message }}
          </div>

          <div class="text-center mt-3">
            <p class="mb-0">
              {{ isSignUp ? 'Already have an account?' : 'New to the platform?' }}
              <a href="#" @click.prevent="isSignUp = !isSignUp" class="text-primary fw-bold text-decoration-none">
                {{ isSignUp ? 'Sign In' : 'Register' }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the background matches your theme */
.auth-wrapper {
  min-height: 100vh;
  background-color: #f5f8fa; /* Light gray-blue background */
}
.card {
  border: none;
  border-radius: 1rem;
}
.btn-primary {
  background-color: #3a57e8; /* Hope UI Primary Blue */
  border-color: #3a57e8;
}
.btn-outline-primary {
  color: #3a57e8;
  border-color: #3a57e8;
}
.btn-check:checked + .btn-outline-primary {
  background-color: #3a57e8;
  border-color: #3a57e8;
}
</style>
