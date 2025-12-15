<template>
  <section class="login-content auth-signin-page">
    <b-row class="m-0 align-items-center h-100">
      <!-- Left Side - Login Form -->
      <b-col md="6" class="p-0 login-left">
        <div class="login-form-wrapper">
          <b-row class="justify-content-center h-100">
            <b-col md="10" class="d-flex flex-column justify-content-center">
              <!-- Logo Section -->
              <div class="mb-5 text-center logo-section">
                <router-link :to="{ name: 'auth.login' }" class="navbar-brand d-flex align-items-center justify-content-center mb-3">
                  <brand-logo></brand-logo>
                  <h4 class="logo-title ms-3 mb-0 text-primary fw-bold" data-setting="app_name"><brand-name></brand-name></h4>
                </router-link>
              </div>

              <!-- Form Card -->
              <b-card class="auth-signin-card shadow-lg border-0">
                <b-card-body class="p-5">
                  <!-- Header -->
                  <div class="text-center mb-4">
                    <h1 class="h2 fw-bold text-dark mb-2">Welcome Back</h1>
                    <p class="text-muted small">Sign in to access your medical dashboard</p>
                  </div>

                  <!-- Error Message -->
                  <b-alert v-if="errorMessage" variant="danger" class="mb-4" dismissible @dismissed="errorMessage = ''">
                    <strong>Login Error:</strong> {{ errorMessage }}
                  </b-alert>

                  <!-- Loading State -->
                  <div v-if="isLoading" class="text-center py-4">
                    <b-spinner variant="primary" class="me-2"></b-spinner>
                    <span class="text-muted">Authenticating...</span>
                  </div>

                  <!-- Login Form -->
                  <form v-else @submit.prevent="handleSignIn" class="login-form">
                    <!-- Email Field -->
                    <div class="mb-4">
                      <label for="email" class="form-label fw-semibold text-dark">Email Address</label>
                      <div class="input-group">
                        <span class="input-group-text bg-light border-0">
                          <i class="fas fa-envelope text-primary"></i>
                        </span>
                        <input
                          v-model="email"
                          type="email"
                          class="form-control bg-light border-0"
                          id="email"
                          placeholder="you@example.com"
                          required
                          :disabled="isLoading"
                        />
                      </div>
                    </div>

                    <!-- Password Field -->
                    <div class="mb-4">
                      <label for="password" class="form-label fw-semibold text-dark">Password</label>
                      <div class="input-group">
                        <span class="input-group-text bg-light border-0">
                          <i class="fas fa-lock text-primary"></i>
                        </span>
                        <input
                          v-model="password"
                          type="password"
                          class="form-control bg-light border-0"
                          id="password"
                          placeholder="••••••••"
                          required
                          :disabled="isLoading"
                        />
                      </div>
                    </div>

                    <!-- Remember & Forgot Password -->
                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <div class="form-check">
                        <input v-model="rememberMe" type="checkbox" class="form-check-input" id="rememberCheck" />
                        <label class="form-check-label small" for="rememberCheck">Remember me</label>
                      </div>
                      <router-link :to="{ name: 'auth.reset-password' }" class="small text-primary text-decoration-none fw-semibold">
                        Forgot Password?
                      </router-link>
                    </div>

                    <!-- Submit Button -->
                    <button
                      type="submit"
                      class="btn btn-primary w-100 py-2 fw-semibold mb-3"
                      :disabled="isLoading"
                    >
                      <span v-if="!isLoading">Sign In</span>
                      <span v-else>
                        <b-spinner small class="me-2"></b-spinner>Signing In...
                      </span>
                    </button>
                  </form>

                  <!-- Social Login Options -->
                  <div class="divider-with-text mb-4">
                    <span>Or continue with</span>
                  </div>

                  <div class="d-flex gap-2 mb-4">
                    <button type="button" class="btn btn-outline-secondary flex-fill py-2">
                      <i class="fab fa-google"></i>
                    </button>
                    <button type="button" class="btn btn-outline-secondary flex-fill py-2">
                      <i class="fab fa-facebook"></i>
                    </button>
                    <button type="button" class="btn btn-outline-secondary flex-fill py-2">
                      <i class="fab fa-apple"></i>
                    </button>
                  </div>

                  <!-- Sign Up Link -->
                  <p class="text-center text-muted small mb-0">
                    Don't have an account?
                    <router-link :to="{ name: 'auth.register' }" class="text-primary fw-semibold text-decoration-none">
                      Sign up here
                    </router-link>
                  </p>
                </b-card-body>
              </b-card>

              <!-- Decorative Elements -->
              <div class="sign-bg">
                <svg width="280" height="230" viewBox="0 0 431 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.05">
                    <rect x="-157.085" y="193.773" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 -157.085 193.773)" fill="#3B8AFF" />
                    <rect x="7.46875" y="358.327" width="543" height="77.5714" rx="38.7857" transform="rotate(-45 7.46875 358.327)" fill="#3B8AFF" />
                    <rect x="61.9355" y="138.545" width="310.286" height="77.5714" rx="38.7857" transform="rotate(45 61.9355 138.545)" fill="#3B8AFF" />
                    <rect x="62.3154" y="-190.173" width="543" height="77.5714" rx="38.7857" transform="rotate(45 62.3154 -190.173)" fill="#3B8AFF" />
                  </g>
                </svg>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-col>

      <!-- Right Side - Hero Image -->
      <b-col md="6" class="d-md-block d-none login-right p-0">
        <div class="hero-image-wrapper">
          <div class="gradient-overlay"></div>
          <img src="@/assets/images/auth/01.png" class="img-fluid gradient-main animated-scaleX h-100" alt="Medical Dashboard" loading="lazy" />
          <div class="hero-content">
            <h2 class="text-white fw-bold mb-3">Secure Patient & Doctor Dashboard</h2>
            <p class="text-white-50">Manage patient assessments, health forms, and medical records with confidence</p>
          </div>
        </div>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleSignIn = async () => {
  // Reset error message
  errorMessage.value = ''
  isLoading.value = true

  try {
    // Sign in with Supabase
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (signInError) {
      errorMessage.value = signInError.message || 'Failed to sign in. Please try again.'
      isLoading.value = false
      return
    }

    // Get user role from profiles table
    if (data.user) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (profileError) {
        console.error('Error fetching user profile:', profileError)
        errorMessage.value = 'Unable to load user profile. Please try again.'
        isLoading.value = false
        return
      }

      // Store user preference if remember me is checked
      if (rememberMe.value) {
        localStorage.setItem('rememberEmail', email.value)
      } else {
        localStorage.removeItem('rememberEmail')
      }

      // Redirect based on user role
      if (profileData && profileData.role === 'doctor') {
        // Redirect doctor to their dashboard (DSM-5 Hub / Patient Management)
        router.push({ name: 'default.dsm-hub' })
      } else {
        // Redirect patient to their dashboard
        router.push({ name: 'default.user-dashboard' })
      }
    }
  } catch (error) {
    console.error('Sign in error:', error)
    errorMessage.value = error.message || 'An unexpected error occurred. Please try again.'
    isLoading.value = false
  }
}

