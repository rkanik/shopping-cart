<template>
	<v-app>
		<Header />
		<CartDrawer/>
		<v-main class="bg-pri">
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
export default {
	name: 'default-layout',
	components: {
		Header,
		CartDrawer
	}

}
</script>