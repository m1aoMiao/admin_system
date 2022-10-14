// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import service from './utils/service.js'

// Vue.use(Vant);

Vue.config.productionTip = false
Vue.prototype.$axios = service

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
