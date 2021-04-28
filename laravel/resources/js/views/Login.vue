<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-layout column align-center justify-center>
        <v-img max-height="256" width="256" src="img/logo.svg" />
        <v-expand-transition>
          <v-card elevation="0" color="rgb(255,255,255,0)" v-show="expand" max-width="400">
            <v-card-text>
                <v-text-field v-model="username" label="사용자 이름" prepend-inner-icon="mdi-account" color="primary" />
                <v-text-field v-model="password" label="비밀번호" prepend-inner-icon="mdi-lock" color="primary" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" @click:append="show = !show" />
                <v-checkbox v-model="save_username" label="아이디 저장" />
            </v-card-text>
          </v-card>
        </v-expand-transition>
        <v-layout column>
          <v-btn rounded color="primary" block dark @click="doLogin">{{ expand ? '로그인' : '로그인하기'}}</v-btn>
          <v-layout>
            <router-link v-show="expand" to="/">하앍</router-link>
            <router-link v-show="expand" to="/">비밀번호 찾기</router-link>
          </v-layout>
        </v-layout>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Login',

  data: () => ({
    expand: false,
    username: '',
    password: '',
    save_username: false,
    show: false
  }),

  methods: {
    onSubmit () {
      var data = {
        username: this.username,
        password: this.password
      }
      axios.post('/api/test', data)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {

      })
    },

    doLogin () {
      if (this.expand) {
        this.onSubmit()
      } else {
        this.expand = !this.expand
      }
    }
  }
}
</script>