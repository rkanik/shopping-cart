<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
	name: 'CartMixin',
	computed: {
		...mapGetters('Cart', ['$cart', '$cartDrawer']),
		...mapGetters('Product', ['$products']),
		drawer: {
			get() {
				return this.$cartDrawer
			},
			set(drawer) {
				this.setCartState({ drawer })
			}
		},
		cart() {
			return this.$cart.map(product => {
				let {
					name,
					sPrice,
					thumbnail,
					currency
				} = this.$products.find(p => p.id === product.id)
				return {
					...product, thumbnail, sPrice,
					name, price: `${sPrice * product.quantity} ${currency}`
				}
			})
		},
		totalProduct() {
			return this.cart.reduce((total, pro) => total + pro.quantity, 0)
		},
		totalPrice() {
			return this.cart.reduce((total, pro) => total + (pro.sPrice * pro.quantity), 0)
		}
	},
	methods: {
		...mapMutations(
			'Cart', [
			'setCartState',
			'changeQuantity',
			'removeFromCart'
		]),
		showDivider(index) {
			return index > 0 && index < this.cart.length
		}
	}
}
</script>