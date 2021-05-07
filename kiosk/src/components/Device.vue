<template>
  <div
    @click="action"
    class="device columns is-multiline card is-inline-block m-1"
    :style="state ? is_on : is_off"
  >
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
  data: function() {
    return {
      state: false,
      is_on: {
        background: '#f9de6e',
        transition: 'all ease 1s 0s',
      },
      is_off: {
        background: '#ffffff',
        transition: 'all ease 1s 0s',
      },
    };
  },
  methods: {
    toggle() {
      this.state = !this.state;
    },
    action() {
      this.$axios
        .get(
          `http://localhost:80/device/action?name=${this.device.device_name}&switch=0`,
        )
        .then((res) => {
          let success = res.data.success;
          if (success) {
            this.state = res.data.device;
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style scoped>
.device {
  height: 6rem;
}
</style>
