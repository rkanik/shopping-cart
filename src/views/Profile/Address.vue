<template>
	<v-card class="address shadow">
		<FlexBox align-center justify-between class="pa-8 pb-0">
			<v-card-title class="pa-0">Shipping Address</v-card-title>
			<v-btn
				text
				small
				outlined
				@click="updating = !updating"
				:color="updating ? 'error' : 'accent'"
				>{{
					updating ? "Cancel" : hasAddress ? "Update" : "Add Address"
				}}</v-btn
			>
		</FlexBox>

		<v-card-text class="pa-8">
			<v-row v-if="!updating && hasAddress">
				<v-col cols="12">
					<v-subheader class="pl-0" style="height: 18px"
						>Street Address</v-subheader
					>
					<div class="body-1 mb-3 txt-pri">{{ $address.street }}</div>
				</v-col>
				<v-col cols="12" md="4">
					<v-subheader class="pl-0" style="height: 18px">City</v-subheader>
					<div class="body-1 mb-3 txt-pri">{{ $address.city }}</div>
				</v-col>
				<v-col cols="12" md="4">
					<v-subheader class="pl-0" style="height: 18px"
						>State</v-subheader
					>
					<div class="body-1 mb-3 txt-pri">{{ $address.state }}</div>
				</v-col>
				<v-col cols="12" md="4">
					<v-subheader class="pl-0" style="height: 18px">ZIP</v-subheader>
					<div class="body-1 mb-3 txt-pri">{{ $address.zip }}</div>
				</v-col>
			</v-row>

			<v-form ref="addressForm" v-else-if="updating">
				<v-row>
					<v-col cols="12" md="12">
						<v-textarea
							rows="3"
							name="street"
							v-bind="textField"
							v-model="address.street"
							label="Street Address"
						/>
					</v-col>
					<v-col cols="12" md="4">
						<v-text-field
							name="city"
							v-bind="textField"
							v-model="address.city"
							label="City"
						/>
					</v-col>
					<v-col cols="12" md="4">
						<v-text-field
							name="state"
							v-bind="textField"
							v-model="address.state"
							label="State"
						/>
					</v-col>
					<v-col cols="12" md="4">
						<v-text-field
							name="zip"
							v-bind="textField"
							v-model="address.zip"
							label="ZIP"
						/>
					</v-col>
				</v-row>
			</v-form>

			<div v-if="!updating && !hasAddress">
				<v-img
					width="350"
					class="mx-auto"
					src="../../assets/images/address.svg"
				/>
				<div class="text-h5 py-10 text-center">Add your Address first</div>
			</div>
		</v-card-text>
		<v-card-actions v-if="updating" class="pa-8">
			<v-btn
				color="accent"
				:loading="loading"
				class="shadow px-8"
				@click="updateAddress"
				>{{ hasAddress ? "Update" : "Save" }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'Address',
	data() {
		return {

			// Booleans
			loading: false,
			updating: false,

			// Objects
			address: {
				street: '',
				city: '',
				state: '',
				zip: ''
			}
		}
	},
	created() {
		if (this.$address)
			this.address = this.$address
	},
	computed: {
		...mapGetters(
			'Auth', [
			'$user',
			'$address'
		]),
		hasAddress() {
			return this.$address && this.$address.constructor === Object &&
				Object.keys(this.$address).length !== 0
		},
		textField() {
			return {
				dense: true,
				filled: true,
				'hide-details': true
			}
		}
	},
	methods: {
		...mapActions('Auth', ['updateMe']),
		async updateAddress() {
			this.loading = true
			let res = await this.updateMe({
				id: this.$user.id, data: {
					address: this.address
				}
			})
			if (!res.error) this.updating = false
			this.loading = false
		}
	}
}
</script>

<style lang='scss' scoped>
	.address {
	}
</style>