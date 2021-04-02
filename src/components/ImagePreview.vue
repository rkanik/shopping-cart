<template>
	<div class="image-preview">
		<FlexBox>
			<FlexBox column>
				<v-card
					rounded
					outlined
					:key="i"
					width="100"
					height="100"
					@click="active = i"
					v-for="(img, i) of images.slice(0, 4)"
					:class="{ active: active === i, 'mb-5': i !== 3 }"
					class="thumb-wrapper pa-2 pointer"
				>
					<v-img contain :src="img" />
				</v-card>
			</FlexBox>
			<FlexBox justify-center align-center class="ml-5" style="flex: 1">
				<img height="460" class="bg-sec" :src="images[active]" />
			</FlexBox>
		</FlexBox>
	</div>
</template>

<script>
export default {
	name: 'image-preview',
	props: {
		images: {
			type: Array,
			required: true,
			default: []
		}
	},
	data() {
		return {
			active: 0
		}
	}
}
</script>

<style lang='scss' scoped>
	.image-preview {
	}
	.thumb-wrapper {
		border: 2px solid white;
		&.active {
			border-color: var(--accent);
		}
	}
</style>