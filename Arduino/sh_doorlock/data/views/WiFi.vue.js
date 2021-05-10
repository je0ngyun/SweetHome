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
              <v-icon v-else-if="network.rssi <= -80 && network.rssi >= -90">signal_wifi_4_bar</v-icon>
              <v-icon v-else>signal_wifi_statusbar_null</v-icon>
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
    networks: [
      {
        rssi: "-32",
        ssid: "KT",

      },
      {
        rssi: "-88",
        ssid: "SK",

      },
      {
        rssi: "-132",
        ssid: "LG",

      }
    ]
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