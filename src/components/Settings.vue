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
        token: '',
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
html {
  background-color: #65c1c1
}
#login * {
  margin-left: 12.5%;
  width: 75%;
  text-align: center
}
.hidden {
  display: none;
}
.card-header .btn {
  float: right
}
</style>
