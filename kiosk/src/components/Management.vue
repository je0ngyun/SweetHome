<template>
  <div>
    this is managecomponent<br />
    <b-button @click="refresh" type="is-primary">Refresh</b-button>
    <div>{{ this.$store.state.devices }}</div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('initDevices');
  },
  methods: {
    refresh() {
      this.$store.dispatch('initDevices');
    },
  },
};
</script>

<style></style>
