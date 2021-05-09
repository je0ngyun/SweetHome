<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">기기로그보기</p>
    </header>
    <section class="modal-card-body">
      기기로그표시
    </section>
    <footer class="modal-card-foot">
      <b-button label="Close" @click="$parent.close()" />
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    email: String,
    password: String,
  },
};
</script>

<style></style>
