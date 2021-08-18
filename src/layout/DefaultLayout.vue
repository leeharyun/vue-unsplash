<template>
  <Header />
  <div class="container">
      <image-list />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import ImageList from '@/components/ImageList.vue'

export default {
  components: {
    Header,
    ImageList
  }
}
</script>
<style lang="scss">
  @import "@/assets/scss/index.scss";
</style>