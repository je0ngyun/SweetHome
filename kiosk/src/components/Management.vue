<template>
  <div>
    this is managecomponent<br />
    <b-button @click="refresh" type="is-primary">기기불러오기</b-button>
    <Device
      v-for="(item, index) in devices"
      v-bind:device="item"
      v-bind:index="index"
      v-bind:key="item.id"
    ></Device>
  </div>
</template>

<script>
import Device from '../components/Device';

export default {
  components: {
    Device,
  },
  data: function() {
    return {
      devices: undefined,
    };
  },
  created() {
    this.$store.dispatch('initDevices');
    this.devices = this.$store.state.devices;
  },
  methods: {
    refresh() {
      this.$store.dispatch('initDevices');
      this.devices = this.$store.state.devices;
    },
  },
};
</script>

<style></style>
