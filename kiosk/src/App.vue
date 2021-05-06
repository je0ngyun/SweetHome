<template>
  <div id="app" class="columns">
    <Menu class="menu column is-3" />
    <Management class="manage column is-9 " />
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
    /*this.$socket.on('code', (code) => {
      this.$buefy.dialog.alert({
        title: '인증번호확인',
        message: code,
        confirmText: '확인',
      });
    });*/
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
  text-align: center;
  color: #2c3e50;
  width: 800px;
  height: 100%;
}
.menu {
  background: cornflowerblue;
  height: 103%;
}
.manage {
  height: 103%;
}
</style>
