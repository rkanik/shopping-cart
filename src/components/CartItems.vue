<template>
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
				<v-btn icon small class="mt-2" @click="removeFromCart(item.id)">
					<feather type="trash" class="red--text" size="18"></feather>
				</v-btn>
			</v-list-item>
		</template>
	</v-list>
</template>

<script>
export default {
	name: 'CartItems',
	props: {
		cart: Array
	}
}
</script>
