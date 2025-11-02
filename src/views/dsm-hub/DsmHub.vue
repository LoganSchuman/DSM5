<template>
  <div class="row">
    <div class="col-sm-12">
      <h4 class="mb-3">DSM-5 Form Hub</h4>
    </div>

    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">PHQ-9 (Patient Health Questionnaire-9)</h5>
          <p class="card-text">A 9-item depression screening and severity tool used to monitor and measure the severity of depression.</p>
          
          <router-link :to="{ name: 'default.phq-9-test' }" class="btn btn-primary">
            Test Form
          </router-link>

        </div>
      </div>
    </div>

    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">GAD-7 (Generalized Anxiety Disorder-7)</h5>
          <p class="card-text">A 7-item self-report questionnaire used for screening and severity measuring of generalized anxiety disorder.</p>
          <button class="btn btn-secondary" disabled>Test Form (Coming Soon)</button>
        </div>
      </div>
    </div>

    </div>
</template>

<script setup>
// This page is mostly layout, so no complex logic is needed here yet.
</script>