<template>
  <section class="login-content">
    <div class="row m-0 align-items-center bg-white vh-100">
      <div class="col-md-6 d-md-block d-none bg-primary p-0 vh-100 overflow-hidden">
        <img src="@/assets/images/auth/05.png" class="img-fluid gradient-main animated-scaleX" alt="images" loading="lazy" />
      </div>
      <div class="col-md-6">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
              <div class="card-body">
                  <router-link :to="{ name: 'default.dashboard' }" class="navbar-brand d-flex align-items-center mb-3 text-primary" style="margin-left: 50px;">
                  <brand-logo></brand-logo>
                </router-link>
                <h2 class="mb-2 text-center">Sign Up</h2>
                <p class="text-center">Create your <brand-name></brand-name> account.</p>

                <div v-if="errorMessage" class="alert alert-danger d-flex align-items-center" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                  <div>
                    {{ errorMessage }}
                  </div>
                </div>

                <form @submit.prevent="handleSignUp">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="full-name" class="form-label">First Name</label>
                        <input v-model="firstName" type="text" class="form-control" id="full-name" placeholder=" " required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="last-name" class="form-label">Last Name</label>
                        <input v-model="lastName" type="text" class="form-control" id="last-name" placeholder=" " required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input v-model="email" type="email" class="form-control" id="email" placeholder=" " required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="phone" class="form-label">Phone No.</label>
                        <input v-model="phone" type="text" class="form-control" id="phone" placeholder=" " />
                      </div>
                    </div>
                    
                    <div class="col-lg-12">
                      <div class="form-group">
                        <label for="role-select" class="form-label">I am a...</label>
                        <select v-model="role" class="form-select" id="role-select" required>
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor / Physician</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder=" " required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label for="confirm-password" class="form-label">Confirm Password</label>
                        <input v-model="confirmPassword" type="password" class="form-control" id="confirm-password" placeholder=" " required />
                      </div>
                    </div>
                    <div class="col-lg-12 d-flex justify-content-center">
                      <div class="form-check mb-3">
                        <input v-model="termsAgreed" type="checkbox" class="form-check-input" id="customCheck1" />
                        <label class="form-check-label" for="customCheck1">I agree with the terms of use</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary" :disabled="isLoading">
                      {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
                    </button>
                  </div>
                  
                  <p class="mt-3 text-center">Already have an Account? <router-link :to="{ name: 'auth.login' }" class="text-underline">Sign In</router-link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="sign-bg sign-bg-right">
          <svg width="280" height="230" viewBox="0 0 421 359" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.05">
              <rect x="-15.0845" y="154.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -15.0845 154.773)" fill="#3A57E8" />
              <rect x="149.47" y="319.328" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 149.47 319.328)" fill="#3A57E8" />
              <rect x="203.936" y="99.543" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 203.936 99.543)" fill="#3A57E8" />
              <rect x="204.316" y="-229.172" width="543" height="77.5714" rx="38.7857" transform="rotate(45 204.316 -229.172)" fill="#3A57E8" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()

// Form Data
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const role = ref('patient') // Default to 'patient'
const password = ref('')
const confirmPassword = ref('')
const termsAgreed = ref(false)

// State
const isLoading = ref(false)
const errorMessage = ref('')

const handleSignUp = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    // --- 1. EXPLICIT VALIDATION ---
    // This part ensures the user sees the error warning
    if (!firstName.value || !lastName.value || !email.value) {
      throw new Error("Please fill in all contact information.")
    }
    if (password.value !== confirmPassword.value) {
      throw new Error("Passwords do not match.")
    }
    if (password.value.length < 6) {
      throw new Error("Password must be at least 6 characters.")
    }
    if (!termsAgreed.value) {
      throw new Error("You must agree to the terms of use.")
    }

    // --- 2. CREATE LOGIN ---
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })

    if (authError) throw authError

    // --- 3. CREATE PROFILE (With Role) ---
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email: email.value,
            role: role.value, // <--- SAVES 'patient' OR 'doctor'
            full_name: `${firstName.value} ${lastName.value}`,
            // phone: phone.value // Uncomment if you added the phone column
          }
        ])

      if (profileError) {
        throw new Error('Profile Error: ' + profileError.message)
      }
    }

    // --- 4. SUCCESS ---
    alert('Account created successfully! Please log in.')
    router.push({ name: 'auth.login' })

  } catch (error) {
    console.error('Signup Error:', error)
    // This puts the text into the red box
    errorMessage.value = error.message 
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped></style>