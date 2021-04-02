<template>
	<div class="home">
		<div class="hero">
			<HeroCarousel />
		</div>

		<v-container>
			<section class="new-arrival py-16">
				<v-row no-gutters class="mb-5">
					<div class="text-h5">New Arrivals</div>
					<!-- <v-spacer></v-spacer>
					<router-link to="/products" class="txt-accent pt-1"
						>SEE ALL</router-link
					> -->
				</v-row>
				<v-row>
					<v-col
						md="3"
						cols="12"
						:key="product.id"
						v-for="product in $products"
					>
						<ProductCard :product="product" @cart="addToCart" />
					</v-col>
				</v-row>
			</section>
		</v-container>

		<v-container>
			<section class="new-arrival py-16">
				<v-row no-gutters class="mb-5">
					<div class="text-h5">Flash Sales</div>
					<!-- <v-spacer></v-spacer>
					<router-link to="/products" class="txt-accent pt-1"
						>SEE ALL</router-link
					> -->
				</v-row>
				<v-row>
					<v-col
						md="3"
						cols="12"
						:key="product.id"
						v-for="product in sortedProducts"
					>
						<ProductCard :product="product" @cart="addToCart" />
					</v-col>
				</v-row>
			</section>
		</v-container>
	</div>
</template>

<script>
import ProductCard from '@/components/ProductCard'
import HeroCarousel from '@/components/HeroCarousel'
import { mapGetters, mapMutations } from 'vuex'
export default {
	name: 'Home',
	components: {
		ProductCard,
		HeroCarousel
	},
	computed: {
		...mapGetters('Product', ['$products']),
		sortedProducts() {
			return [...this.$products].sort((a, b) => b.sPrice - a.sPrice)
		}
	},
	methods: {
		...mapMutations('Cart', ['addToCart']),
	}
}
</script>
