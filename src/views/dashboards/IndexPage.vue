<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <div class="row row-cols-1" data-aos="fade-up" data-aos-delay="800">
        <div class="d-slider1 overflow-hidden">
          <Swiper
            class="p-0 m-0 mb-2 list-inline"
            :modules="modules"
            :slide-per-view="4"
            :space-between="32"
            :breakpoints="{
              320: { slidesPerView: 1 },
              550: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
              1400: { slidesPerView: 4 }
            }"
            :navigation="{
              nextEl: '#blog-tranding-next',
              prevEl: '#blog-tranding-prev'
            }">
            <SwiperSlide class="card card-slide" v-for="(item, index) in kpiCards" :key="index">
              <b-card-body>
                <div class="progress-widget">
                  <div class="progress-detail">
                    <p class="mb-2">{{ item.title }}</p>
                    <h4 class="counter">{{ item.value }}</h4>
                  </div>
                </div>
              </b-card-body>
            </SwiperSlide>
          </Swiper>
          <div class="swiper-button swiper-button-next" id="blog-tranding-next"></div>
          <div class="swiper-button swiper-button-prev" id="blog-tranding-prev"></div>
        </div>
      </div>
    </div>

    <div class="col-md-12 col-lg-8">
      <div class="row">
        <div class="col-md-12" data-aos="fade-up" data-aos-delay="800">
          <div class="card">
            <div class="flex-wrap card-header d-flex justify-content-between align-items-center">
              <div class="header-title">
                <h4 class="card-title">Weekly Activity</h4>
                <p class="mb-0">Assessments Completed Per Day</p>
              </div>
            </div>
            <div class="card-body">
              <apexchart :height="245" type="area" id="d-main" :options="activityChart.options" :series="activityChart.series" />
            </div>
          </div>
        </div>

        <div class="col-md-12 col-xl-6">
          <div class="card" data-aos="fade-up" data-aos-delay="1000">
            <div class="card-header d-flex justify-content-between flex-wrap">
              <div class="header-title">
                <h4 class="card-title">Assessment Status</h4>
              </div>
            </div>
            <div class="card-body">
               <apexchart :height="260" type="radialBar" id="myChart1" :options="statusChart.options" :series="statusChart.series" />
            </div>
          </div>
        </div>

        <div class="col-md-12 col-xl-6">
          <div class="card" data-aos="fade-up" data-aos-delay="1200">
            <div class="card-header d-flex justify-content-between flex-wrap">
              <div class="header-title">
                <h4 class="card-title">Patient Risk Levels</h4>
              </div>
            </div>
            <div class="card-body">
              <apexchart :height="195" type="bar" class="dactivity1" id="dactivity1" :options="riskChart.options" :series="riskChart.series" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 col-lg-4">
      <div class="row">
         <div class="col-md-12 col-lg-12">
          <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="600">
            <div class="flex-wrap card-header d-flex justify-content-between">
              <div class="header-title">
                <h4 class="mb-2 card-title">Recent Activity</h4>
                <p class="mb-0">Last patient events</p>
              </div>
            </div>
            <div class="card-body">
              <div class="mb-2 d-flex profile-media align-items-top">
                <div class="mt-1 profile-dots-pills border-primary"></div>
                <div class="ms-4">
                  <h6 class="mb-1">System Live</h6>
                  <span class="mb-0">Realtime Connection Active</span>
                </div>
              </div>
              <div class="mb-2 d-flex profile-media align-items-top">
                <div class="mt-1 profile-dots-pills border-success"></div>
                <div class="ms-4">
                  <h6 class="mb-1">Inbox Synced</h6>
                  <span class="mb-0">Waiting for updates...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-md-12 col-lg-12">
      <div class="overflow-hidden card aos-init aos-animate" data-aos="fade-up" data-aos-delay="600">
        <div class="flex-wrap card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="mb-2 card-title">Patient Assessments Inbox</h4>
            <p class="mb-0">
              Real-time view of forms assigned to your patients.
            </p>
          </div>
          <button class="btn btn-sm btn-soft-primary" @click="fetchInbox">Refresh List</button>
        </div>
        <div class="p-0 card-body">
          <div class="mt-4 table-responsive">
            <table id="basic-table" class="table mb-0 table-hover" role="grid">
              <thead>
                <tr>
                  <th>PATIENT</th>
                  <th>FORM</th>
                  <th>RESULT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in inbox" :key="item.id">
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="rounded bg-soft-primary d-flex align-items-center justify-content-center me-3" style="width:40px; height:40px;">
                        <span class="fw-bold">{{ item.patientInitials }}</span>
                      </div>
                      <div>
                        <h6>{{ item.patientName }}</h6>
                        <span class="text-secondary small">ID: ...{{ item.patientId.slice(-4) }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                     <span class="fw-bold">{{ item.form_title }}</span>
                  </td>
                  <td>
                    <span v-if="item.status === 'Completed'" class="fw-bold text-dark">{{ item.score }} / 27</span>
                    <span v-else class="text-muted">-</span>
                  </td>
                  <td>
                     <span :class="`badge ${item.status === 'Completed' ? 'bg-success' : 'bg-warning'}`">
                       {{ item.status }}
                     </span>
                  </td>
                  <td>
                    <button v-if="item.status === 'Completed'" class="btn btn-primary btn-sm" @click="handleReview(item)">Review</button>
                    <button v-else class="btn btn-soft-secondary btn-sm" disabled>Waiting...</button>
                  </td>
                </tr>
                <tr v-if="inbox.length === 0">
                    <td colspan="5" class="text-center py-4">
                        <div class="text-muted">No assignments found. Go to 'Assessments' to assign a form.</div>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <PatientActionModal 
      :isOpen="showModal" 
      :patient="selectedPatient" 
      :submission="selectedSubmission" 
      @close="showModal = false"
      @assignment-success="handleAssignmentSuccess"
    />

  </div>
</template>

<script>
// 1. Added 'inject' to imports
import { onMounted, onBeforeUnmount, ref, inject } from 'vue'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue'
import AOS from 'aos'
import { supabase } from '@/supabase' 
import PatientActionModal from '@/components/PatientActionModal.vue'

// Styles needed for Swiper
import 'swiper/css';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
    PatientActionModal
  },
  setup() {
    const modules = [Navigation]
    const inbox = ref([])
    let realtimeChannel = null

    // 2. Inject SweetAlert
    const swal = inject('$swal')

    // Modal State
    const showModal = ref(false)
    const selectedPatient = ref(null)
    const selectedSubmission = ref(null)

    // --- 1. Fetch Inbox Data ---
    const fetchInbox = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: assignments, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('doctor_id', user.id)
        .order('created_at', { ascending: false })

      if (error || !assignments) return

      // Get Patient Names
      const patientIds = [...new Set(assignments.map(a => a.patient_id))]
      let profilesMap = {}
      
      if (patientIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, full_name') 
          .in('id', patientIds)
        
        if (profiles) {
            profiles.forEach(p => {
              profilesMap[p.id] = p.full_name || 'Patient'
            })
        }
      }

      inbox.value = assignments.map(a => ({
        ...a,
        patientName: profilesMap[a.patient_id] || 'Unknown Patient',
        patientInitials: (profilesMap[a.patient_id] || 'U').substring(0,2).toUpperCase(),
        patientId: a.patient_id
      }))
    }

    // --- 2. Handle Review Click (Using Modal) ---
    const handleReview = (item) => {
      selectedPatient.value = {
        name: item.patientName,
        id: item.patientId
      }

      const mockData = { 
        q1: 2, q2: 3, q3: 1, 
        q4: 0, q5: 0, 
        q6: 0, q7: 0, q8: 0,
        q11: 0 
      }

      selectedSubmission.value = {
        formId: 'level-1-adult', 
        formName: item.form_title || 'Level 1 Cross-Cutting Symptom Measure',
        score: item.score,
        data: (item.data && Object.keys(item.data).length > 0) ? item.data : mockData
      }

      console.log("Opening Modal with:", selectedSubmission.value) 
      showModal.value = true
    }

    // --- NEW: Handle Success Toast ---
    const handleAssignmentSuccess = () => {
      swal.fire({
        title: 'Sent!',
        text: 'The follow-up form has been sent successfully.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      })
      
      // Also refresh the inbox so the new status shows up immediately
      fetchInbox()
    }

    // --- 3. Realtime Listener ---
    const setupRealtime = () => {
      realtimeChannel = supabase
        .channel('public:assignments')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'assignments' }, () => {
          console.log("Change detected! Refreshing inbox...")
          fetchInbox()
        })
        .subscribe()
    }

    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
      
      fetchInbox()
      setupRealtime()
    })

    onBeforeUnmount(() => {
      if (realtimeChannel) supabase.removeChannel(realtimeChannel)
    })

    // --- 4. Restored Static Chart Data ---
    const kpiCards = ref([
      { title: 'Pending Assessments', value: '72' },
      { title: 'Completed Today', value: '14' },
      { title: 'Requires Review', value: '5' },
      { title: 'New Patients This Week', value: '8' }
    ]);

    const activityChart = ref({
      series: [{ name: 'Completed Assessments', data: [12, 18, 14, 22, 19, 25, 21] }],
      options: {
        chart: { type: 'area', height: 245, toolbar: { show: false }, sparkline: { enabled: false } },
        colors: ['#3a57e8'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        yaxis: { show: true, labels: { style: { colors: '#8A92A6' }, offsetX: -5 } },
        legend: { show: false },
        xaxis: { labels: { style: { colors: '#8A92A6' } }, categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        grid: { show: false },
        tooltip: { enabled: true }
      }
    });

    const statusChart = ref({
        series: [75, 20, 5],
        options: {
            chart: { height: 260, type: 'radialBar' },
            colors: ['#3a57e8', '#ff9432', '#f43344'],
            plotOptions: {
                radialBar: {
                    hollow: { margin: 10, size: '50%' },
                    track: { margin: 10, strokeWidth: '50%' },
                    dataLabels: {
                        show: true,
                        name: { fontSize: '1rem' },
                        value: { fontSize: '1rem'},
                        total: { show: true, fontSize: '1rem', label: 'Total', formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0) }
                    }
                }
            },
            labels: ['Completed', 'Pending', 'Overdue']
        }
    });

    const riskChart = ref({
        series: [
            { name: 'Low Risk', data: [44, 55, 41, 67] },
            { name: 'Medium Risk', data: [13, 23, 20, 8] },
            { name: 'High Risk', data: [11, 17, 15, 15] }
        ],
        options: {
            chart: { type: 'bar', height: 230, stacked: true, toolbar: { show: false } },
            colors: ['#4093f7', '#ff9432', '#f43344'],
            plotOptions: { bar: { horizontal: false, columnWidth: '35%', borderRadius: 5 } },
            xaxis: { categories: ['PHQ-9', 'GAD-7', 'ASRS', 'PCL-5'], labels: { style: { colors: '#8A92A6' } } },
            yaxis: { labels: { style: { colors: '#8A92A6' } } },
            legend: { position: 'top', horizontalAlign: 'right' },
            fill: { opacity: 1 },
        }
    });

    return { 
        modules, kpiCards, activityChart, statusChart, riskChart, 
        inbox, fetchInbox, handleReview,
        showModal, selectedPatient, selectedSubmission,
        handleAssignmentSuccess // Return the new function
    }
  }
}
</script>

<style>
.modal-content {
    background-color: #fff !important;
    z-index: 1055 !important;
}
</style>