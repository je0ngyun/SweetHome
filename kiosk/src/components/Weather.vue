<template>
  <div>날씨</div>
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
    };
  },
  created() {
    getCurrentPositionPromise()
      .then((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.$axios
          .get(`${this.$weatherURL}`, {
            params: { lat: this.lat, lon: this.lon, appid: this.$apiKey },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch(() => console.log('날씨오류'));
      })
      .catch(() => console.log('위도경도오류'));
  },
};
</script>

<style></style>
