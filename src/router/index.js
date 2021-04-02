import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import Home from '../views/Home.vue'

// Layouts
import DefaultLayout from '../layouts/DefaultLayout'
import ProfileLayout from '../layouts/ProfileLayout'

// Importer
const _import = name => {
	return () => import(`../views/${name}.vue`)
}

// Using router
Vue.use(VueRouter)

// Router Instance
export default new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: DefaultLayout,
			children: [
				{
					path: '',
					name: 'Home',
					component: Home
				},
				{
					path: 'checkout',
					name: 'Checkout',
					component: _import('Checkout')
				},
				{
					path: 'products',
					name: 'Products',
					component: _import('Products')
				},
				{
					props: true,
					name: 'Product',
					path: 'products/:slag',
					component: _import('Product')
				},
				{
					path: '/profile',
					component: ProfileLayout,
					children: [
						{
							path: '',
							name: 'Basic',
							component: _import('Profile/Basic')
						},
						{
							path: 'security',
							name: 'Security',
							component: _import('Profile/Security')
						},
						{
							path: 'address',
							name: 'Address',
							component: _import('Profile/Address')
						}
					]
				}
			]
		},
		{
			path: '/signin',
			name: 'Signin',
			component: _import('Signin')
		},
		{
			path: '/signup',
			name: 'Signup',
			component: _import('Signup')
		},
		{
			path: '*',
			name: 'NotFound',
			component: _import('NotFound')
		}
	]
})