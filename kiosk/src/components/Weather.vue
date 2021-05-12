<template>
  <div>
    {{ this.lat }}
    <br />
    {{ this.lng }}
  </div>
</template>

<script>
const { getCurrentPositionPromise } = require('geolocation-promise');
export default {
  data: function() {
    return {
      lat: undefined,
      lng: undefined,
    };
  },
  created() {
    getCurrentPositionPromise()
      .then((position) => {
        console.log(position.coords);
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      })
      .catch((e) => console.log(e));
  },
};
</script>

<style></style>
