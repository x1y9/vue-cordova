<template>
  <!-- 如果同时使用enter和leave，会导致两个page上下布局，除非给page加fixed layout，简单一点就只定义enter，不需要动画就注释enter -->
  <transition @enter="pageAnimate" :css="false">
    <router-view v-if="inited"></router-view>
  </transition>
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
    this.$store.commit('initStore', this.$platform)

    if (this.$platform.is.cordova) {
      cordova.getAppVersion.getVersionNumber((version) => {
        this.$store.commit('setAppVersion', version)
      })

      // android 4.4 没有screen.orientation
      this.$invoke(screen, 'orientation.lock', 'portrait')
      window.StatusBar.overlaysWebView(false)
      // window.StatusBar.styleDefault()
    }
    this.inited = true
  },

  methods: {
    pageAnimate: function (el, done) {
      this.$anime({targets: el, translateY: [50, 0], easing: 'easeOutExpo', complete: done})
    }
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
