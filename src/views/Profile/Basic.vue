<template>
	<v-card flat class="pa-8 bg-sec shadow">
		<div class="mb-8">
			<v-avatar size="150" class="user__thumbnail">
				<v-img v-if="$user.thumbnail" :src="$user.thumbnail"></v-img>
				<div v-else>{{ $user.name[0] }}</div>
			</v-avatar>
		</div>

		<v-subheader class="pl-0" style="height: 18px">Name</v-subheader>
		<div class="body-1 mb-3">{{ $user.name }}</div>

		<v-subheader class="pl-0" style="height: 18px">Email</v-subheader>
		<div class="body-1 mb-3">{{ $user.email }}</div>

		<v-subheader class="pl-0" style="height: 18px">Phone</v-subheader>
		<div v-if="$user.phone" class="body-1 mb-3">{{ $user.phone }}</div>
		<div v-else class="body-1 mb-3">None</div>

	</v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
	name: 'Basic',
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
</style>