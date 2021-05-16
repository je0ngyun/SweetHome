<template>
  <div
    @click="click"
    v-longclick="() => modalOpen()"
    class="device card m-1 is-flex is-flex-direction-column"
    :style="state ? is_on : is_off"
  >
    <div class="has-text-centered">
      <font-awesome-icon
        icon="power-off"
        size="2x"
        :style="state ? is_on_icon : is_off_icon"
      />
    </div>
    <div class="mt-a font-s">{{ this.device.device_name }}</div>
  </div>
</template>

<script>
import LogModal from './LogModal';
const logModal = LogModal;

export default {
  name: 'Device',
  props: {
    device: Object,
    index: Number,
  },
  data: function() {
    return {
      state: false,
      modalActive: false,
      delay: 200,
      clicks: 0,
      timer: null,
      is_on: {
        background: '#f9de6e',
        transition: 'all ease 1s 0s',
      },
      is_off: {
        background: '#ffffff',
        transition: 'all ease 1s 0s',
      },
      is_on_icon: {
        color: '#4aba68',
        transition: 'all ease 1s 0s',
      },
      is_off_icon: {
        color: '#ececec',
        transition: 'all ease 1s 0s',
      },
    };
  },
  methods: {
    dblclick() {
      this.delDialog('정말로 기기를 삭제하시겠습니까?');
    },
    close() {
      this.modalActive = false;
    },
    modalOpen() {
      this.$buefy.modal.open({
        parent: this,
        component: logModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        fullScreen: true,
        props: { device: this.device },
      });
    },
    delDialog(msg) {
      this.$buefy.dialog.confirm({
        message: msg,
        onConfirm: () => {
          this.$axios
            .delete(`${this.$defaultURL}/device/regist`, {
              params: {
                host: this.device.device_host,
                serial: this.$env.serial,
              },
            })
            .then(() => {
              this.$parent.refresh();
              this.$buefy.toast.open('기기삭제완료');
            });
        },
      });
    },
    action() {
      this.$axios
        .get(`${this.$defaultURL}/device/action`, {
          params: { host: this.device.device_host, switch: 0 },
          timeout: 3000,
        })
        .then((res) => {
          let success = res.data.success;
          if (success) {
            this.state = res.data.device.states[0];
          } else {
            this.delDialog('연결이 불안정한 기기입니다 삭제하시겠습니까?');
          }
        })
        .catch(() => {
          this.delDialog('연결이 불안정한 기기입니다 삭제하시겠습니까?');
        });
    },
    click() {
      this.clicks++;
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.action();
          this.clicks = 0;
        }, this.delay);
      } else {
        clearTimeout(this.timer);
        this.dblclick();
        this.clicks = 0;
      }
    },
  },
};
</script>

<style scoped>
.device {
  height: 6rem;
}
</style>
