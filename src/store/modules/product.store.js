const initialState = {
	products: [
		{
			id: '2',
			slag: 'honor_watch_gs_pro_kan_b19s_silicone_strap_black',
			name: 'Honor Watch GS PRO KAN-B19S Coal Black',
			thumbnail: 'https://images.unsplash.com/photo-1539114658890-4222fe247c05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
			images: [
				'https://images.unsplash.com/photo-1539114658890-4222fe247c05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
				'https://images.unsplash.com/flagged/photo-1554692938-b59814c27db8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
				'https://images.unsplash.com/photo-1495704907664-81f74a7efd9b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
				'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1402&q=80',
			],
			oPrice: 300,
			sPrice: 265,
			currency: 'CAD'
		},
		{
			id: '1',
			slag: 'apple-iphone-11',
			name: 'Apple iPhone 11 128GB Purple (New Trim)',
			thumbnail: 'https://images.unsplash.com/photo-1574755607544-100cfff001d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1453&q=80',
			images: [
				'https://images.unsplash.com/photo-1574755607544-100cfff001d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1453&q=80',
				'https://images.unsplash.com/photo-1584963724407-e05f2ea81df2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
				'https://images.unsplash.com/photo-1574763793553-b710f022aca5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1495&q=80',
				'https://images.unsplash.com/photo-1439219970881-3727d2e3402a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
			],
			oPrice: 1038,
			sPrice: 1038,
			currency: 'CAD'
		},
		{
			id: '3',
			slag: 'plantronics_backbeat_pro_5100_chernye',
			name: 'Wireless Headphones Plantronics BackBeat PRO 5100 Black',
			thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
			images: [
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
				'https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
				'https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
				'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
			],
			oPrice: 102,
			sPrice: 102,
			currency: 'CAD'
		},
		{
			id: '4',
			slag: 'huawei_mate_40_pro_8_256gb_noh_nx9_misticheskiy_serebristyy',
			name: 'Huawei Mate 40 Pro 8/256GB mystical silver',
			thumbnail: 'https://images.unsplash.com/photo-1546027658-7aa750153465?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
			images: [
				'https://images.unsplash.com/photo-1546027658-7aa750153465?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
				'https://images.unsplash.com/photo-1591530840052-dc5b98c7fb3a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=942&q=80',
				'https://images.unsplash.com/photo-1604474834292-8f0276a2065f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
				'https://images.unsplash.com/photo-1559914004-42d933f41699?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
			],
			oPrice: 1572,
			sPrice: 1572,
			currency: 'CAD'
		}
	]
}

const state = { ...initialState }

const getters = {
	$products: ({ products }) => products
}

const mutations = {
	setProState: (state, payload) => {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
		console.log('setProState', payload, state)
	},
	resetProState: state => {
		const newState = { ...initialState }
		Object
			.keys(newState)
			.forEach(key =>
				state[key] = newState[key]
			)
	}
}

const actions = {

}

export default {
	namespaced: true, actions,
	state, getters, mutations
}
