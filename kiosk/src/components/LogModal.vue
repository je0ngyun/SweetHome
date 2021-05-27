<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">기기로그</p>
    </header>
    <section class="modal-card-body">
      <b-table :data="logs">
        <b-table-column
          field="device_name"
          label="기기이름"
          centered
          v-slot="props"
        >
          {{ props.row.device_name }}
        </b-table-column>
        <b-table-column
          field="device_host"
          label="기기호스트"
          centered
          v-slot="props"
        >
          {{ props.row.device_host }}
        </b-table-column>
        <b-table-column field="state" label="기기상태" centered v-slot="props">
          <span
            v-for="(state, index) in props.row.state"
            :key="state.id"
            :index="index"
          >
            <span
              class="m-1"
              :class="[
                'tag',
                { 'is-danger': state == false },
                { 'is-success': state == true },
              ]"
              >{{ index + 1 }}
            </span>
          </span>
        </b-table-column>
        <b-table-column field="time" label="시간" centered v-slot="props">
          {{ props.row.time }}
        </b-table-column>
      </b-table>
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-primary" label="닫기" @click="$parent.close()" />
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
      }
    },
  },
};
</script>

<style></style>
