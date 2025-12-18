<template>
  <nav :class="`nav navbar navbar-expand-xl navbar-light iq-navbar ${headerNavbar}`">
    <div class="container-fluid navbar-inner">
      <slot></slot>
      
      <div class="input-group search-input" v-if="isSearch">
        <span class="input-group-text" id="search-input">
          <icon-component type="outlined" :size="18" icon-name="search"></icon-component>
        </span>
        <input type="search" class="form-control" placeholder="Search..." />
      </div>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
          <span class="mt-2 navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
          
          <li class="nav-item dropdown">
            <a href="#" class="nav-link" id="notification-drop" data-bs-toggle="dropdown">
              <icon-component type="dual-tone" icon-name="bell"></icon-component>
              <span class="bg-danger dots"></span>
            </a>
            <div class="p-0 sub-drop dropdown-menu dropdown-menu-end" aria-labelledby="notification-drop">
              <b-card no-body class="m-0 shadow-none">
                <div class="py-3 card-header d-flex justify-content-between bg-primary">
                  <b-card-title>
                    <h5 class="mb-0 text-white">All Notifications</h5>
                  </b-card-title>
                </div>
                <b-card-body class="p-0">
                  <div class="text-center p-3">No new notifications</div>
                </b-card-body>
              </b-card>
            </div>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="@/assets/images/avatars/01.png" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
              
              <div class="caption ms-3 d-none d-md-block">
                <h6 class="mb-0 caption-title">{{ userName }}</h6>
                <p class="mb-0 caption-sub-title">{{ userRole }}</p>
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><router-link class="dropdown-item" :to="{ name: 'default.user-profile' }">Profile</router-link></li>
              <li><router-link class="dropdown-item" :to="{ name: 'default.user-privacy-setting' }">Privacy Setting</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { computed, ref, onMounted, onUnmounted } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  import { supabase } from '@/supabase'

  /* eslint-disable no-undef */
  defineProps({
    isGoPro: { type: Boolean, default: false },
    isSearch: { type: Boolean, default: false }
  })
  /* eslint-enable no-undef */

  const store = useStore()
  const router = useRouter()
  const headerNavbar = computed(() => store.getters['setting/header_navbar'])

  // User Data State
  const userName = ref('Loading...')
  const userRole = ref('')

  const onscroll = () => {
    const yOffset = document.documentElement.scrollTop
    const navbar = document.querySelector('.navs-sticky')
    if (navbar !== null) {
      if (yOffset >= 100) {
        navbar.classList.add('menu-sticky')
      } else {
        navbar.classList.remove('menu-sticky')
      }
    }
  }

  onMounted(async () => {
    window.addEventListener('scroll', onscroll())

    console.log("1. Navbar mounted. Checking auth...")

    // Get current auth user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error("Auth Error:", authError)
      userName.value = "Auth Error"
      return
    }

    if (user) {
      console.log("2. User found:", user.id)
      
      // Fetch profile details
      const { data: profile, error: dbError } = await supabase
        .from('profiles')
        .select('*') // Select ALL columns to see what we actually have
        .eq('id', user.id)
        .single()

      if (dbError) {
        console.error("3. Database Error:", dbError.message, dbError.details)
        userName.value = "DB Error"
      } else if (profile) {
        console.log("3. Profile found:", profile)
        
        // LOGIC: Check which fields are actually full
        const fName = profile.first_name || ''
        const lName = profile.last_name || ''
        const full = profile.full_name || ''
        
        // Prioritize full_name, otherwise combine first+last
        userName.value = full || `${fName} ${lName}`.trim() || 'No Name Found'
        
        // Role logic
        if (profile.role) {
          userRole.value = profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
        } else {
          userRole.value = 'User'
        }
      } else {
        console.warn("3. User exists in Auth, but NO PROFILE ROW found.")
        userName.value = "No Profile"
      }
    } else {
      console.log("2. No user logged in.")
      userName.value = 'Guest'
    }
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onscroll())
  })

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push({ name: 'auth.login' })
  }
</script>

<style>
.iq-product-menu-responsive .offcanvas-header {
  display: none;
}
</style>