<template>
  <div id="app">
    <Navbar />
    <div id="app-container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
    ...mapActions(['authenticate'])
  },
  created() {
    this.authenticate()
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>

</style>
