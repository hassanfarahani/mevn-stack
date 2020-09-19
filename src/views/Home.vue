<template>
    <div id="custom-home">
      <HelloWorld />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState(['apiUrl'])
  },
  created() {
    fetch(`${this.apiUrl}/user`)
      .then(res => res.json())
      .then(res => console.log(res))
  },
  components: {
    HelloWorld
  }
}
</script>
