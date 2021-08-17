<template>
  <HelloWorld
    :msg="message"/>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>
