<template>
  <div class="row">
    <div class="col-md-12 col-lg-12" data-aos="fade-up" data-aos-delay="200">
      <div class="row row-cols-1 row-cols-md-4 g-3">
        <div class="col">
          <b-card class="action-card text-center h-80">
            <b-card-body class="d-flex flex-column">
              <div class="mb-3">
                <i class="icon text-primary" style="font-size: 2rem;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36c-.5-.63-1.48-.67-2.11-.15-.63.5-.67 1.48-.15 2.11l2.91 3.5c.47.59 1.26.94 2.11.94s1.64-.35 2.11-.94l4.05-5.15c.52-.62.48-1.6-.15-2.11-.62-.52-1.6-.48-2.11.15z" fill="currentColor"></path>
                  </svg>
                </i>
              </div>
              <h6 class="card-title">Book Appointment</h6>
              <p class="text-muted small mb-auto pb-3">Schedule a visit with your doctor</p>
              <b-button size="sm" variant="primary">Book Now</b-button>
            </b-card-body>
          </b-card>
        </div>
        <div class="col">
          <b-card class="action-card text-center h-80">
            <b-card-body class="d-flex flex-column">
              <div class="mb-3">
                <i class="icon text-info" style="font-size: 2rem;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-.02-2H20v2zm0-4H6v-2h14v2zm0-4H6V6h14v2z" fill="currentColor"></path>
                  </svg>
                </i>
              </div>
              <h6 class="card-title">Message Doctor</h6>
              <p class="text-muted small mb-auto pb-3">Send a message to your physician</p>
              <b-button size="sm" variant="info">Send Message</b-button>
            </b-card-body>
          </b-card>
        </div>
        <div class="col">
          <b-card class="action-card text-center h-80">
            <b-card-body class="d-flex flex-column">
              <div class="mb-3">
                <i class="icon text-success" style="font-size: 2rem;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 5C6.47 5 2 8.13 2 12s4.47 7 9.99 7C17.52 19 22 15.87 22 12s-4.48-7-10.01-7zM12 17c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 4 15.5 4 14 4.67 14 5.5s.67 1.5 1.5 1.5z" fill="currentColor"></path>
                  </svg>
                </i>
              </div>
              <h6 class="card-title">Upcoming Visits</h6>
              <p class="text-muted small mb-auto pb-3">View your scheduled appointments</p>
              <b-button size="sm" variant="success">View Calendar</b-button>
            </b-card-body>
          </b-card>
        </div>
        <div class="col">
          <b-card class="action-card text-center h-85">
            <b-card-body class="d-flex flex-column">
              <div class="mb-3">
                <i class="icon text-warning" style="font-size: 2rem;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"></path>
                  </svg>
                </i>
              </div>
              <h6 class="card-title">Medical Records</h6>
              <p class="text-muted small mb-auto pb-3">Access your medical health records</p>
              <b-button size="sm" variant="warning">View Records</b-button>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </div>

    <div class="col-md-12 col-lg-8" data-aos="fade-up" data-aos-delay="600">
      <b-card>
        <b-card-header class="border-bottom">
          <h4 class="card-title mb-0">Assigned Health Forms</h4>
          <p class="text-muted mb-0">Complete your health assessments to help your doctor provide better care</p>
        </b-card-header>
        <b-card-body>
          <div v-if="assignedForms.length === 0" class="text-center py-5">
            <p class="text-muted mb-0">No forms assigned yet</p>
          </div>
          <div v-for="(form, index) in assignedForms" :key="index" class="mb-3">
            <div class="d-flex justify-content-between align-items-start border-bottom pb-3">
              <div class="flex-grow-1">
                <h6 class="mb-1">{{ form.name }}</h6>
                <p class="text-muted small mb-2">{{ form.description }}</p>
                <div class="d-flex gap-2">
                  <b-badge :variant="form.statusVariant">{{ form.status }}</b-badge>
                  <span class="text-muted small">Due: {{ form.dueDate }}</span>
                </div>
              </div>
              <b-button 
                size="sm" 
                @click="$router.push(form.link)"
                :variant="form.status === 'Pending' ? 'primary' : 'secondary'"
                class="ms-3">
                {{ form.status === 'Completed' ? 'View' : 'Start' }}
              </b-button>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div class="col-md-12 col-lg-4" data-aos="fade-up" data-aos-delay="800">
      <b-card>
        <b-card-header class="border-bottom">
          <h4 class="card-title mb-0">Recent Activity</h4>
        </b-card-header>
        <b-card-body>
          <div v-for="(activity, index) in recentActivity" :key="index" class="mb-3 pb-3 border-bottom">
            <div class="d-flex">
              <div class="flex-shrink-0">
                <div class="avatar avatar-30" :style="{ backgroundColor: activity.color }">
                  <i class="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="white"></path>
                    </svg>
                  </i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="mb-1">{{ activity.title }}</h6>
                <p class="text-muted small mb-0">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div class="col-md-12" data-aos="fade-up" data-aos-delay="1000">
      <b-card>
        <b-card-header class="border-bottom">
          <h4 class="card-title mb-0">Important Information</h4>
        </b-card-header>
        <b-card-body>
          <div class="row">
            <div class="col-md-6 mb-3">
              <h6 class="fw-bold mb-2">Your Physician</h6>
              <p class="mb-1"><strong>Dr. Sarah Mitchell</strong></p>
              <p class="text-muted mb-2">MD, Internal Medicine</p>
              <p class="text-muted small"><strong>Phone:</strong> (555) 123-4567</p>
              <p class="text-muted small"><strong>Email:</strong> dr.mitchell@healthcenter.com</p>
            </div>
            <div class="col-md-6 mb-3">
              <h6 class="fw-bold mb-2">Clinic Information</h6>
              <p class="mb-1"><strong>Clinical Health Center</strong></p>
              <p class="text-muted small mb-2">123 Medical Plaza, Suite 200</p>
              <p class="text-muted small mb-2">Springfield, IL 62701</p>
              <p class="text-muted small"><strong>Phone:</strong> (555) 987-6543</p>
            </div>
          </div>
          <hr>
          <b-alert variant="info" class="mb-0">
            <strong>Reminder:</strong> Please complete your assigned forms regularly to help your physician provide better care. Your responses are secure and confidential.
          </b-alert>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useMockStore } from '@/store/MockStore.js' // Adjust path if needed

