<template lang="html">
  <div class="">
    <h1>{{ msg }}</h1>
    <router-link to="/login">login</router-link>
    <router-link to="/register">register</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      msg:'App路由模块'
    }
  },
}
</script>

<style lang="css">
</style>
