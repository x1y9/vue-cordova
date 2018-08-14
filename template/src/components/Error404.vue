<template>
  <div>
    <h2>
      404
    </h2>
    <div>        
      <p>Oops. Nothing here...</p>
      <p>
        <q-btn v-if="canGoBack" @click="goBack">Go back</q-btn>
        <q-btn @click="$router.replace('/')">Go home</q-btn>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="stylus">
</style>
