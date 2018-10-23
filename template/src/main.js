import Vue from 'vue'

import router from './router/router'
import store from './store/store' // 小写是因为构造Vue的时候，省略了key，否则需要写 router: Router

import VueI18n from 'vue-i18n'
import messages from './assets/messages'
Vue.use(VueI18n)

// import Axios from 'axios'
// Vue.prototype.$http = Axios.create({
// baseURL: 'http://xxx.yyy.zzz/api',
// headers: {'token': '03F768854232E3713AAF3B5D302956'}
// })

// 安装一些工具类
Vue.prototype.$invoke = require('lodash/invoke')
Vue.prototype.$set = require('lodash/set')
Vue.prototype.$get = require('lodash/get')
Vue.prototype.$merge = require('lodash/merge')
Vue.prototype.$util = require('./components/util')
Vue.prototype.$platform = require('./components/platform)

// icon：material很多图标不能在android4.4显示，fontawesome比ionicons大些
// animejs比animate.css兼容性更好
import animejs from 'animejs'
Vue.directive('anime', {
  bind (el, binding) {
    const opts = Object.assign({}, binding.value, { targets: el })
    animejs(opts)
  }
})
Vue.prototype.$anime = animejs
import App from './App'
Vue.prototype.$platform.bootup(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    /* 全局翻译 */
    i18n: {
      fallbackLocale: 'en',
      locale: navigator.language.split('-')[0],
      messages
    },
    router,
    store,
    /* runtime-only Vue 不支持直接嵌入模板，所以使用render函数 */
    render: h => h(App)
  })
})
