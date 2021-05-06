<template>
  <div class="pl-4 pt-5">
    <div>{{ ip }}</div>
    <br />
  </div>
</template>

<script>
const publicIp = require('public-ip');
export default {
  data: function() {
    return {
      ip: null,
    };
  },
  created() {
    publicIp.v4().then((ip) => {
      this.ip = ip;
    });
  },
};
</script>

<style scoped></style>
