<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">테마설정</p>
    </header>
    <section class="modal-card-body">
      <div class="is-flex has-text-centered">
        <div
          class="is-flex is-flex-direction-column has-text-centered mr-a mr-5"
        >
          <div class="font-s mb-4">변경할 부분을 선택해 주세요!</div>
          <span class="is-flex mb-1">
            <span class="mr-a">배경색</span>
            <span class="ml-3">
              <b-button
                @click="select(0)"
                size="is-small"
                :style="{ background: cardBg.hex }"
              ></b-button>
            </span>
          </span>
          <span class="is-flex mb-1">
            <span class="mr-a">글자색</span>
            <span class="ml-3">
              <b-button
                @click="select(1)"
                size="is-small"
                :style="{ background: fontColor.hex }"
              ></b-button>
            </span>
          </span>
          <span class="is-flex mb-1">
            <span class="mr-a">버튼ON</span>
            <span class="ml-3">
              <b-button
                @click="select(2)"
                size="is-small"
                :style="{ background: btnOnColor.hex }"
              ></b-button>
            </span>
          </span>
          <span class="is-flex mb-1">
            <span class="mr-a">버튼OFF</span>
            <span class="ml-3">
              <b-button
                @click="select(3)"
                size="is-small"
                :style="{ background: btnOffColor.hex }"
              ></b-button>
            </span>
          </span>
        </div>
        <div class="ml-5">
          <Chrome class="picker" v-if="selected == 0" v-model="cardBg"></Chrome>
          <Chrome
            class="picker"
            v-if="selected == 1"
            v-model="fontColor"
          ></Chrome>
          <Chrome
            class="picker"
            v-if="selected == 2"
            v-model="btnOnColor"
          ></Chrome>
          <Chrome
            class="picker"
            v-if="selected == 3"
            v-model="btnOffColor"
          ></Chrome>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-primary" label="적용" @click="setTheme()" />
      <b-button label="닫기" @click="$parent.close()" />
    </footer>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';
export default {
  props: {
    index: Number,
  },
  components: {
    Chrome,
  },
  data: function() {
    return {
      selected: 0,
      cardBg: {
        hex: undefined,
      },
      fontColor: {
        hex: undefined,
      },
      btnOnColor: {
        hex: undefined,
      },
      btnOffColor: {
        hex: undefined,
      },
    };
  },
  created() {
    this.cardBg.hex = this.cardTheme.background;
    this.fontColor.hex = this.cardTheme.color;
    this.btnOnColor.hex = this.btnTheme.is_on.color;
    this.btnOffColor.hex = this.btnTheme.is_off.color;
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
    select(index) {
      this.selected = index;
    },
    setTheme() {
      this.$store.commit('setCardTheme', {
        index: this.index,
        theme: { background: this.cardBg.hex, color: this.fontColor.hex },
      });
      this.$store.commit('setBtnTheme', {
        index: this.index,
        theme: {
          is_on: { color: this.btnOnColor.hex, transition: 'all ease 1s 0s' },
          is_off: { color: this.btnOffColor.hex, transition: 'all ease 1s 0s' },
        },
      });
      this.$parent.close();
    },
  },
};
</script>

<style scoped>
.picker {
  box-shadow: none !important;
}
</style>
