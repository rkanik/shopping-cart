<template>
	<div class="product bg-sec py-16">
		<Container>
			<h1 class="text-h5">{{ $product.name }}</h1>
			<FlexBox align-center class="caption">
				<span><strong>Model: </strong><span>KAN-B19S</span></span>
				<span class="ml-3"
					><strong> Article: </strong><span>01209</span></span
				>
				<v-chip color="error" class="ml-3" style="height: 16px" small
					>Sell</v-chip
				>
			</FlexBox>
			<FlexBox class="mt-2">
				<v-icon size="18" class="mr-1" color="accent">mdi-star</v-icon>
				<v-icon size="18" class="mr-1" color="accent">mdi-star</v-icon>
				<v-icon size="18" class="mr-1" color="accent">mdi-star</v-icon>
				<v-icon size="18" class="mr-1" color="accent">mdi-star</v-icon>
				<v-icon size="18" color="accent" class="mr-3"
					>mdi-star-outline</v-icon
				>
				<span class="caption">5 reviews</span>
			</FlexBox>
			<v-row class="mt-16">
				<v-col cols="12" md="8">
					<ImagePreview :images="$product.images" />
				</v-col>
				<v-col cols="12" md="4">
					<v-card class="shadow pa-3">
						<v-card-title class="text-h6 black--text pb-1">
							<span class="mr-2">{{ $product.sPrice }}</span>
							<span>{{ $product.currency }}</span>
							<span class="subtitle-2 txt-sec line-through ml-3">
								<span class="mr-2">{{ $product.oPrice }}</span>
								<span>{{ $product.currency }}</span>
							</span>
						</v-card-title>
						<v-card-text>
							<v-chip small color="success"
								>Saving {{ discount }}%</v-chip
							>
						</v-card-text>
						<v-card-actions class="pt-8">
							<v-btn
								large
								block
								@click="addToCart($product.id)"
								color="accent"
								class="shadow"
								>Add to cart</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</Container>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { isEmpty } from '@/helpers/helpers'
import ImagePreview from '@/components/ImagePreview'
export default {
	name: 'Product',
	components: {
		ImagePreview
	},
	props: {
		product: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		...mapGetters('Product', ['$products']),
		$product() {
			return !isEmpty(this.product) ? this.product
				: this.$products.find(p => p.slag === this.$route.params.slag)
		},
		discount() {
			let { sPrice, oPrice } = this.$product
			return Math.round(((oPrice - sPrice) / oPrice) * 100)
		}
	},
	methods: {
		...mapMutations('Cart', ['addToCart']),
	}
}
</script>

<style lang='scss' scoped>
	.product {
	}
</style>