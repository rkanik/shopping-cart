<template>
	<div class="profile">
		<Container cols="12" md="6" mx-auto v-if="!$isAuth">
			<v-card flat class="bg-trans px-5 py-10">
				<div class="px-10">
					<v-img src="../assets/images/sign_in_2.svg" />
				</div>
				<div class="body-2 text-center pa-5">
					You are not signed in. Please
					<router-link to="/signin">Signin</router-link> here.
				</div>
			</v-card>
		</Container>
		<v-container v-else>
			<v-row>
				<v-col cols="12" md="4">
					<v-list dense shaped rounded class="bg-trans">
						<v-list-item
							link
							:to="path"
							:key="title"
							v-for="{ title, path } in items"
						>
							<v-list-item-content>
								<v-list-item-title>{{ title }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col cols="12" md="8">
					<router-view />
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'Profile',
	data() {
		return {
			items: [
				{ title: 'Basic', path: '/profile' },
				{ title: 'Security', path: '/profile/security' },
				{ title: 'Address', path: '/profile/address' },
			],
		}
	},
	created() {
		//this.getMe()
	},
	computed: {
		...mapGetters(
			'Auth', [
			'$isAuth'
		])
	},
	methods: {
		...mapActions(
			'Auth', [
			'getMe'
		])
	}
}
</script>