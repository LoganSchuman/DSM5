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
                  <h6 class="mb-1">New PHQ-9 result for John S.</h6>
                  <span class="mb-0">10:15 AM</span>
                </div>
              </div>
              <div class="mb-2 d-flex profile-media align-items-top">
                <div class="mt-1 profile-dots-pills border-success"></div>
                <div class="ms-4">
                  <h6 class="mb-1">GAD-7 assigned to Maria G.</h6>
                  <span class="mb-0">9:45 AM</span>
                </div>
              </div>
              <div class="mb-2 d-flex profile-media align-items-top">
                <div class="mt-1 profile-dots-pills border-danger"></div>
                <div class="ms-4">
                  <h6 class="mb-1">Follow-up required for Ken L.</h6>
                  <span class="mb-0">Yesterday</span>
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
              Click on a completed assessment to review results and assign follow-ups.
            </p>
          </div>
          <button class="btn btn-sm btn-soft-danger" @click="resetDemo">Reset Demo Data</button>
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
                <tr v-for="item in inbox" :key="item.id" @click="openReview(item)" :style="item.status === 'Completed' ? 'cursor: pointer' : ''">
                  <td>
                    <div class="d-flex align-items-center">
                      <img class="rounded bg-soft-primary img-fluid avatar-40 me-3" :src="item.avatar" alt="profile" />
                      <div>
                        <h6>{{ item.patientName }}</h6>
                        <span class="text-secondary">ID: {{ item.patientId }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                     <span class="fw-bold">{{ item.name }}</span>
                  </td>
                  <td>
                    <span v-if="item.scoreSummary" class="text-dark fw-bold">{{ item.scoreSummary }}</span>
                    <span v-else class="text-muted">-</span>
                  </td>
                  <td>
                     <span :class="`badge bg-${item.statusVariant}`">{{ item.status }}</span>
                  </td>
                  <td>
                    <button v-if="item.status === 'Completed'" class="btn btn-primary btn-sm">Review</button>
                    <button v-else class="btn btn-soft-secondary btn-sm" disabled>Waiting...</button>
                  </td>
                </tr>
                <tr v-if="inbox.length === 0">
                    <td colspan="5" class="text-center py-4">
                        <div class="text-muted">No assessments found. The patient has not started the initial screening.</div>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <b-modal 
      v-model="showReviewModal" 
      title="Assessment Review" 
      size="lg" 
      hide-footer
      content-class="bg-white"
      @hidden="cleanupModal"
    >
      <div v-if="selectedItem">
        <div class="d-flex justify-content-between align-items-center bg-soft-primary p-3 rounded mb-4">
           <div class="d-flex align-items-center">
             <div class="me-3">
               <h5 class="mb-1">{{ selectedItem.name }} Results</h5>
               <p class="mb-0 text-primary">{{ selectedItem.scoreSummary }}</p>
             </div>
           </div>
           <button class="btn btn-outline-primary btn-sm" @click="viewAnswers(selectedItem)">
              View Patient Answers
           </button>
        </div>

        <h5 class="mt-4">AI Recommendations</h5>
        <p class="text-muted">Based on the patient's answers, the following actions are recommended:</p>
        
        <div class="row g-3">
            <div class="col-md-12" v-for="(rec, idx) in selectedItem.recommendations" :key="idx">
                <div class="card border-primary border shadow-none mb-0">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-primary mb-1">{{ rec.name }}</h6>
                            <p class="mb-0 text-dark small">{{ rec.reason }}</p>
                        </div>
                        <button 
                            v-if="rec.formId !== 'none' && rec.formId !== 'consult'" 
                            class="btn btn-primary btn-sm"
                            @click="assignRecommended(rec)"
                        >
                            Assign {{ rec.name }} Now
                        </button>
                        <button 
                            v-else-if="rec.formId === 'consult'"
                            class="btn btn-warning btn-sm"
                        >
                            Book Consult
                        </button>
                        <span v-else class="badge bg-success">Complete</span>
                    </div>
                </div>
            </div>
             <div v-if="!selectedItem.recommendations || selectedItem.recommendations.length === 0">
                <p>No specific automated recommendations generated.</p>
            </div>
        </div>

        <hr class="my-4">
        
        <div class="d-flex justify-content-end gap-2">
            <button class="btn btn-secondary" @click="showReviewModal = false">Close</button>
            <button class="btn btn-outline-primary" @click="$router.push({name: 'default.dsm-hub'})">Browse Form Library</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
// IMPORT onBeforeUnmount
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue'
import AOS from 'aos'
import Swal from 'sweetalert2'
import { useMockStore } from '@/store/MockStore.js' 

import 'swiper/css';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const modules = [Navigation]
    const router = useRouter()
    
    // --- STORE INTEGRATION ---
    const { getAllPatientActivity, assignForm, resetDemo } = useMockStore()
    const inbox = computed(() => getAllPatientActivity())
    
    // 2. Modal Logic
    const showReviewModal = ref(false)
    const selectedItem = ref(null)

    const openReview = (item) => {
        if (item.status !== 'Completed') return
        selectedItem.value = item
        showReviewModal.value = true
    }

    // NUCLEAR OPTION CLEANUP
    // This force-removes the scroll lock and backdrops
    const cleanupModal = () => {
        // Reset local state
        selectedItem.value = null
        
        // Force cleanup of DOM
        setTimeout(() => {
            document.body.classList.remove('modal-open')
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
            
            // Remove any stuck backdrops
            const backdrops = document.querySelectorAll('.modal-backdrop')
            backdrops.forEach(el => el.remove())
        }, 150)
    }

    // Call cleanup when leaving the page (Crucial for router navigation)
    onBeforeUnmount(() => {
        cleanupModal()
    })

    const viewAnswers = (item) => {
        // Close modal first
        showReviewModal.value = false
        // Then navigate
        router.push(item.link)
    }

    const assignRecommended = (rec) => {
        assignForm('p1', rec.formId, rec.name, `Follow-up based on results from ${selectedItem.value.name}`)
        showReviewModal.value = false
        
        // Wait for cleanup before showing SweetAlert
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Assigned!',
                text: `${rec.name} has been assigned to the patient dashboard.`,
                timer: 2000,
                showConfirmButton: false
            })
        }, 400)
    }

    // --- STATIC CHART DATA ---
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

    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
    })

    return { 
        modules, kpiCards, activityChart, statusChart, riskChart, 
        inbox, 
        openReview, 
        showReviewModal, 
        selectedItem, 
        assignRecommended, 
        resetDemo,
        viewAnswers, // New helper
        cleanupModal // Return cleanup
    }
  }
}
</script>

<style>
.modal-content {
    background-color: #fff !important;
    z-index: 1055 !important;
}
.modal-backdrop {
    z-index: 1045 !important;
}
</style>