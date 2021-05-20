<template>
  <div id="content" :style="contentStyle" @click="clicked">
    <div class="wrapper">
      <h1 v-if="one" :class="faded">{{ timeOne }}</h1>
      <h1 v-if="two" :class="faded">{{ timeTwo }}</h1>
      <h1 v-if="three" :class="faded">{{ timeThree }}</h1>
      <h1 v-if="four" :class="faded">{{ timeFour }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      contentStyle: {
        backgroundColor: '#000000'.replace(/0/g, function() {
          return (~~(Math.random() * 16)).toString(16);
        }),
      },
      timeOne: this.$moment().format('LTS'),
      timeTwo: this.$moment().format('l'),
      timeThree: this.$moment().format('MMMM Do YY'),
      timeFour: this.$moment().format('LT'),
      one: true,
      two: false,
      three: false,
      four: false,
      faded: '',
      instructionsStyle: {
        opacity: 1,
        transition: '.2s',
      },
    };
  },
  methods: {
    clicked: function() {
      this.contentStyle.backgroundColor = '#000000'.replace(/0/g, function() {
        return (~~(Math.random() * 16)).toString(16);
      });
      this.instructionsStyle.opacity = 0;
      if (this.one == true) {
        this.faded = 'faded';
        setTimeout(() => {
          this.faded = '';
          this.one = false;
          this.two = true;
        }, 200);
      } else if (this.two == true) {
        this.faded = 'faded';
        setTimeout(() => {
          this.faded = '';
          this.two = false;
          this.three = true;
        }, 200);
      } else if (this.three == true) {
        this.faded = 'faded';
        setTimeout(() => {
          this.faded = '';
          this.three = false;
          this.four = true;
        }, 200);
      } else if (this.four == true) {
        this.faded = 'faded';
        setTimeout(() => {
          this.faded = '';
          this.four = false;
          this.one = true;
        }, 200);
      }
    },
  },
  mounted: function() {
    setInterval(() => {
      this.timeOne = this.$moment().format('LTS');
    }, 1000);
  },
};
</script>

<style scoped>
#content {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: 0.5s;
  text-align: center;
  font-family: Oxygen;
}
h1 {
  transition: 0.2s;
  font-size: medium;
  margin: 0;
}
p {
  transition: 0.2s;
}
.faded {
  opacity: 0;
  transition: 0.2s;
}
</style>
