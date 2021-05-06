<template>
  <div class="pt-5">
    <div class="">
      <b-button @click="refresh" type="is-primary">기기불러오기</b-button>
    </div>
    <div class="columns is-multiline mt-3">
      <Device
        class="column is-2 ml-4 mb-4"
        v-for="(item, index) in devices"
        v-bind:device="item"
        v-bind:index="index"
        v-bind:key="item.id"
      ></Device>
    </div>
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

<style scoped>
.test {
  margin: 10px;
  width: 150px;
  height: 150px;
  background: blueviolet;
}
.h-100 {
  height: 1%;
}
</style>
