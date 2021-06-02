<template>
  <div
    @click="click"
    v-longclick="() => logModalOpen()"
    class="device card is-flex is-flex-direction-column m-1"
    :class="[
      'tag',
      { 'is-2': device.way == 1 },
      { 'is-3': device.way == 2 },
      { 'is-5': device.way == 4 },
    ]"
    :style="cardTheme"
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
        :btnTheme="btnTheme"
      ></ActionBtn>
    </div>
    <div class="mt-a font-xs">{{ this.device.device_name }}</div>
  </div>
</template>

<script>
import ActionBtn from './ActionBtn';
import LogModal from './LogModal';
import ThemeModal from './ThemeModal';
const logModal = LogModal;
const themeModal = ThemeModal;

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
      delay: 400,
      clicks: 0,
      timer: null,
      counter: 0,
    };
  },
  created() {
    this.wayToArray();
  },
  computed: {
    cardTheme() {
      return this.$store.getters.getCardTheme(this.index);
    },
    btnTheme() {
      return this.$store.getters.getBtnTheme(this.index);
    },
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
    logModalOpen() {
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
    themeModalOpen() {
      this.$buefy.modal.open({
        parent: this,
        component: themeModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
        fullScreen: false,
        props: { index: this.index },
      });
    },
    click() {
      this.clicks++;
      if (this.clicks === 1) {
        //클릭
        this.timer = setTimeout(() => {
          this.clicks = 0;
        }, this.delay);
      } else {
        //더블클릭
        clearTimeout(this.timer);
        //this.delDialog('정말로 기기를 삭제하시겠습니까?');
        this.themeModalOpen();
        this.clicks = 0;
      }
    },
    //n 구의 스위치 -> [0,1,2,n] 배열변환
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
