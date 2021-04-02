<template>
	<v-container>
		<v-row>
			<v-col :cols="cols" :md="md" :class="classes">
				<slot />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: 'Container',
	props: {
		cols: {
			type: [String, Number],
			default: 12
		},
		md: {
			type: [String, Number],
			default: 12
		},
		mxAuto: Boolean
	},
	computed: {
		classes() {
			return {
				'mx-auto': this.mxAuto
			}
		}
	}
}
</script>