<template>
  <div class="container py-4">
    <b-card class="mb-4" header="Platform Documentation & Help" header-bg-variant="info" header-text-variant="white">
      <p>
        Welcome to the Performance Review Platform! This guide will help you navigate the dashboard, find forms, send reviews, and view analytics as an average user.
      </p>
    </b-card>
    <b-accordion id="doc-accordion" flush>
      <b-accordion-item title="1. Getting Started">
        <ul>
          <li>Log in using your credentials provided by your organization.</li>
          <li>Access the dashboard for a quick overview of your activity and assigned reviews.</li>
        </ul>
      </b-accordion-item>
      <b-accordion-item title="2. Navigating the Dashboard">
        <ul>
          <li>Use the sidebar to access main sections: Dashboard, Review Hub, Employees, Documentation, and more.</li>
          <li>View your recent activity, pending reviews, and analytics widgets.</li>
        </ul>
      </b-accordion-item>
      <b-accordion-item title="3. Finding & Sending Review Forms">
        <ul>
          <li>Go to the Review Hub to browse available performance review forms.</li>
          <li>Click "Send to Employee" to assign a form to a team member.</li>
        </ul>
      </b-accordion-item>
      <b-accordion-item title="4. Completing Reviews">
        <ul>
          <li>Open assigned forms from your dashboard or notifications.</li>
          <li>Fill out the required fields and submit your responses.</li>
        </ul>
      </b-accordion-item>
      <b-accordion-item title="5. Viewing Results & Analytics">
        <ul>
          <li>Access analytics from the dashboard to view your review history and performance trends.</li>
          <li>Managers can view team-wide analytics and export reports.</li>
        </ul>
      </b-accordion-item>
      <b-accordion-item title="6. Managing Employees">
        <ul>
          <li>Navigate to the Employees section to view, add, or edit employee profiles.</li>
          <li>Assign reviews and track progress for each employee.</li>
        </ul>
      </b-accordion-item>
      <b-accordion-item title="7. Tips & Best Practices">
        <ul>
          <li>Check your dashboard regularly for new assignments.</li>
          <li>Use the Documentation tab for help and troubleshooting.</li>
        </ul>
      </b-accordion-item>
      <b-accordion-item title="8. FAQ & Troubleshooting">
        <ul>
          <li><strong>Q:</strong> I can't find my assigned review.<br /><strong>A:</strong> Check the dashboard or notifications panel.</li>
          <li><strong>Q:</strong> How do I reset my password?<br /><strong>A:</strong> Use the "Forgot Password" link on the login page.</li>
          <li><strong>Q:</strong> Who can see my review responses?<br /><strong>A:</strong> Only authorized managers and HR staff.</li>
          <li><strong>Q:</strong> How do I export analytics?<br /><strong>A:</strong> Go to the analytics section and click "Export".</li>
          <li><strong>Q:</strong> Where do I get more help?<br /><strong>A:</strong> Use the Documentation tab or contact support.</li>
        </ul>
      </b-accordion-item>
    </b-accordion>
  </div>
</template>

<script>
import { BCard, BAccordion, BAccordionItem } from 'bootstrap-vue-3';
export default {
  components: {
    BCard,
    BAccordion,
    BAccordionItem
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
