<template>
  <div class="iq-navbar-header" style="height: 215px">
    <b-container fluid class="iq-container">
      <b-row>
        <b-col md="12">
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1>Dashboard</h1>
              <p>Your portal for administering forms and understanding your patients</p>
            </div>
            <div>
              <a href="#" class="btn btn-link btn-soft-light" @click.prevent="showAnnouncements">
                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.8251 15.2171H12.1748C14.0987 15.2171 15.731 13.985 16.3054 12.2764C16.3887 12.0276 16.1979 11.7713 15.9334 11.7713H14.8562C14.5133 11.7713 14.2362 11.4977 14.2362 11.16C14.2362 10.8213 14.5133 10.5467 14.8562 10.5467H15.9005C16.2463 10.5467 16.5263 10.2703 16.5263 9.92875C16.5263 9.58722 16.2463 9.31075 15.9005 9.31075H14.8562C14.5133 9.31075 14.2362 9.03619 14.2362 8.69849C14.2362 8.35984 14.5133 8.08528 14.8562 8.08528H15.9005C16.2463 8.08528 16.5263 7.8088 16.5263 7.46728C16.5263 7.12575 16.2463 6.84928 15.9005 6.84928H14.8562C14.5133 6.84928 14.2362 6.57472 14.2362 6.23606C14.2362 5.89837 14.5133 5.62381 14.8562 5.62381H15.9886C16.2483 5.62381 16.4343 5.3789 16.3645 5.13113C15.8501 3.32401 14.1694 2 12.1748 2H11.8251C9.42172 2 7.47363 3.92287 7.47363 6.29729V10.9198C7.47363 13.2933 9.42172 15.2171 11.8251 15.2171Z" fill="currentColor"></path>
                  <path opacity="0.4" d="M19.5313 9.82568C18.9966 9.82568 18.5626 10.2533 18.5626 10.7823C18.5626 14.3554 15.6186 17.2627 12.0005 17.2627C8.38136 17.2627 5.43743 14.3554 5.43743 10.7823C5.43743 10.2533 5.00345 9.82568 4.46872 9.82568C3.93398 9.82568 3.5 10.2533 3.5 10.7823C3.5 15.0873 6.79945 18.6413 11.0318 19.1186V21.0434C11.0318 21.5715 11.4648 22.0001 12.0005 22.0001C12.5352 22.0001 12.9692 21.5715 12.9692 21.0434V19.1186C17.2006 18.6413 20.5 15.0873 20.5 10.7823C20.5 10.2533 20.066 9.82568 19.5313 9.82568Z" fill="currentColor"></path>
                </svg>
                Announcements
              </a>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="iq-header-img">
      <img src="@/assets/images/dashboard/top-header.png" alt="header" class="theme-color-default-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header1.png" alt="header" class="theme-color-purple-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header2.png" alt="header" class="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header3.png" alt="header" class="theme-color-green-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header4.png" alt="header" class="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header5.png" alt="header" class="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX" />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// Inject SweetAlert
const swal = inject('$swal')

const showAnnouncements = () => {
  swal.fire({
    title: '📢 System Announcements',
    html: `
      <div style="text-align: left;">
        <div class="mb-3">
          <span class="badge bg-primary">NEW</span>
          <strong class="ms-2">New Forms Added</strong>
          <p class="text-muted small mb-0 mt-1">We have added the Level 2 Depression (PHQ-9) and Anxiety (GAD-7) forms to the library.</p>
        </div>
        <hr class="my-2">
        <div class="mb-3">
          <span class="badge bg-warning text-dark">MAINTENANCE</span>
          <strong class="ms-2">Scheduled Downtime</strong>
          <p class="text-muted small mb-0 mt-1">The system will be undergoing maintenance this Sunday from 2 AM to 4 AM.</p>
        </div>
         <hr class="my-2">
        <div>
          <span class="badge bg-success">TIP</span>
          <strong class="ms-2">Secure Messaging</strong>
          <p class="text-muted small mb-0 mt-1">Did you know you can now attach PDF reports directly to patient messages?</p>
        </div>
      </div>
    `,
    showCloseButton: true,
    showConfirmButton: false,
    width: '600px',
    padding: '2em',
    background: '#fff'
  })
}
</script>