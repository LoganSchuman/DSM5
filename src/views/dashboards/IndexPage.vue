<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h2 class="mb-0">DSM-5 Dashboard</h2>
          <p>Your portal for administering, creating, analyzing, and understanding your patients.</p>
        </div>
        <b-button variant="primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2">
            <path d="M13.1118 4.14V4.14C11.6618 4.14 10.4618 5.33 10.4618 6.79V17.21C10.4618 18.66 11.6618 19.86 13.1118 19.86V19.86C14.5618 19.86 15.7618 18.66 15.7618 17.21V6.79C15.7618 5.33 14.5618 4.14 13.1118 4.14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M7.16113 7.37988V7.37988C5.71113 7.37988 4.51113 8.57988 4.51113 10.0299V17.2099C4.51113 18.6599 5.71113 19.8599 7.16113 19.8599V19.8599C8.61113 19.8599 9.81113 18.6599 9.81113 17.2099V10.0299C9.81113 8.57988 8.61113 7.37988 7.16113 7.37988Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M19.0713 10.62V10.62C17.6213 10.62 16.4213 11.82 16.4213 13.27V17.21C16.4213 18.66 17.6213 19.86 19.0713 19.86V19.86C20.5213 19.86 21.7213 18.66 21.7213 17.21V13.27C21.7213 11.82 20.5213 10.62 19.0713 10.62Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          Announcements
        </b-button>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-3 col-md-6" v-for="(card, index) in statCards" :key="index" data-aos="fade-up" :data-aos-delay="100 * (index + 1)">
      <b-card class="text-center">
        <b-card-body>
          <div class="mb-2 text-uppercase text-secondary" style="font-size: 0.9rem">{{ card.title }}</div>
          <h3 class="mb-0 display-6 fw-bold">{{ card.value }}</h3>
        </b-card-body>
      </b-card>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-md-12 col-lg-8">
      <div class="card" data-aos="fade-up" data-aos-delay="500">
        <div class="flex-wrap card-header d-flex justify-content-between align-items-center">
          <div class="header-title">
            <h4 class="card-title">Weekly Activity</h4>
            <p class="mb-0 text-secondary">Assessments Completed Per Day</p>
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
          <apexchart :height="245" type="area" id="d-main" :options="weeklyActivityChart.options" :series="weeklyActivityChart.series" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 col-xl-6">
          <div class="card" data-aos="fade-up" data-aos-delay="600">
            <div class="card-header d-flex justify-content-between flex-wrap">
              <div class="header-title">
                <h4 class="card-title">Assessment Status</h4>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex flex-wrap align-items-center justify-content-center">
                <apexchart :height="230" type="radialBar" class="col-md-8 col-lg-8" id="myChart1" :options="assessmentStatusChart.options" :series="assessmentStatusChart.series" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 col-xl-6">
          <div class="card" data-aos="fade-up" data-aos-delay="700">
            <div class="card-header d-flex justify-content-between flex-wrap">
              <div class="header-title">
                <h4 class="card-title">Patient Risk Levels</h4>
              </div>
            </div>
            <div class="card-body">
              <apexchart :height="230" type="bar" class="dactivity1" id="dactivity1" :options="patientRiskChart.options" :series="patientRiskChart.series" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 col-lg-4">
      <div class="card aos-init aos-animate" data-aos="fade-up" data-aos-delay="800">
        <div class="flex-wrap card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="mb-2 card-title">Recent Activity</h4>
          </div>
        </div>
        <div class="card-body">
          <div v-for="(item, index) in recentActivity" :key="index" class="mb-2 d-flex profile-media align-items-top">
            <div class="mt-1 profile-dots-pills" :class="`border-${item.status}`"></div>
            <div class="ms-4">
              <h6 class="mb-1">{{ item.text }}</h6>
              <span class="mb-0 text-secondary">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 col-lg-12">
      <div class="overflow-hidden card aos-init aos-animate" data-aos="fade-up" data-aos-delay="900">
        <div class="flex-wrap card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="mb-2 card-title">Patient Assessments</h4>
            <p class="mb-0 text-secondary">Overview of assigned and completed DSM-5 forms</p>
          </div>
        </div>
        <div class="p-0 card-body">
          <div class="mt-4 table-responsive">
            <b-table-simple hover responsive class="table mb-0" role="grid">
              <thead>
                <tr>
                  <th scope="col">PATIENT</th>
                  <th scope="col">ASSIGNED FORMS</th>
                  <th scope="col">LAST ACTIVITY</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="patient in patientAssessments" :key="patient.id">
                  <td>
                    <div class="d-flex align-items-center">
                      <b-avatar :variant="patient.avatarColor" :text="patient.avatarText" class="me-3"></b-avatar>
                      <div>
                        <h6 class="mb-0">{{ patient.name }}</h6>
                        <span class="text-secondary">{{ patient.id }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex gap-2">
                      <a href="#" v-for="form in patient.forms" :key="form" class="text-primary">{{ form }}</a>
                    </div>
                  </td>
                  <td>{{ patient.lastActivity }}</td>
                  <td>
                    <b-badge :variant="patient.statusColor" pill>{{ patient.statusText }}</b-badge>
                  </td>
                </tr>
              </tbody>
            </b-table-simple>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Apexchart from 'vue3-apexcharts'
import AOS from 'aos'

export default {
  components: {
    Apexchart
  },
  setup() {
    // --- NEW DATA ---
    // Data for the 4 stat cards
    const statCards = ref([
      { title: 'Pending Assessments', value: 72 },
      { title: 'Completed Today', value: 14 },
      { title: 'Requires Review', value: 5 },
      { title: 'New Patients This Week', value: 8 }
    ])

    // Data for the "Recent Activity" list
    const recentActivity = ref([
      { text: 'New PHQ-9 result for John S.', time: '10:15 AM', status: 'primary' },
      { text: 'GAD-7 assigned to Maria G.', time: '9:45 AM', status: 'info' },
      { text: 'Follow-up required for Ken L.', time: 'Yesterday', status: 'warning' },
      { text: 'New ASRS result for Priya V.', time: 'Yesterday', status: 'primary' },
      { text: 'New Patient: Robert Chin', time: '2 days ago', status: 'success' }
    ])

    // Data for the new Patient Assessments table
    const patientAssessments = ref([
      {
        id: 'P-00432',
        name: 'Johnathan Smith',
        avatarText: 'JS',
        avatarColor: 'primary-subtle',
        forms: ['PHQ-9', 'GAD-7'],
        lastActivity: 'Oct 11, 2025',
        statusColor: 'success-subtle',
        statusText: 'Completed'
      },
      {
        id: 'P-00433',
        name: 'Maria Garcia',
        avatarText: 'MG',
        avatarColor: 'primary-subtle',
        forms: ['ASRS', 'PCL-5'],
        lastActivity: 'Oct 10, 2025',
        statusColor: 'danger-subtle',
        statusText: 'Requires Review'
      },
      {
        id: 'P-00434',
        name: 'Ken Lee',
        avatarText: 'KL',
        avatarColor: 'primary-subtle',
        forms: ['PHQ-9'],
        lastActivity: 'Oct 9, 2025',
        statusColor: 'primary-subtle',
        statusText: 'Pending'
      },
      {
        id: 'P-00435',
        name: 'Priya Sharma',
        avatarText: 'PS',
        avatarColor: 'primary-subtle',
        forms: ['GAD-7'],
        lastActivity: 'Oct 9, 2025',
        statusColor: 'success-subtle',
        statusText: 'Completed'
      }
    ])

    // --- REPURPOSED CHARTS ---

    // Weekly Activity Chart
    const weeklyActivityChart = ref({
      series: [
        {
          name: 'Assessments',
          data: [12, 18, 15, 22, 20, 25, 23]
        }
      ],
      options: {
        chart: {
          fontFamily: '"Inter", sans-serif',
          height: 245,
          type: 'area',
          toolbar: { show: false },
          sparkline: { enabled: false }
        },
        colors: ['#3a57e8'],
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 3 },
        yaxis: {
          show: true,
          labels: {
            style: { colors: '#8A92A6' },
            offsetX: -5
          }
        },
        legend: { show: false },
        xaxis: {
          labels: {
            style: { colors: '#8A92A6' }
          },
          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        grid: { show: false },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 50, 80],
            colors: ['#3a57e8']
          }
        },
        tooltip: { enabled: true }
      }
    })

    // MODIFIED Assessment Status Chart (for multi-ring)
    const assessmentStatusChart = ref({
      series: [70, 45, 20], // 70% Completed, 45% In Progress, 20% Not Started
      options: {
        chart: {
          height: 260,
          type: 'radialBar'
        },
        colors: ['#3a57e8', '#f47d23', '#d9534f'], // Blue (Completed), Orange (In Progress), Red (Not Started)
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 10,
              size: '35%'
            },
            track: {
              margin: 5
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                show: false
              },
              total: {
                // This adds the central label
                show: true,
                label: 'Total',
                color: '#8A92A6',
                fontSize: '1.2rem',
                formatter: function () { // <--- Fixed the ESLint error here
                  return 100 // Hardcoded to match screenshot
                }
              }
            }
          }
        },
        labels: ['Completed', 'In Progress', 'Not Started'] // These will appear on hover and in the legend
      }
    })

    // Patient Risk Levels Chart
    const patientRiskChart = ref({
      series: [
        {
          name: 'High Risk',
          data: [3, 5, 2, 4] // Guessed data from screenshot
        },
        {
          name: 'Medium Risk',
          data: [11, 17, 15, 15]
        },
        {
          name: 'Low Risk',
          data: [44, 23, 41, 67]
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 230,
          stacked: true,
          toolbar: { show: false }
        },
        colors: ['#d9534f', '#f47d23', '#3a57e8'], // Red, Orange, Blue
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%',
            borderRadius: 5
          }
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left'
        },
        dataLabels: { enabled: true, formatter: (val) => val, style: { colors: ['#fff'] } },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
          categories: ['PHQ-9', 'GAD-7', 'ASRS', 'PCL-5'],
          labels: {
            style: { colors: '#8A92A6' }
          }
        },
        yaxis: {
          labels: {
            style: { colors: '#8A92A6' }
          }
        },
        fill: { opacity: 1 },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + ' patients'
            }
          }
        }
      }
    })

    // Initialize AOS
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

    // Updated return statement
    return {
      statCards,
      recentActivity,
      patientAssessments, // Added new data
      weeklyActivityChart,
      assessmentStatusChart, // Modified
      patientRiskChart
    }
  }
}
</script>