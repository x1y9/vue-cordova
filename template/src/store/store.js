import Vue from 'vue'
import Vuex from 'vuex'
import * as util from '../components/util'
import _defaultsDeep from 'lodash/defaultsDeep'
import prjConfig from '../../config/index'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    persist: _defaultsDeep(util.loadConfig(), {      
    }),
    global: {
      version: '1.0.0'
    }
  },

  mutations: {
    initStore (state, platform) {
      // publicPath可在访问statics时，将relate url转换为绝对url，
      // kaixin的assetsServlet对于目录不会重定向到加'/',相对url可能在加'/'和不加'/'时不一致
      state.global.publicPath = (platform.is.cordova || process.env.NODE_ENV === 'development') ? '' : prjConfig.build.publicPath
    },

    setAppVersion (state, version) {
      state.global.version = version
    },

    persistStore (state) {
      util.saveConfig(state.persist)
    },

    importStore (state, data) {
      state.persist = data
      util.saveConfig(state.persist)
    }
  }

})
