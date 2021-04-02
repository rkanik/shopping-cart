import Vue from 'vue';
import Vuex from 'vuex';
import { VUEX_KEY } from '../consts'

// VPersistence state
import persisted from 'vuex-persistedstate';

// Modules
import Auth from './modules/auth.store';
import Product from './modules/product.store';
import Cart from './modules/cart.store';

// Default state
import {
	state,
	getters,
	mutations
} from './global';

Vue.use(Vuex);

export default new Vuex.Store({
	state,
	getters,
	mutations,
	modules: {
		Auth,
		Cart,
		Product,
	},
	plugins: [
		persisted({
			key: VUEX_KEY,
			paths: [
				'theme', 'drawer',
				// Modules
				'Cart.cart', 'Auth.user.address'
			]
		})
	],
});
