<template>
	<div class="flex-box" :class="classes">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'FlexBox',
	props: {
		row: {
			type: Boolean,
			default: true
		},
		column: Boolean,
		center: Boolean,
		justifyCenter: Boolean,
		justifyBetween: Boolean,
		alignCenter: Boolean,
	},
	computed: {
		classes() {
			return {
				center: this.center,
				'justify-center': this.justifyCenter,
				'justify-between': this.justifyBetween,
				'align-center': this.alignCenter,
				'flex-column': this.column,
				'flex-row': this.row && !this.column,
			}
		}
	}
}
</script>

<style lang='scss' scoped>
	.flex-box {
		display: flex;
	}
	.center {
		align-items: center;
		justify-content: center;
	}
	.justify-between {
		justify-content: space-between;
	}
	.align-center {
		align-items: center;
	}
</style>