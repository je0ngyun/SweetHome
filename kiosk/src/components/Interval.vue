<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">새로고침 설정</p>
    </header>
    <section class="modal-card-body">
      <b-field>
        <b-radio v-model="term" native-value="5" type="is-info">
          5분마다
        </b-radio>
      </b-field>
      <b-field>
        <b-radio v-model="term" native-value="7" type="is-info">
          7분마다
        </b-radio>
      </b-field>
      <b-field>
        <b-radio v-model="term" native-value="15" type="is-info">
          15분마다
        </b-radio>
      </b-field>
      <b-field>
        <b-radio v-model="term" native-value="30" type="is-info">
          30분마다
        </b-radio>
      </b-field>
      <b-field>
        <b-checkbox v-model="realTimeDetect">
          실시간 전원상태 업데이트
        </b-checkbox>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-primary" label="적용" @click="handleTermValue" />
      <b-button type="" label="닫기" @click="$parent.close()" />
    </footer>
  </div>
</template>

<script>
import { EventBus } from '../bus/event-bus';
export default {
  props: {
    currentTerm: Number,
    realTimeflag: Boolean,
  },
  created() {
    this.term = `${this.currentTerm / 60000}`;
    this.realTimeDetect = this.realTimeflag;
  },
  data: function() {
    return {
      term: '5',
      realTimeDetect: undefined,
    };
  },
  methods: {
    handleTermValue() {
      EventBus.$emit(
        're-setting-interval',
        Number(this.term) * 60000,
        this.realTimeDetect,
      );
      if (this.realTimeDetect) {
        EventBus.$emit('realTime:true');
      } else {
        EventBus.$emit('realTime:false');
      }
      this.$parent.close();
    },
  },
};
</script>

<style></style>
