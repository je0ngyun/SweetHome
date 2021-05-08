<template>
  <div class="pt-3 pl-6">
    <div class="">
      <b-button @click="refresh" type="is-warning is-shadow ml-5">
        <font-awesome-icon icon="redo-alt" class="mr-2" />
        <span>기기불러오기</span>
      </b-button>
    </div>
    <div class="columns is-multiline mt-3 ml-3 has-text-centered">
      <Device
        class="column is-3 ml-3 mb-4"
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
const env = require('../assets/env/env.json');
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
    this.$axios
      .get(`http://localhost:80/device/regist?serial=${env.serial}`)
      .then((res) => {
        this.devices = res.data.devices;
        this.$buefy.toast.open({
          message: '연결된 기기 불러오기 성공',
          type: 'is-success',
        });
      })
      .catch((res) => {
        console.log(res);
        this.$buefy.toast.open({
          message: '기기 불러오기 실패',
          type: 'is-danger',
        });
      });
  },
  methods: {
    refresh() {
      this.$axios
        .get(`http://localhost:80/device/regist?serial=${env.serial}`)
        .then((res) => {
          this.devices = res.data.devices;
          this.$buefy.toast.open({
            message: '연결된 기기 불러오기 성공',
            type: 'is-success',
          });
        })
        .catch((res) => {
          console.log(res);
          this.$buefy.toast.open({
            message: '기기 불러오기 실패',
            type: 'is-danger',
          });
        });
    },
  },
};
</script>

<style scoped></style>
