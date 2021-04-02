<template>
	<v-carousel hide-delimiters cycle class="hero__carousel">
		<v-carousel-item
			:key="i"
			:src="item"
			v-for="(item, i) in items"
		></v-carousel-item>            
	</v-carousel>
</template>

<script>
export default {
	name: 'HeroCarousel',
	data: () => ({
		items: [
			'https://images.unsplash.com/photo-1534514063674-f9c0ae60f926?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80',
			'https://images.unsplash.com/photo-1599614518289-d1beae40d7b6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1080&q=80',
			'https://images.unsplash.com/photo-1526404801122-40fc40fca08f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80',
		]
	}),
}
</script>

<style lang='scss' scoped>
	.hero__carousel {
	}
</style>