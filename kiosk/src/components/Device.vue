<template>
  <div class="device columns is-multiline card is-inline-block m-1">
    <div class="is-12">{{ device.device_name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Device',
  props: {
    device: Object,
    index: Number,
  },
};
</script>

<style scoped>
.device {
  height: 6rem;
}
</style>
