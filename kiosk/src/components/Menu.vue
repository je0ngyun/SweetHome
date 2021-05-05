<template>
  <div>
    this is menu component
    <div>{{ ip }}</div>
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

<style></style>
