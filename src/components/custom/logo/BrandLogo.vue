<template>
  <!--Logo start-->
  <div class="logo-main">
    <img src="@/assets/images/MediFlow_Logo.png" alt="MediFlow Logo" class="mediflow-logo" width="400" height="100" />
  </div>
  <!--Logo End-->
</template>

<script>
export default {
  props: {
    color: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.mediflow-logo {
  object-fit: contain;
}
</style>
