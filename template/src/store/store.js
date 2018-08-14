import Vue from 'vue'
import Vuex from 'vuex'
import { jsonParse } from '../components/util'
import platform from '../components/platform'
import prjConfig from '../../config/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 使用唯一的storage key可以防止同域多应用的冲突
    config: jsonParse(localStorage.getItem('{{ name }}')) || {},
    project: { version: '1.0.0' }
  },

  mutations: {
    initStore (state) {
      // publicPath可在访问statics时，将relate url转换为绝对url，
      // kaixin的assetsServlet对于目录不会重定向到加'/',相对url可能在加'/'和不加'/'时不一致
      state.project.publicPath = (platform.is.cordova || process.env.NODE_ENV === 'development') ? '' : prjConfig.build.publicPath
    },

    setAppVersion (state, version) {
      state.project.version = version
    }
  }

})
