const Home = {
	template: `
	<v-container fill-height fluid>
		<v-layout align-center justify-center>
			<v-layout column align-center justify-center>
				<v-row align="center" justify="center">
					<template v-for="(state, index) in states">
						<v-col :key="index" align-self="center" cols="auto">
							<v-btn width="64" height="64" elevation="2" @click="onClick(index)">
								<v-icon :color="state ? 'green' : 'red'" large>power_settings_new</v-icon>
							</v-btn>
						</v-col>
						<v-responsive
						v-if="index % 2 === 1"
						:key="'width'-index"
						width="100%"
					></v-responsive>
					</template>
				</v-row>
			</v-layout>
		</v-layout>
	</v-container>
	`,
	data: () => ({
		polling: null,
		states: []
	}),

	created () {
		this.onScanStates()
		
		this.polling = setInterval(() => {
			this.onScanStates()
		}, 500)
	},

	beforeDestroy () {
        clearInterval(this.polling)
    },

	methods: {
		onClick (index) {
			axios.get('/action', {
			  params: {
				switch: index
			  }
			})
			.then(res => {
			  this.states = res.data.states
			  console.log(this.states)
			})
			.catch(err => {
			  console.log(err)
			})
		},

		onScanStates () {
			axios.get('/state')
			  .then(res => {
				this.states = res.data.states
			  })
			  .catch(err => {
				console.log(err)
			})
		},
	}
}