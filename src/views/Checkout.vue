<template>
	<div class="checkout">
		<v-stepper
			non-linear
			v-model="step"
			color="accent"
			class="checkout__stepper bg-sec elevation-0"
			v-if="!ordered"
			@change="onChangeStep"
		>
			<Container cols="12" md="8" mx-auto>
				<v-stepper-header class="elevation-0">
					<template
						v-for="(
							{ name, completed, divider, editable }, index
						) of steps"
					>
						<v-stepper-step
							:step="index + 1"
							:complete="completed"
							:key="index"
							:editable="editable"
						>
							<span class="uppercase">{{ name }}</span>
						</v-stepper-step>
						<v-divider v-if="divider" :key="name" />
					</template>
				</v-stepper-header>
			</Container>
			<v-stepper-items class="bg-pri">
				<template v-for="({ name }, index) of steps">
					<v-stepper-content
						:key="index"
						:step="index + 1"
						v-if="name === 'Cart'"
					>
						<v-container>
							<v-row>
								<v-col cols="12">
									<div class="text-h6">Your Cart</div>
								</v-col>
								<v-col cols="12" md="8">
									<div v-if="cart.length">
										<v-list three-line class="shadow">
											<template v-for="(item, i) in cart">
												<v-divider
													v-if="showDivider(i)"
													:key="item.id + 'divider'"
												></v-divider>
												<v-list-item
													class="ai-start"
													:key="item.id"
												>
													<v-list-item-avatar size="54">
														<v-img
															contain
															:src="item.thumbnail"
														></v-img>
													</v-list-item-avatar>

													<v-list-item-content>
														<v-list-item-title
															class="ws-normal"
															>{{ item.name }}</v-list-item-title
														>
														<FlexBox align-center>
															<div class="text-h6 mr-3">
																{{ item.sPrice }} CAD
															</div>
															<v-chip
																color="#e8eaf6"
																small
																class="text-body-2"
																>{{ item.price }}</v-chip
															>
															<v-chip
																color="#fce4ec"
																small
																class="ml-3"
															>
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
																	<feather
																		type="minus"
																		size="16"
																	></feather>
																</v-btn>
																<div class="px-2">
																	{{ item.quantity }}
																</div>
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
																	<feather
																		type="plus"
																		size="16"
																	></feather>
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
									</div>
									<div v-else class="px-10 text-center">
										<div class="text-h6 py-10">Cart is empty</div>
										<v-img
											src="../assets/images/empty_cart.svg"
										></v-img>
									</div>
								</v-col>
								<v-col cols="12" md="4">
									<v-card class="shadow">
										<v-card-text class="pa-5">
											<v-card
												class="py-3 w-100 mb-3 elevation-1"
												color="#e8f5e9"
												outlined
											>
												<v-subheader style="height: 18px"
													>TOTAL PRODUCTS</v-subheader
												>
												<v-card-title class="py-0"
													>{{ totalProduct }} Product</v-card-title
												>
											</v-card>
											<v-card
												class="py-3 w-100 elevation-1"
												outlined
												color="#ede7f6"
											>
												<v-subheader style="height: 18px"
													>TOTAL AMOUNT</v-subheader
												>
												<v-card-title class="py-0"
													>{{ totalPrice }} CAD</v-card-title
												>
											</v-card>
										</v-card-text>
										<v-card-actions class="pa-5">
											<v-btn
												@click="nextStep"
												color="accent"
												large
												block
												>Continue</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
					</v-stepper-content>
					<v-stepper-content
						:key="index"
						:step="index + 1"
						v-if="name === 'Shipping Details'"
					>
						<Container v-if="!$isAuth" cols="12" md="6" mx-auto>
							<v-img src="../assets/images/sign_in.svg" />
							<router-link
								text
								:to="`/signin?ref=checkout&step=${step}`"
								class="d-block ma-10 text-center"
								>Please signin to continue</router-link
							>
						</Container>
						<v-container v-else>
							<v-row>
								<v-col cols="12">
									<div class="text-h6">Shipping Details</div>
								</v-col>
								<v-col cols="12" md="8">
									<v-subheader class="pl-0">BASIC</v-subheader>
									<v-row>
										<v-col cols="12">
											<v-text-field
												label="Full Name"
												v-bind="textField"
												:value="shippingDetails.name"
											/>
										</v-col>
										<v-col cols="12" md="6">
											<v-text-field
												label="Phone"
												v-bind="textField"
												:value="shippingDetails.phone"
											/>
										</v-col>
										<v-col cols="12" md="6">
											<v-text-field
												v-bind="textField"
												label="Email Address"
												:value="shippingDetails.email"
											/>
										</v-col>
									</v-row>
									<v-subheader class="pl-0">ADDRESS</v-subheader>
									<v-row v-if="shippingDetails.address">
										<v-col cols="12" md="12">
											<v-textarea
												rows="3"
												name="street"
												v-bind="textField"
												v-model="shippingDetails.address.street"
												label="Street Address"
											/>
										</v-col>
										<v-col cols="12" md="4">
											<v-text-field
												name="city"
												v-bind="textField"
												v-model="shippingDetails.address.city"
												label="City"
											/>
										</v-col>
										<v-col cols="12" md="4">
											<v-text-field
												name="state"
												v-bind="textField"
												v-model="shippingDetails.address.state"
												label="State"
											/>
										</v-col>
										<v-col cols="12" md="4">
											<v-text-field
												name="zip"
												v-bind="textField"
												v-model="shippingDetails.address.zip"
												label="ZIP"
											/>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="12"> </v-col>
									</v-row>
								</v-col>
								<v-col cols="12" md="4">
									<v-card class="shadow">
										<v-card-text class="pa-5">
											<v-card
												class="py-3 w-100 mb-3 elevation-1"
												color="#e8f5e9"
												outlined
											>
												<v-subheader style="height: 18px"
													>TOTAL PRODUCTS</v-subheader
												>
												<v-card-title class="py-0"
													>{{ totalProduct }} Product</v-card-title
												>
											</v-card>
											<v-card
												class="py-3 w-100 elevation-1"
												outlined
												color="#ede7f6"
											>
												<v-subheader style="height: 18px"
													>TOTAL AMOUNT</v-subheader
												>
												<v-card-title class="py-0"
													>{{ totalPrice }} CAD</v-card-title
												>
											</v-card>
										</v-card-text>
										<v-card-actions class="pa-5">
											<v-btn
												@click="nextStep"
												color="accent"
												large
												block
												>Continue</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
					</v-stepper-content>
					<v-stepper-content
						:key="index"
						:step="index + 1"
						v-if="name === 'Payment'"
					>
						<v-container>
							<v-row>
								<v-col cols="12">
									<div class="text-h6">Select Payment Method</div>
								</v-col>
								<v-col cols="12" md="8">
									<v-card class="shadow pa-5">
										<img src="../assets/images/visa.png" />
										<img src="../assets/images/master.png" />
										<img src="../assets/images/aexpress.png" />
										<v-form
											lazy-validation
											ref="paymentForm"
											:valid="paymentFormValid"
										>
											<v-row>
												<v-col cols="12" md="8">
													<v-text-field
														v-bind="textField"
														label="Card Number"
														:rules="[required]"
														v-model="payment.number"
													/>
												</v-col>
												<v-col cols="12" md="8">
													<v-text-field
														v-bind="textField"
														label="Name on Card"
														:rules="[required]"
														v-model="payment.name"
													/>
												</v-col>
												<v-col cols="12" md="4"></v-col>
												<v-col cols="12" md="6">
													<v-text-field
														v-bind="textField"
														label="Expiration Date"
														placeholder="MM/YY"
														:rules="[required]"
														v-model="payment.expiration"
													/>
												</v-col>
												<v-col cols="12" md="2">
													<v-text-field
														v-bind="textField"
														label="CVV"
														:rules="[required]"
														v-model="payment.cvv"
													/>
												</v-col>
											</v-row>
										</v-form>
									</v-card>
								</v-col>
								<v-col cols="12" md="4">
									<v-card class="shadow">
										<v-card-text class="pa-5">
											<v-card
												class="py-3 w-100 mb-3 elevation-1"
												color="#e8f5e9"
												outlined
											>
												<v-subheader style="height: 18px"
													>TOTAL PRODUCTS</v-subheader
												>
												<v-card-title class="py-0"
													>{{ totalProduct }} Product</v-card-title
												>
											</v-card>
											<v-card
												class="py-3 w-100 elevation-1"
												outlined
												color="#ede7f6"
											>
												<v-subheader style="height: 18px"
													>TOTAL AMOUNT</v-subheader
												>
												<v-card-title class="py-0"
													>{{ totalPrice }} CAD</v-card-title
												>
											</v-card>
										</v-card-text>
										<v-card-actions class="pa-5">
											<v-btn
												large
												block
												class="shadow"
												color="accent"
												@click="placeOrder"
												>Place Order</v-btn
											>
										</v-card-actions>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
					</v-stepper-content>
				</template>
			</v-stepper-items>
		</v-stepper>
		<Container md="6" mx-auto v-else>
			<v-img src="../assets/images/super_thank_you.svg" />
			<div class="text-h6 text-center mt-10">
				Your order is being placed Successfully!
			</div>
			<router-link to="/" class="text-center d-block"
				>Continue shopping</router-link
			>
		</Container>
	</div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { setQuery, deleteQuery } from '../helpers/helpers'

