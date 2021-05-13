<template>
  <div class="is-flex is-flex-direction-column has-text-centered">
    <div class="is-flex">
      <div class="mr-a mt-a">{{ this.weather.icon }}</div>
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
</template>

<script>
const { getCurrentPositionPromise } = require('geolocation-promise');
export default {
  data: function() {
    return {
      lat: undefined,
      lon: undefined,
      isLoadding: true,
      isError: false,
      weather: {
        temp: undefined,
        area: undefined,
        main: undefined,
        desc: undefined,
        icon: undefined,
      },
    };
  },
  created() {
    getCurrentPositionPromise()
      .then((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        console.log(`${this.lat} ${this.lon}`);
      })
      .catch((ex) => console.log(ex));
    this.$axios
      .get(`${this.$weatherURL}`, {
        params: { lat: 35.806559, lon: 127.1103191, appid: this.$apiKey },
      })
      .then((res) => {
        this.weather.temp = parseInt(res.data.main.temp) - 273;
        this.weather.area = res.data.name;
        this.weather.main = res.data.weather[0].main;
        this.weather.desc = res.data.weather[0].description;
        this.weather.icon = res.data.weather[0].icon;
      })
      .catch(() => console.log('날씨오류'));
  },
};
</script>

<style></style>
