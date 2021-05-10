<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">기기로그보기</p>
    </header>
    <section class="modal-card-body">
      <b-table :data="logs">
        <b-table-column field="device_name" label="기기이름" v-slot="props">
          {{ props.row.device_name }}
        </b-table-column>
        <b-table-column field="device_host" label="기기호스트" v-slot="props">
          {{ props.row.device_host }}
        </b-table-column>
        <b-table-column field="state" label="기기상태" v-slot="props">
          <span
            :class="[
              'tag',
              { 'is-danger': props.row.state == '꺼짐' },
              { 'is-success': props.row.state == '켜짐' },
            ]"
          >
            {{ props.row.state }}
          </span>
        </b-table-column>
        <b-table-column field="time" label="시간" v-slot="props">
          {{ props.row.time }}
        </b-table-column>
      </b-table>
    </section>
    <footer class="modal-card-foot">
      <b-button label="닫기" @click="$parent.close()" />
    </footer>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      logs: undefined,
      columns: [
        {
          field: 'device_name',
          label: '기기이름',
        },
        {
          field: 'device_host',
          label: '기기주소',
        },
        {
          field: 'state',
          label: '기기상태',
        },
        {
          field: 'time',
          label: '시간',
        },
      ],
    };
  },
  props: {
    device: Object,
  },
  created() {
    this.$axios
      .get(`${this.$defaultURL}/device/log`, {
        params: { host: this.device.device_host },
      })
      .then((res) => {
        this.logs = res.data.logs;
        this.preProcessing();
      })
      .catch(() => {});
  },
  methods: {
    preProcessing() {
      for (let i = 0; i < this.logs.length; i++) {
        this.logs[i].time = `${this.logs[i].time.substring(0, 10)} ${this.logs[
          i
        ].time.substring(11, 19)}`;
        if (this.logs[i].state == 'true') {
          this.logs[i].state = '켜짐';
        } else {
          this.logs[i].state = '꺼짐';
        }
      }
    },
  },
};
</script>

<style></style>
