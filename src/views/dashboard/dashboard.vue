<template>
  <div>
    <div>
      <menubar />
    </div>
    <div class="principal">
      <router-view />
    </div>
  </div>
</template>

<script>
import menubar from '@/components/menubar.vue';
export default {
  name: 'dashboard',
  components: {
    menubar,
  },
};
</script>
<style scoped>
.principal {
  margin-top: 60px;
}
</style>
