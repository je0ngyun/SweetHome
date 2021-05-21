<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">테마설정</p>
    </header>
    <section class="modal-card-body">
      {{ index }}
    </section>
    <footer class="modal-card-foot">
      <b-button type="is-primary" label="적용" @click="setTheme()" />
      <b-button label="닫기" @click="$parent.close()" />
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
  },
  methods: {
    setTheme() {
      this.$store.commit('setCardTheme', {
        index: this.index,
        theme: { background: '#000000', color: '#ffffff' },
      });
      this.$parent.close();
    },
  },
};
</script>

<style></style>
