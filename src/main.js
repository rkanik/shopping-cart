import Vue from 'vue'
import icons from './icons'
import store from './store'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

// Stylesheet
import './assets/scss/style.scss'

// PWA
import './registerServiceWorker'

// Libs
import VueFeather from 'vue-feather';

// Components
import Container from './components/utils/Container.vue'
import FlexBox from './components/utils/FlexBox.vue'

// Disabling production tip
Vue.config.productionTip = false

// Using icons
Vue.prototype.$icons = icons;

// Use
Vue.use(VueFeather);

// Global components
Vue.component(Container.name, Container)
Vue.component(FlexBox.name, FlexBox)

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
