<template>
  <span class="has-text-centered m-2">
    <font-awesome-icon
      @click="action"
      icon="power-off"
      :size="fontSize"
      :style="state ? this.is_on_icon : this.is_off_icon"
    ></font-awesome-icon>
  </span>
</template>

<script>
export default {
  data: function() {
    return {
      state: false,
      is_on_icon: {
        color: '#4aba68',
        transition: 'all ease 1s 0s',
      },
      is_off_icon: {
        color: '#ececec',
        transition: 'all ease 1s 0s',
      },
      fontSize: undefined,
    };
  },
  props: {
    host: String,
    switch: Number,
    index: Number,
    way: String,
  },
  created() {
    this.getState();
    this.fontSizing();
  },
  methods: {
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
          //res.data.state 로 문자열 false,false 옴
          const arr = res.data.state.split(','); //문자열->배열 ['false',false']
          this.state = JSON.parse(arr[this.switch]); //배열[0] 'false' 를 boolean false 변환
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
    fontSizing() {
      if (Number(this.way) > 3) {
        this.fontSize = '2x';
      } else {
        this.fontSize = '3x';
      }
    },
  },
};
</script>

<style scoped></style>
