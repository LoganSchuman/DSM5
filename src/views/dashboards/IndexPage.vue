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
              <div class="dropdown">
                <a href="#" class="text-secondary dropdown-toggle" id="dropdownMenuButton22" data-bs-toggle="dropdown" aria-expanded="false"> This Week </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton22">
                  <li><a class="dropdown-item" href="#">This Week</a></li>
                  <li><a class="dropdown-item" href="#">This Month</a></li>
                  <li><a class="dropdown-item" href="#">This Year</a></li>
                </ul>
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
                <p class="mb-0">
                  <svg class="me-2 text-primary" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path>
                  </svg>
                  Last 5 patient events
                </p>
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
               <div class="mb-2 d-flex profile-media align-items-top">
                <div class="mt-1 profile-dots-pills border-primary"></div>
                <div class="ms-4">
                  <h6 class="mb-1">New ASRS result for Priya V.</h6>
                  <span class="mb-0">Yesterday</span>
                </div>
              </div>
               <div class="mb-1 d-flex profile-media align-items-top">
                <div class="mt-1 profile-dots-pills border-success"></div>
                <div class="ms-4">
                  <h6 class="mb-1">New Patient: Robert Chin</h6>
                  <span class="mb-0">2 days ago</span>
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
            <h4 class="mb-2 card-title">Patient Assessments</h4>
            <p class="mb-0">
              Overview of assigned and completed DSM-5 forms
            </p>
          </div>
        </div>
        <div class="p-0 card-body">
          <div class="mt-4 table-responsive">
            <table id="basic-table" class="table mb-0 table-striped" role="grid">
              <thead>
                <tr>
                  <th>PATIENT</th>
                  <th>ASSIGNED FORMS</th>
                  <th>LAST ACTIVITY</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="patient in patientData" :key="patient.patientId">
                  <td>
                    <div class="d-flex align-items-center">
                      <img class="rounded bg-soft-primary img-fluid avatar-40 me-3" :src="patient.avatar" alt="profile" />
                      <div>
                        <h6>{{ patient.name }}</h6>
                        <span class="text-secondary">{{ patient.patientId }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                     <span v-for="form in patient.assignedForms" :key="form" class="badge bg-soft-primary me-1">{{ form }}</span>
                  </td>
                  <td>{{ patient.lastActivity }}</td>
                  <td>
                     <span :class="`badge bg-${patient.statusColor}`">{{ patient.status }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue'
import AOS from 'aos'

import 'swiper/css';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const modules = [Navigation]

    // --- REPURPOSED DATA FOR MEDICAL DASHBOARD ---

    const kpiCards = ref([
      { title: 'Pending Assessments', value: '72' },
      { title: 'Completed Today', value: '14' },
      { title: 'Requires Review', value: '5' },
      { title: 'New Patients This Week', value: '8' }
    ]);

    const activityChart = ref({
      series: [
        {
          name: 'Completed Assessments',
          data: [12, 18, 14, 22, 19, 25, 21]
        }
      ],
      options: {
        chart: { type: 'area', height: 245, toolbar: { show: false }, sparkline: { enabled: false } },
        colors: ['#3a57e8'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        yaxis: { show: true, labels: { style: { colors: '#8A92A6' }, offsetX: -5 } },
        legend: { show: false },
        xaxis: {
          labels: { style: { colors: '#8A92A6' } },
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
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
                        total: {
                           show: true,
                           fontSize: '1rem',
                           label: 'Total',
                           formatter: function (w) {
                               return w.globals.seriesTotals.reduce((a, b) => { return a + b }, 0)
                           }
                        }
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
    
    const patientData = ref([
      {
        name: 'Johnathan Smith',
        patientId: 'P-00432',
        avatar: require('@/assets/images/shapes/01.png'),
        assignedForms: ['PHQ-9', 'GAD-7'],
        lastActivity: 'Oct 11, 2025',
        status: 'Completed',
        statusColor: 'success'
      },
       {
        name: 'Maria Garcia',
        patientId: 'P-00433',
        avatar: require('@/assets/images/shapes/02.png'),
        assignedForms: ['ASRS', 'PCL-5'],
        lastActivity: 'Oct 10, 2025',
        status: 'Requires Review',
        statusColor: 'danger'
      },
       {
        name: 'Ken Lee',
        patientId: 'P-00434',
        avatar: require('@/assets/images/shapes/03.png'),
        assignedForms: ['PHQ-9'],
        lastActivity: 'Oct 9, 2025',
        status: 'Pending',
        statusColor: 'primary'
      },
       {
        name: 'Priya Sharma',
        patientId: 'P-00435',
        avatar: require('@/assets/images/shapes/04.png'),
        assignedForms: ['GAD-7'],
        lastActivity: 'Oct 9, 2025',
        status: 'Completed',
        statusColor: 'success'
      },
       {
        name: 'Robert Chin',
        patientId: 'P-00436',
        avatar: require('@/assets/images/shapes/05.png'),
        assignedForms: ['MDQ'],
        lastActivity: 'Oct 8, 2025',
        status: 'Pending',
        statusColor: 'primary'
      },
    ]);

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
    return { modules, kpiCards, activityChart, statusChart, riskChart, patientData }
  }
}
</script>