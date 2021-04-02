<template>
	<v-card v-if="$isAuth" width="300">
		<v-btn icon small color="error" class="signout" @click="signout">
			<feather size="14" type="log-out" />
		</v-btn>
		<div class="text-center pt-16">
			<v-avatar size="80" class="user__thumbnail">
				<v-img v-if="$user.thumbnail" :src="$user.thumbnail"></v-img>
				<div v-else>{{ $user.name[0] }}</div>
			</v-avatar>
		</div>
		<v-card-title class="d-block text-center">{{ $user.name }}</v-card-title>
		<v-card-subtitle class="d-block text-center">{{
			$user.email
		}}</v-card-subtitle>
		<v-card-actions class="pb-16 justify-center">
			<v-btn small outlined rounded color="accent" class="px-10" to="/profile"
				>Manage Account</v-btn
			>
		</v-card-actions>
	</v-card>
	<v-card class="px-5 py-10" width="300" v-else>
		<div class="px-10">
			<v-img src="../assets/images/sign_in_2.svg" />
		</div>
		<div class="body-2 text-center pa-5">
			You are not signed in. Please
			<router-link to="/signin">Signin</router-link> here.
		</div>
	</v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
	name: 'AccountDropdown',
	computed: {
		...mapGetters('Auth', ['$isAuth', '$user'])
	},
	methods: {
		...mapActions('Auth', ['signout'])
	}
}
</script>
<style lang="scss" scoped>
	.user {
		&__thumbnail {
			border-top-left-radius: 50% im !important;
			border-top-right-radius: 50% im !important;
		}
	}
	.signout {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>