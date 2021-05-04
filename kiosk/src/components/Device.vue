<template>
  <div>
    <div>this is device component</div>
    <div>{{ host }}</div>
    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'Device',
  props: {
    host: String,
    name: String,
  },
};
</script>

<style></style>
