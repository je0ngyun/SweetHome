<template>
  <div class="is-flex is-flex-direction-column has-text-centered">
    <div class="mt-1 mb-1"><img src="../assets/logo.svg" alt="" /></div>
    <div>
      <div class="card p-1 mt-1 mb-1">
        <div class="font-s">나의 IP 주소</div>
        <div>{{ ip }}</div>
      </div>
    </div>
    <Clock class="card mt-1 mb-1"></Clock>
    <div class="p-6 card mt-1 mb-1">날씨정보</div>
    <div class="is-flex is-flex-direction-column mt-a">
      <b-button size="is-small" class="mt-1 mb-1" type="is-warning"
        ><font-awesome-icon icon="info-circle" class="mr-4" />
        <span>시스템정보 </span>
      </b-button>
      <b-button size="is-small" class="mt-1 mb-1" type="is-warning"
        ><font-awesome-icon icon="trash" class="mr-4" /><span
          >기기초기화</span
        ></b-button
      >
      <b-button size="is-small" class="mt-1 mb-1" type="is-warning"
        ><font-awesome-icon icon="power-off" class="mr-5" /><span
          >종료하기</span
        ></b-button
      >
    </div>
  </div>
</template>

<script>
import Clock from './Clock';

const publicIp = require('public-ip');
export default {
  components: {
    Clock,
  },
  data: function() {
    return {
      ip: null,
    };
  },
  created() {
    publicIp.v4().then((ip) => {
      this.ip = ip;
    });
  },
};
</script>

<style scoped></style>
