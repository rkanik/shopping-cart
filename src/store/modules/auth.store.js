import * as auth from '../../api/auth'
import api from '../../api/api'

const initialState = {
	loading: false,
	isAuth: false,
	user: {
		address: {}
	},
}

const state = { ...initialState }

const getters = {
	$user: ({ user }) => user,
	$isAuth: ({ isAuth }) => isAuth,
	$loading: ({ loading }) => loading,
	$address: ({ user }) => user.address
}

const mutations = {
	setAuthState: (state, payload) => {
		Object.keys(payload).forEach((key) => {
			state[key] = payload[key];
		});
		console.log('setAuthState', payload, state)
	},
	resetAuthState: state => {
		const newState = { ...initialState }
		Object.keys(newState).forEach(key => state[key] = newState[key])
	}
}

const actions = {
	ensureAuth: async ({ commit, dispatch, state }, done) => {
		commit('setAuthState', { loading: true })
		auth.onStateChange(async user => {
			if (user) {
				commit('setAuthState', {
					isAuth: true,
					user: { ...user, ...state.user }
				})
				await dispatch('getMe')
			}
			else commit('resetAuthState')
			commit('setAuthState', { loading: false })
			done && done(user)
		})
	},
	signin: async ({ commit, dispatch }, payload) => {
		let res = await auth.signin(payload)
		if (!res.error) {
			commit('setAuthState', {
				isAuth: true, user: res.data
			})
			await dispatch('getMe')
		}
		return res
	},
	signout: ({ commit }) => {
		auth.signout().then(({ error }) => {
			!error && commit('resetAuthState')
		})
	},
	getMe: async ({ commit, state: { user } }) => {
		let res = await api.getProfile(user.id)
		if (!res.error) {
			commit('setAuthState', {
				user: {
					...user,
					...res.data
				}
			})
		}
		return res
	},
	updateMe: async ({ commit, state: { user } }, payload) => {
		let res = await api.updateMe(payload)
		if (!res.error) {
			commit('setAuthState', {
				user: {
					...user,
					...payload.data
				}
			})
		}
		return res
	}
}

export default {
	namespaced: true, actions,
	state, getters, mutations
}
