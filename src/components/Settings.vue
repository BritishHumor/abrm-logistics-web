<template>
  <div class="container interfaces">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">Application Information</div>
          <div class="card-body">App Name: <span class="text-muted">this.app.getName()}}</span></div>
          <div class="card-body">App Locale: <span class="text-muted">this.app.getLocale()}}</span></div>
          <div class="card-body">App Version: <span class="text-muted">this.app.getVersion()}}</span></div>
          <div class="card-body">App Metrics: <span class="text-muted">N/A</span></div>
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <!-- <div class="col-12" style="text-align: center">
        <h1>This page is a placeholder</h1>
      </div> -->
      <div class="col-6">
        <div class="card">
          <div class="card-header">Reset App</div>
          <div class="card-body">Are you sure you want to reset the application?<br>This will clear all local and session storage.</div>
          <div class="card-footer">
            <button class="btn btn-danger btn-block">Reset App</button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="card">
          <div class="card-body"><span class="text-muted">Other options to be added in the future...</span></div>
        </div>
      </div>
    </div>
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
