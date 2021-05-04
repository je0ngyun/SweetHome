<template>
  <div id="app">
    <div>{{ msg }}</div>
    <hr />
    <Device host="123" name="test" />
    <hr />
    <Menu />
    <hr />
    <Management />
    <hr />
  </div>
</template>

<script>
import Device from './components/Device';
import Menu from './components/Menu';
import Management from './components/Management';

export default {
  name: 'App',
  components: {
    Device,
    Menu,
    Management,
  },
  data: function() {
    return {
      msg: 'Test',
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
