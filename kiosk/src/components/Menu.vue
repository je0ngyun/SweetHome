<template>
  <div class="is-flex is-flex-direction-column has-text-centered">
    <div class="mt-1 mb-1"><img src="../assets/logo.svg" alt="" /></div>
    <div>
      <div class="card p-1 mt-1 mb-1">
        <div
          v-if="this.isLoading"
          class="is-flex is-flex-direction-column has-text-centered 
      is-justify-content-center is-align-items-center"
        >
          <div class="loading mb-3"></div>
          <div class="font-s">loadding..</div>
        </div>
        <div v-if="!this.isLoading">
          <div class="font-s mb-1">나의 IP 주소</div>
          <div class="font-s">{{ ip }}</div>
        </div>
      </div>
    </div>
    <Clock class="card mt-1 mb-1"></Clock>
    <Weather class="card p-3 mt-1 mb-1"></Weather>
    <div class="is-flex is-flex-direction-column mt-a">
      <b-button
        @click="alertInfo()"
        size="is-small"
        class="mt-1 mb-1"
        type="is-warning"
        rounded
        ><font-awesome-icon icon="info-circle" class="mr-4" />
        <span>시스템정보 </span>
      </b-button>
      <b-button
        @click="resetDevices()"
        size="is-small"
        class="mt-1 mb-1"
        type="is-warning"
        rounded
        ><font-awesome-icon icon="trash" class="mr-4" /><span
          >기기초기화</span
        ></b-button
      >
      <b-button
        @click="resetLogs()"
        size="is-small"
        class="mt-1 mb-1 font-xs"
        type="is-warning"
        rounded
        ><font-awesome-icon icon="trash" class="mr-4" /><span
          >로그초기화</span
        ></b-button
      >
      <b-button
        @click="exit()"
        size="is-small"
        class="mt-1 mb-1 font-xs"
        type="is-warning"
        rounded
        ><font-awesome-icon icon="power-off" class="mr-4" /><span
          >시스템종료</span
        ></b-button
      >
    </div>
  </div>
</template>

<script>
import Clock from './Clock';
import Weather from './Weather';

const publicIp = require('public-ip');
export default {
  components: {
    Clock,
    Weather,
  },
  data: function() {
    return {
      ip: null,
      isLoading: true,
    };
  },
  created() {
    publicIp.v4().then((ip) => {
      this.ip = ip;
      this.isLoading = false;
    });
  },
  methods: {
    alertInfo() {
      let info = `Service : TenPlus <br/>
      Version : 0.1.0 <br/>
      Serial : 9830`;
      this.$buefy.dialog.alert({
        title: '시스템정보',
        message: info,
        confirmText: '확인',
      });
    },
    resetDevices() {
      this.$buefy.dialog.confirm({
        message:
          '정말로 모든 기기를 삭제하시겠습니까? <br/> 삭제후엔 재등록이 필요합니다 ',
        onConfirm: () => {
          this.$axios
            .delete(`${this.$defaultURL}/device/regist/all`, {})
            .then(() => {
              this.$buefy.toast.open('기기삭제완료');
            });
        },
      });
    },
    resetLogs() {
      this.$buefy.dialog.confirm({
        message:
          '정말로 모든 로그를 삭제하시겠습니까? <br/> 삭제된 로그는 복구가 불가능합니다',
        onConfirm: () => {
          this.$axios
            .delete(`${this.$defaultURL}/device/log/all`, {})
            .then(() => {
              this.$buefy.toast.open('로그삭제완료');
            });
        },
      });
    },
    exit() {
      this.$buefy.dialog.confirm({
        message: '정말로 시스템을 종료하시겠습니까?',
        onConfirm: () => {
          if (navigator.appVersion.indexOf('MSIE 6.0') >= 0) {
            parent.window.close();
          } else {
            parent.window.open('about:blank', '_self').close();
          }
        },
      });
    },
  },
};
</script>

<style scoped></style>
