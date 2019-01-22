import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import appSyncConfig from './aws-exports'
import Amplify from 'aws-amplify'

Vue.config.productionTip = false

Amplify.configure(appSyncConfig)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
