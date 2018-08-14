<template>
  <router-view v-if="inited"></router-view>
</template>

<script>

export default {
  data () {
    return {
      inited: true
    }
  },
  mounted () {
    // 初始化store
    this.$store.commit('initStore')

    if (this.$platform.is.cordova) {
      cordova.getAppVersion.getVersionNumber((version) => {
        this.$store.commit('setAppVersion', version)
      })

      // android 4.4 没有screen.orientation
      if (screen.orientation) {
        screen.orientation.lock('portrait')
      }

      if (cordova.platformId === 'android') {
        // .hide()
        window.StatusBar.backgroundColorByHexString('#66bb6a')
      }
    }
    this.inited = true
  },

  methods: {
  }
}
</script>

<style lang="stylus">
  /* 全局css应该放在这里，防止页面在refresh时不被加载 */
  *:not(input):not(textarea) {
    -webkit-user-select: none; /* disable selection/Copy of UIWebView */
    -webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
  }     
</style>