import CartMixin from '@/mixins/CartMixin'

export default {
	name: 'checkout',
	mixins: [CartMixin],
	data() {
		return {
			step: 1,
			steps: [
				{
					editable: true,
					name: 'Cart',
					completed: false,
					divider: true
				},
				{
					editable: false,
					name: 'Shipping Details',
					completed: false,
					divider: true
				},
				{
					editable: false,
					name: 'Payment',
					completed: false
				},
			],
			shippingDetails: {},
			payment: {
				name: '',
				number: '',
				expiration: '',
				cvv: ''
			},
			required: v => !!v || 'Field is Required',
			paymentFormValid: true,
			ordered: false
		}
	},
	created() {

		let step = this.$route.query.step
		if (step) { this.step = +step }

		this.shippingDetails = this.$user
		if (!this.$user.address) {
			this.$user.address = {
				street: '',
				city: '',
				state: '',
				zip: ''
			}
		}
	},
	computed: {
		...mapGetters(
			'Auth', [
			'$isAuth',
			'$user'
		]),
		textField() {
			return {
				dense: true,
				filled: true,
				required: true,
				'hide-details': true
			}
		}
	},
	methods: {
		...mapMutations('Cart', ['resetCartState']),
		placeOrder() {
			let valid = this.$refs.paymentForm[0].validate()
			if (!valid) return

			this.ordered = true
			this.resetCartState()
		},
		onChangeStep(step) {
			setQuery({ step })
		},
		nextStep() {
			let step = this.steps[this.step - 1]
			this.steps[this.step - 1] = {
				...step,
				completed: true
			}
			this.steps[this.step].editable = true
			this.step += 1
			this.onChangeStep(this.step)
		}
	}
}
</script>