<template>
  <div>
    <div>this is device component</div>
    <div>{{ device.device_host }}</div>
    <div>{{ device.device_name }}</div>
    <div>{{ index }}</div>
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

<style></style>
