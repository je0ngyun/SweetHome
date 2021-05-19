<template>
  <div
    @click="click"
    v-longclick="() => modalOpen()"
    class="device card m-1 is-flex is-flex-direction-column"
    :class="[
      'tag',
      { 'is-3': device.way == 1 },
      { 'is-3': device.way == 2 },
      { 'is-4': device.way == 4 },
    ]"
  >
    <div>
      <ActionBtn
        class="action-btn"
        v-for="(item, index) in switchs"
        :switch="item"
        :index="index"
        :key="item.id"
        :host="device.device_host"
        :way="device.way"
      ></ActionBtn>
    </div>
    <div class="mt-a font-xs">{{ this.device.device_name }}</div>
  </div>
</template>

<script>
import LogModal from './LogModal';
import ActionBtn from './ActionBtn';
const logModal = LogModal;

export default {
  components: {
    ActionBtn,
  },
  name: 'Device',
  props: {
    device: Object,
    index: Number,
  },
  data: function() {
    return {
      switchs: undefined,
      state: false,
      modalActive: false,
      delay: 400,
      clicks: 0,
      timer: null,
    };
  },
  created() {
    this.wayToArray();
  },
  methods: {
    delDialog(msg) {
      this.$buefy.dialog.confirm({
        message: msg,
        onConfirm: () => {
          this.$axios
            .delete(`${this.$defaultURL}/device/regist`, {
              params: {
                host: this.device.device_host,
              },
            })
            .then(() => {
              this.$parent.refresh();
              this.$buefy.toast.open('기기삭제완료');
            });
        },
      });
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
    click() {
      this.clicks++;
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.clicks = 0;
        }, this.delay);
      } else {
        clearTimeout(this.timer);
        this.delDialog('정말로 기기를 삭제하시겠습니까?');
        this.clicks = 0;
      }
    },
    wayToArray() {
      let array = [];
      for (let i = 0; i < Number(this.device.way); i++) {
        array[i] = i;
      }
      this.switchs = array;
    },
  },
};
</script>

<style scoped>
.device {
  height: 6rem;
}
</style>
