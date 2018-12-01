<template>
<div>
  <div>{{ msg }}</div>
  <son></son>
</div>
</template>
<script>
import son from './son.vue'
export default {
  data(){
    return {
      msg : 'hello wrold'
    }
  },
  components:{
    son
  }
}
</script>
<style></style>
