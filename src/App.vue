<template>
	<PreLoader v-if="$loading" />
	<router-view v-else />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PreLoader from '@/components/PreLoader'
export default {
	name: 'App',
	components: {
		PreLoader
	},
	created() {
		this.ensureAuth()
	},
	computed: {
		...mapGetters('Auth', ['$loading'])
	},
	methods: {
		...mapActions('Auth', ['ensureAuth'])
	}

};
</script>
