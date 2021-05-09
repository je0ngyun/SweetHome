<template>
  <div id="app" class="columns p-5">
    <Menu class="menu column is-3 card ml-1" />
    <Management class="manage column is-9 card ml-4" />
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
    //빌드시 주석제거 soket.io 이벤트
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
  background: #397daa !important;
  color: #ffffff !important;
  height: 106%;
}
.manage {
  background: #ececec !important;
  height: 106%;
}
</style>
