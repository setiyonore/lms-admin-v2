<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/dashboard"
          :name="$t('sidebar.dashboard')"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          to="/books"
          :name="$t('sidebar.books')"
          icon="tim-icons icon-book-bookmark"
        />
        <sidebar-link
          to="/members"
          :name="$t('sidebar.members')"
          icon="tim-icons icon-badge"
        />
        <sidebar-link
          to="/users"
          :name="$t('sidebar.users')"
          icon="tim-icons icon-single-02"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
/* Style untuk link aktif di sidebar */
.router-link-active {
  background-color: #2c7d59; /* Warna latar belakang untuk link aktif */
  padding-left: 12px; /* Padding kiri untuk estetika */
}
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
