<template>
  <div id="app" class="columns p-5">
    <Menu class="menu column is-3 card ml-1 sub-bg" />
    <Management class="manage column is-9 card ml-4 main-bg" />
  </div>
</template>

<script>
import Menu from './components/Menu';
import Management from './components/Management';

export default {
  name: 'App',
  components: {
    Menu,
    Management,
  },
  data: function() {
    return {
      msg: 'APP',
    };
  },
  created() {
    this.$socket.on('code', (code) => {
      this.$buefy.dialog.alert({
        title: '인증번호확인',
        message: code,
        confirmText: '확인',
      });
    });
  },
};
</script>

<style>
html,
body {
  min-height: 100% !important;
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 800px;
  height: 100%;
}
.menu {
  height: 106%;
}
.manage {
  height: 106%;
}
.main-bg {
  background: #ececec !important;
}
.sub-bg {
  background: #397daa !important;
}
.mb-a {
  margin-bottom: auto;
}
.mt-a {
  margin-top: auto;
}
.font-s {
  font-size: small;
}
.font-light {
  color: #ececec;
}
</style>
