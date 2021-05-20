<template>
  <div>
    <div
      v-if="this.isLoading"
      class="is-flex is-flex-direction-column has-text-centered 
      is-justify-content-center is-align-items-center"
    >
      <div class="loading mb-3"></div>
      <div class="font-s">loadding..</div>
    </div>
    <div
      v-if="!this.isLoading"
      class="is-flex is-flex-direction-column has-text-centered"
    >
      <div class="is-flex">
        <div class="ml-4 mt-a">
          <font-awesome-icon :icon="['fas', this.weatherIcon]" size="2x" />
        </div>
        <div class="ml-a">
          <span class="font-xl">{{ this.weather.temp }}</span>
          <span>℃</span>
        </div>
      </div>
      <div class="is-flex">
        <div class="mr-a mt-a font-xs">{{ this.weather.desc }}</div>
        <div class="ml-a mt-a">{{ this.weather.area }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentPositionPromise } from 'geolocation-promise';
export default {
  data: function() {
    return {
      lat: 35.8319167125,
      lon: 127.1372125,
      isLoading: true,
      weather: {
        temp: undefined,
        area: undefined,
        main: undefined,
        desc: undefined,
        code: undefined,
      },
      weatherIcon: 'spinner',
    };
  },
  created() {
    getCurrentPositionPromise()
      .then((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.getWeather();
      })
      .catch((e) => {
        console.log(e);
        this.getWeather();
      });
    setInterval(this.getWeather, 360000);
  },
  methods: {
    decode() {
      //날씨코드 복호화
      let weatherIcon = {
        '01': 'sun',
        '02': 'cloud-sun',
        '03': 'cloud',
        '04': 'cloud-meatball',
        '09': 'cloud-sun-rain',
        '10': 'cloud-showers-heavy',
        '11': 'poo-storm',
        '13': 'snowflake',
        '50': 'smog',
      };
      this.weatherIcon = weatherIcon[this.weather.code];
    },
    getWeather() {
      this.$axios
        .get(`${this.$weatherURL}`, {
          params: { lat: this.lat, lon: this.lon, appid: this.$apiKey },
        })
        .then((res) => {
          this.weather.temp = parseInt(res.data.main.temp) - 273;
          this.weather.area = res.data.name;
          this.weather.main = res.data.weather[0].main;
          this.weather.desc = res.data.weather[0].description;
          this.weather.code = res.data.weather[0].icon.substring(0, 2);
          this.decode();
          this.isLoading = false;
        })
        .catch((ex) => console.log(ex));
    },
  },
};
</script>

<style scoped></style>
