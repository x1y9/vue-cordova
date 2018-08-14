import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',

  // 控制回退时滚动条位置
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    // 这里使用import的方式是动态加载，如果在文件头import就是静态加载
    { path: '/', component: () => import('app/home') },

    { path: '*', component: () => import('components/Error404') }
  ]
})
