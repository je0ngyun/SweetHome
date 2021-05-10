const SignalWiFi3 = {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49l.01.01l.01-.01z" fill="#626262"/><path d="M3.53 10.95l8.46 10.54l.01.01l.01-.01l8.46-10.54C20.04 10.62 16.81 8 12 8c-4.81 0-8.04 2.62-8.47 2.95z" fill="#626262"/></svg>
  `
}

const SignalWiFi2 = {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49l.01.01l.01-.01z" fill="#626262"/><path d="M4.79 12.52l7.2 8.98H12l.01-.01l7.2-8.98C18.85 12.24 16.1 10 12 10s-6.85 2.24-7.21 2.52z" fill="#626262"/></svg>
  `
}

const SignalWiFi1 = {
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49l.01.01l.01-.01z" fill="#626262"/><path d="M6.67 14.86L12 21.49v.01l.01-.01l5.33-6.63C17.06 14.65 15.03 13 12 13s-5.06 1.65-5.33 1.86z" fill="#626262"/></svg>
  `
}

const WiFi = {
  template: `
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-layout column align-center justify-center>
        <v-card class="mx-auto" width="600" justify-center>
          <v-card-title>
            WiFi 목록
          </v-card-title>
          <v-divider />
          <v-list-item v-for="(network, i) in networks" :key="i" @click="onClickItem(i)">
            <v-list-item-content>
              {{ network.ssid }}
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-show="network.secure != 7">lock</v-icon>
            </v-list-item-icon>
            <v-list-item-icon>
              <v-icon v-if="network.rssi <= -30 && network.rssi >= -80">signal_wifi_4_bar</v-icon>
              <v-icon v-else-if="network.rssi <= -80 && network.rssi >= -90">$wifi2</v-icon>
              <v-icon v-else>$wifi1</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-card>
      </v-layout>
		</v-layout>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
      <v-toolbar color="primary" dark>
      <v-toolbar-title>'{{ title }}'의 비밀번호 입력</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="dialog = !dialog">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-title />
      <v-container>
        <v-form @submit.prevent="onSubmit">
          <v-text-field v-model="password" outlined label="비밀번호" prepend-inner-icon="lock" :append-icon="passwordShow ? 'visibility' : 'visibility_off'" :type="passwordShow ? 'text' : 'password'" @click:append="passwordShow = !passwordShow" required />
          <v-btn rounded color="primary" dark>연결</v-btn>
        </v-form>
      </v-container>
      </v-card>
    </v-dialog>
  </v-container>
  `,

  data: () => ({
    polling: null,
    dialog: false,
    title: '',
    ssid: '',
    password: '',
    passwordShow: false,
    networks: []
  }),

  created () {
    this.onScanWiFi()

    this.polling = setInterval(() => {
      this.onScanWiFi()
    }, 5000)
  },

  beforeDestroy () {
    clearInterval(this.polling)
  },

  methods: {
    onScanWiFi () {
      axios.get('/scan')
        .then(res => {
          this.networks = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    onSubmit () {
      axios.post('/connect', {
        ssid: this.ssid,
        password: this.password
      })
        .then(res=> {

        })
        .catch(err => {

        })
      
      this.dialog = !this.dialog
    },

    onClickItem (i) {
      if (!this.dialog && this.networks[i].secure != 7) {
        this.title = this.networks[i].ssid
        this.ssid = this.networks[i].ssid
        this.dialog = !this.dialog
      } else {
        axios.post('/connect', {
          ssid: this.ssid,
          password: ''
        })
          .then(res=> {

          })
          .catch(err => {

          })
      }
    }
  }
}