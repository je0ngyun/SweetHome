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
const Modal = LogModal;
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
      formProps: {
        email: 'evan@you.com',
        password: 'testing',
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
        component: Modal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        fullScreen: true,
      });
    },
    toggle() {
      this.state = !this.state;
    },
    action() {
      this.$axios
        .get(
          `http://localhost:80/device/action?host=${this.device.device_host}&switch=0`,
        )
        .then((res) => {
          let success = res.data.success;
          if (success) {
            this.state = res.data.device[0];
          } else {
            this.$buefy.dialog.confirm({
              message: '연결이 끊긴 기기입니다 삭제하시겠습니까?',
              onConfirm: () => {
                this.$axios
                  .delete(
                    `http://localhost:80/device/regist?host=${this.device.device_host}`,
                  )
                  .then(() => {
                    this.$parent.refresh();
                    this.$buefy.toast.open('기기삭제완료');
                  });
              },
            });
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