export default {
  setup() {
    // FIXED: Removed unused 'useRouter' call
    const { getPatientAssignments, assignForm, state } = useMockStore()
    
    const userProfile = state.currentUser

    // 1. Auto-assign DSM-5 Level 1 on first load if list is empty
    onMounted(() => {
      const myForms = getPatientAssignments(userProfile.id)
      if (myForms.length === 0) {
        assignForm(
          userProfile.id, 
          'ccsm-level1', 
          'DSM-5 Level 1 Cross-Cutting', 
          'Initial broad screening for mental health domains.'
        )
      }
    })

    // 2. Reactive list of forms from store
    const assignedForms = computed(() => getPatientAssignments(userProfile.id))

    // 3. Computed Stats
    const completedForms = computed(() => 
      assignedForms.value.filter(f => f.status === 'Completed').length
    )

    const pendingForms = computed(() => 
      assignedForms.value.filter(f => f.status === 'Pending').length
    )

    const overdueCount = computed(() => 
      assignedForms.value.filter(f => f.status === 'Overdue').length
    )
    
    // Static mock data for recent activity visualization
    const recentActivity = [
      { title: 'System Initialization', time: 'Just Now', color: '#4CAF50' }
    ]

    return {
      userProfile,
      assignedForms,
      recentActivity,
      completedForms,
      pendingForms,
      overdueCount
    }
  }
}
</script>

<style scoped>
.card-welcome {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-welcome .card-body {
  padding: 2rem;
}

.card-welcome h4 {
  color: white;
  margin-bottom: 0.5rem;
}

.card-welcome p {
  color: rgba(255, 255, 255, 0.9);
}

.progress-widget {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress-detail h4 {
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0;
}

.progress-detail p {
  font-size: 0.875rem;
  color: #6c757d;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.avatar-30 {
  width: 30px;
  height: 30px;
}
</style>