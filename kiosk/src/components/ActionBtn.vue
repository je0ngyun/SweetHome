<template>
  <span class="has-text-centered m-2">
    <font-awesome-icon
      @click="action"
      icon="power-off"
      :size="fontSize"
      :style="state ? btnTheme.is_on : btnTheme.is_off"
    ></font-awesome-icon>
  </span>
</template>

<script>
import { EventBus } from '../bus/event-bus';
export default {
  data: function() {
    return {
      state: false,
      fontSize: undefined,
      interval: undefined,
    };
  },
  props: {
    host: String,
    switch: Number,
    index: Number,
    way: String,
    btnTheme: Object,
  },
  created() {
    this.getState();
    this.fontSize = this.fontSizing();
    EventBus.$on('realTime:false', () => {
      clearInterval(this.interval);
    });
    EventBus.$on('realTime:true', () => {
      this.interval = this.intervalGetState();
    });
  },
  methods: {
    intervalGetState() {
      return setInterval(this.getState, 1000);
    },
    action() {
      this.$axios
        .get(`${this.$defaultURL}/device/action`, {
          params: { host: this.host, switch: this.switch },
          timeout: 5000,
        })
        .then((res) => {
          let success = res.data.success;
          if (success) {
            this.state = res.data.device.states[this.switch];
          } else {
            this.delDialog('연결이 불안정한 기기입니다 삭제하시겠습니까?');
          }
        })
        .catch(() => {
          this.delDialog('연결이 불안정한 기기입니다 삭제하시겠습니까?');
        });
    },
    getState() {
      this.$axios
        .get(`${this.$defaultURL}/device/state`, {
          params: { host: this.host },
        })
        .then((res) => {
          this.state = res.data.state[this.switch];
        })
        .catch(() => {});
    },
    delDialog(msg) {
      this.$buefy.dialog.confirm({
        message: msg,
        onConfirm: () => {
          this.$axios
            .delete(`${this.$defaultURL}/device/regist`, {
              params: {
                host: this.host,
              },
            })
            .then(() => {
              this.$parent.refresh();
              this.$buefy.toast.open('기기삭제완료');
            });
        },
      });
    },
    fontSizing() {
      //테스팅중
      if (Number(this.way) > 3) {
        return '3x';
      } else {
        return '3x';
      }
    },
  },
};
</script>

<style scoped></style>
