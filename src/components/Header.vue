<template>
	<header class="header shadow" style="z-index: 1">
		<Container>
			<FlexBox justify-between>
				<router-link to="/">
					<FlexBox align-center class="header__logo">
						<v-img src="../assets/logo.png" width="24"></v-img>
						<div class="ml-3 text-h5 txt-pri">Brand Name</div>
					</FlexBox>
				</router-link>
				<FlexBox align-center class="txt-pri">
					<v-menu
						offset-y
						rounded="b"
						:close-on-content-click="false"
						transition="slide-y-transition"
					>
						<template v-slot:activator="{ attrs, on }">
							<v-btn v-bind="attrs" v-on="on" icon>
								<feather size="20" type="user"></feather>
							</v-btn>
						</template>
						<AccountDropdown />
					</v-menu>

					<v-badge
						overlap
						bordered
						color="error"
						v-if="$productInCart"
						:content="$productInCart"
					>
						<v-btn @click="openCartDrawer" icon class="ml-1">
							<feather size="20" type="shopping-cart"></feather>
						</v-btn>
					</v-badge>
					<v-btn @click="openCartDrawer" v-else icon class="ml-1">
						<feather size="20" type="shopping-cart"></feather>
					</v-btn>
				</FlexBox>
			</FlexBox>
		</Container>
	</header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import AccountDropdown from '@/components/AccountDropdown'
export default {
	name: 'Header',
	components: {
		AccountDropdown,
	},
	computed: {
		...mapGetters('Cart', ['$productInCart'])
	},
	methods: {
		...mapMutations('Cart', ['setCartState']),
		openCartDrawer() {
			this.setCartState({ drawer: true })
		}
	}
}
</script>

<style lang='scss' scoped>
	.header {
	}
</style>