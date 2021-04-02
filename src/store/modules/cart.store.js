const initialState = {
	drawer: false,
	cart: []
}

const state = { ...initialState }

const getters = {
	$cart: ({ cart }) => cart,
	$productInCart: ({ cart }) => cart.length ? cart.length : null,
	$cartDrawer: ({ drawer }) => drawer,
}

const mutations = {
	setCartState: (state, payload) => {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
		console.log('setCartState', payload, state)
	},
	resetCartState: state => {
		const newState = { ...initialState }
		Object
			.keys(newState)
			.forEach(key =>
				state[key] = newState[key]
			)
	},
	addToCart: (state, id) => {
		let exist = state.cart.some(c => c.id === id)
		if (!exist) {
			state.cart.push({ id, quantity: 1 })
			state.drawer = true
		}
	},
	removeFromCart: (state, id) => {
		state.cart = state.cart.filter(c => c.id !== id)
	},
	changeQuantity: (state, { id, type }) => {
		console.log(id, type)
		state.cart = state.cart.map(pro => {
			if (pro.id !== id) return pro
			else return ({
				...pro,
				quantity: type === 'up'
					? pro.quantity + 1
					: pro.quantity > 1
						? pro.quantity - 1
						: pro.quantity
			})
		})
	}
}

const actions = {

}

export default {
	namespaced: true, actions,
	state, getters, mutations
}