// Load remembered email if available
const loadRememberedEmail = () => {
  const rememberedEmail = localStorage.getItem('rememberEmail')
  if (rememberedEmail) {
    email.value = rememberedEmail
    rememberMe.value = true
  }
}

// Load on component mount
loadRememberedEmail()
</script>

<style lang="scss" scoped>
.auth-signin-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #f1f5f9 100%);
  min-height: 100vh;
  display: flex;

  .login-left {
    background: #ffffff;
    position: relative;
    overflow: hidden;

    .login-form-wrapper {
      height: 100%;
      padding: 2rem 1rem;
      display: flex;
      align-items: center;
    }
  }

  .login-right {
    background: linear-gradient(135deg, #3b8aff 0%, #2563eb 100%);
    position: relative;
    overflow: hidden;

    .hero-image-wrapper {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .gradient-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(59, 138, 255, 0.3) 0%, rgba(37, 99, 235, 0.5) 100%);
        z-index: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hero-content {
        position: absolute;
        bottom: 3rem;
        left: 2rem;
        right: 2rem;
        z-index: 2;
        text-align: center;

        h2 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 0.95rem;
          margin-bottom: 0;
        }
      }
    }
  }

  .logo-section {
    .navbar-brand {
      &:hover {
        transform: translateY(-2px);
        transition: transform 0.3s ease;
      }
    }

    .logo-title {
      font-size: 1.5rem;
    }
  }

  .auth-signin-card {
    border-radius: 1rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
    }

    .form-label {
      font-size: 0.95rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .input-group {
      margin-bottom: 0.25rem;

      .input-group-text {
        border: none;
        padding: 0.75rem 1rem;

        i {
          font-size: 1.1rem;
        }
      }

      .form-control {
        border: 1px solid #e2e8f0;
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
        transition: all 0.3s ease;

        &:focus {
          border-color: #3b8aff;
          box-shadow: 0 0 0 3px rgba(59, 138, 255, 0.1);
        }

        &::placeholder {
          color: #a0aec0;
        }
      }
    }

    .form-check-label {
      color: #718096;
      font-weight: 500;
    }
  }

  .btn-primary {
    background: linear-gradient(135deg, #3b8aff 0%, #2563eb 100%);
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 138, 255, 0.3);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .btn-outline-secondary {
    border-color: #cbd5e0;
    color: #4a5568;
    border-radius: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      background: #f7fafc;
      border-color: #a0aec0;
      transform: translateY(-2px);
    }

    i {
      font-size: 1.1rem;
    }
  }

  .divider-with-text {
    display: flex;
    align-items: center;
    color: #a0aec0;
    font-size: 0.85rem;
    font-weight: 500;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e2e8f0;
    }

    span {
      padding: 0 1rem;
      color: #718096;
    }
  }

  .sign-bg {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;
    z-index: 0;

    svg {
      opacity: 0.05;
    }
  }

  // Responsive
  @media (max-width: 767px) {
    .login-right {
      display: none !important;
    }

    .login-left {
      .login-form-wrapper {
        padding: 1rem;
        min-height: 100vh;
      }
    }

    .auth-signin-card {
      .b-card-body {
        padding: 2rem 1rem !important;
      }
    }
  }
}

// Animation
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-signin-card {
  animation: slideInUp 0.5s ease-out;
}
</style>
