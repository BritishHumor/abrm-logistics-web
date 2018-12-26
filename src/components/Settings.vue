<template>
  <div class="container-fluid">

  </div>
</template>

<script>
// import api from '../api'
export default {
  name: 'settings',
  data () {
    return {
      token: ''
    }
  },
  methods: {
    goToPage (url) {
      window.$router.push({ path: url })
    }
  },
  mounted () {
    this.token = sessionStorage.getItem('token')
  }
}
</script>

<style>

</style>
