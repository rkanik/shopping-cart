<template>
	<v-card outlined class="product">
			<v-img class="pointer" @click="gotoDetails" :src="product.thumbnail" height="200"/>
		<!-- <div class="d-block px-5 py-10">
		</div> -->
		<div class="pos-rel">
			<v-btn
				fab
				dark
				small
				color="accent"
				class="product__add"
				@click="$emit('cart', product.id)"
			>
				<v-icon dark size="16">mdi-cart</v-icon>
			</v-btn>
			<v-card-subtitle
				@click="gotoDetails"
				class="pointer txt-pri pb-0 pt-5"
				>{{ product.name }}</v-card-subtitle
			>
			<v-card-text>
				<h2 class="black--text">
					{{ productPrice }}
				</h2>
			</v-card-text>
		</div>
	</v-card>
</template>

<script>
export default {
	name: 'product',
	props: {
		product: {
			type: Object,
			default: () => ({})
		}
	},
	computed: {
		productPrice() {
			let { sPrice, currency } = this.product
			return `${sPrice} ${currency}`
		},
		productRoute() {
			let { slag } = this.product
			return `/products/${slag}`
		}
	},
	methods: {
		gotoDetails() {
			this.$router.push({
				name: 'Product',
				params: {
					slag: this.product.slag,
					product: this.product
				}
			})
		}
	}
}
</script>

<style lang='scss' scoped>
	.product {
		&__add {
			top: -20px;
			right: 1rem;
			position: absolute;
		}
	}
</style>