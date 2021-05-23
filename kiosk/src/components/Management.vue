<template>
  <div class="pt-3 pl-6">
    <div class="">
      <b-button @click="onRefresh" rounded size="is-small" class="sub-bg ml-1">
        <font-awesome-icon icon="redo-alt" class="font-light mr-2" />
        <span class="font-light">기기새로고침</span>
      </b-button>
      <b-button
        @click="settingModalOpen"
        size="is-small"
        rounded
        class="sub-bg ml-1"
      >
        <font-awesome-icon icon="cog" class="font-light mr-2" />
        <span class="font-light">새로고침설정</span>
      </b-button>
    </div>
    <div class="columns is-multiline has-text-centered mt-3">
      <Device
        class="column ml-3 mb-4"
        v-for="(item, index) in devices"
        :device="item"
        :index="index"
        :key="item.id"
      ></Device>
    </div>
  </div>
</template>

<script>
import { EventBus } from '../bus/event-bus';
import Device from '../components/Device';
import Interval from '../components/Interval';
const interval = Interval;
export default {
  components: {
    Device,
  },
  data: function() {
    return {
      devices: undefined,
      interval: undefined,
    };
  },
  created() {
    this.refresh();
    this.intervalRefresh(5 * 60000);
    EventBus.$on('re-setting-interval', (term) => {
      clearInterval(this.interval);
      this.intervalRefresh(term);
    });
  },
  methods: {
    intervalRefresh(term) {
      this.interval = setInterval(this.onRefresh, term);
    },
    settingModalOpen() {
      this.$buefy.modal.open({
        parent: this,
        component: interval,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        fullScreen: false,
      });
    },
    refresh() {
      this.$axios
        .get(`${this.$defaultURL}/device/regist`, {})
        .then((res) => {
          this.devices = res.data.devices;
          this.$store.commit('initTheme', {
            numOfDevices: this.devices.length,
          });
        })
        .catch((res) => {
          console.log(res);
        });
    },
    onRefresh() {
      this.devices = null;
      this.$axios
        .get(`${this.$defaultURL}/device/regist`, {})
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
