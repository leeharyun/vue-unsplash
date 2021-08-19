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
  name: 'Index',
  components: {
    Header,
    ImageList
  }
}
</script>