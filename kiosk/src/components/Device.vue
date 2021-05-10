<template>
  <div
    @click="action"
    v-longclick="() => modalOpen()"
    class="device columns is-multiline card is-inline-block m-1"
    :style="state ? is_on : is_off"
  >
    <div class="is-12">{{ device.device_name }}</div>
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
    toggle() {
      this.state = !this.state;
    },
    delDialog() {
      this.$buefy.dialog.confirm({
        message: '연결이 불안정한 기기입니다 삭제하시겠습니까?',
        onConfirm: () => {
          this.$axios
            .delete(`${this.$defaultURL}/device/regist`, {
              params: { host: this.device.device_host },
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
          timeout: 4000,
        })
        .then((res) => {
          let success = res.data.success;
          if (success) {
            this.state = res.data.device.states[0];
          } else {
            this.delDialog();
          }
        })
        .catch(() => {
          this.delDialog();
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
