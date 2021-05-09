const WiFi = {
  template: `
  <v-container fill-height fluid>
    <v-layout align-center justify-center>
      <v-layout column align-center justify-center>
        <v-card>
          <v-card-title>
            WiFi 목록
          </v-card-title>
          <v-divider />
          <v-list-item v-for="(network, i) in networks" :key="i" @click="onConnect(i)">
            <v-list-item-content>
              {{ network.ssid }}
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-show="network.secure != 7">lock-fill</v-icon>
            </v-list-item-icon>
            <v-list-item-icon>
              <v-icon v-if="network.rssi <= -30 && network.rssi >= -80">wifi</v-icon>
              <v-icon v-else-if="network.rssi <= -80 && network.rssi >= -90">wifi2</v-icon>
              <v-icon v-else>wifi1</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-card>
      </v-layout>
		</v-layout>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>'{{ title }}'의 비밀번호 입력</v-card-title>
        <v-divider />
        <v-form>
          
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
  `,

  data: () => ({
    polling: null,
    dialog: false,
    title: '',
    selectedNetwork: null,
    ssid: '',
    password: '',
    passwordState: null,
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

    onConnect (i) {
      if (!this.dialog) {
        this.selectedNetwork = i
        this.title = this.networks[i].ssid
        this.ssid = this.networks[i].ssid
        this.dialog = !this.dialog
      }
    }
  }
}