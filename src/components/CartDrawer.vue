<template>
	<v-navigation-drawer
		right
		fixed
		temporary
		width="400"
		class="pa-5"
		v-model="drawer"
	>
		<div v-if="cart.length">
			<div class="text-h6 mb-5">Your Cart</div>
			<FlexBox>
				<v-card
					class="py-3 w-100 mr-2 elevation-1"
					color="#e8f5e9"
					outlined
				>
					<v-subheader style="height: 18px">TOTAL PRODUCTS</v-subheader>
					<v-card-title class="py-0"
						>{{ totalProduct }} Product</v-card-title
					>
				</v-card>
				<v-card
					class="py-3 w-100 ml-2 elevation-1"
					outlined
					color="#ede7f6"
				>
					<v-subheader style="height: 18px">TOTAL AMOUNT</v-subheader>
					<v-card-title class="py-0">{{ totalPrice }} CAD</v-card-title>
				</v-card>
			</FlexBox>
			<v-list three-line class="mt-5">
				<template v-for="(item, i) in cart">
					<v-divider
						v-if="showDivider(i)"
						:key="item.id + 'divider'"
					></v-divider>
					<v-list-item class="ai-start" :key="item.id">
						<v-list-item-avatar size="54">
							<v-img contain :src="item.thumbnail"></v-img>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title class="ws-normal">{{
								item.name
							}}</v-list-item-title>
							<div class="text-h6 mb-2">{{ item.sPrice }} CAD</div>
							<FlexBox>
								<v-chip color="#e8eaf6" small class="text-body-2">{{
									item.price
								}}</v-chip>
								<v-chip color="#fce4ec" small class="ml-3">
									<v-btn
										icon
										small
										@click="
											changeQuantity({
												id: item.id,
												type: 'down',
											})
										"
									>
										<feather type="minus" size="16"></feather>
									</v-btn>
									<div class="px-2">{{ item.quantity }}</div>
									<v-btn
										icon
										small
										@click="
											changeQuantity({
												id: item.id,
												type: 'up',
											})
										"
									>
										<feather type="plus" size="16"></feather>
									</v-btn>
								</v-chip>
							</FlexBox>
						</v-list-item-content>
						<v-btn
							icon
							small
							class="mt-2"
							@click="removeFromCart(item.id)"
						>
							<feather
								type="trash"
								class="red--text"
								size="18"
							></feather>
						</v-btn>
					</v-list-item>
				</template>
			</v-list>
			<v-btn to="/checkout" color="accent" block class="my-5"
				>Checkout</v-btn
			>
		</div>
		<div v-else class="px-10 text-center">
			<div class="text-h6 py-10">Cart is empty</div>
			<v-img src="../assets/images/empty_cart.svg"></v-img>
		</div>
	</v-navigation-drawer>
</template>

<script>
import CartMixin from '@/mixins/CartMixin'
export default {
	name: 'CartDrawer',
	mixins: [CartMixin]
}
</script>