const Home = {
	template: `
	<v-container fill-height fluid>
		<v-layout align-center justify-center>
			<v-layout column align-center justify-center>
				<v-row align="center" justify="center">
					<template v-for="(state, index) in states">
						<v-col :key="index" align-self="center" cols="auto">
							<v-btn width="64" height="64" elevation="2">
								<v-icon :color="state ? 'green' : 'red'" large>power_settings_new</v-icon>
							</v-btn>
						</v-col>
					</template>
				</v-row>
			</v-layout>
		</v-layout>
	</v-container>
	`,
	data: () => ({
		states: [false]
	})
}