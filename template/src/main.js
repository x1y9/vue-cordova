import Vue from 'vue'

import router from './router/router'
import store from './store/store'

import VueI18n from 'vue-i18n'
import messages from './assets/messages'
Vue.use(VueI18n)

// import Axios from 'axios'
// Vue.prototype.$http = Axios.create({
// baseURL: 'http://xxx.yyy.zzz/api',
// headers: {'token': '03F768854232E3713AAF3B5D302956'}
// })

// 安装一些工具类
Vue.prototype._invoke = require('lodash/invoke')
Vue.prototype._set = require('lodash/set')
Vue.prototype._get = require('lodash/get')
Vue.prototype._merge = require('lodash/merge')
Vue.prototype.$util = require('./components/util')

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

// 开始bootup，platform有default export，用require会导入一个default属性，所以用import
import App from './App'
import platform from './components/platform'
Vue.prototype.$platform = platform
platform.bootup(() => {
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
