<template>
  <div class="container-fluid">
    <div class="row">

      <div class="col-6">
        <div class="">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="email">Email Address</label>
                <input v-model="loginCred.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model="loginCred.password" type="password" class="form-control" id="password" placeholder="Password">
              </div>
              <div class="form-group form-check">
                <input v-model="loginCred.rememberMe" type="checkbox" class="form-check-input" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember Me</label>
              </div>
              <button v-on:click.prevent="login()" :disabled="!(loginCred.email.length > 0 && loginCred.password.length > 0)" type="button" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="">
          <div class="card-header">New Account</div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input v-model="newCred.firstName" type="text" class="form-control" id="firstName" placeholder="First Name">
                <label for="surname">Surname *</label>
                <input v-model="newCred.surName" type="text" class="form-control" id="surname" placeholder="Surname">
              </div>
              <div class="form-group">
                <label for="email">Driver Name *</label>
                <input v-model="newCred.userName" type="text" class="form-control" id="username" placeholder="Driver Name">
                <label for="email">Player ID *</label>
                <input v-model="newCred.playerId" type="text" class="form-control" id="playerId" aria-describedby="playerIdHelp" placeholder="Enter Player ID">
                <small id="playerIdHelp" class="form-text text-muted">This can either be your SteamID or your TruckersMP ID.</small>
              </div>
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input v-model="newCred.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                <label for="password">Password</label>
                <input v-model="newCred.password" type="password" class="form-control" id="password" placeholder="Password">
                <label for="passwordConfirm">Confirm Password</label>
                <input v-model="newCred.passwordConfirm" type="password" class="form-control" id="passwordConfirm" placeholder="Confirm Password">
              </div>
              <button :disabled="validNewUser" v-on:click.prevent="newUser()" type="button" class="btn btn-primary">Create Account</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import auth from '../auth'
export default {
  name: 'home-page',
  data () {
    return {
      loginCred: {
        email: '',
        password: '',
        rememberMe: false
      },
      newCred: {
        email: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        surName: '',
        userName: '',
        playerId: ''
      },
      token: ''
    }
  },
  computed: {
    validNewUser () {
      var newCred = this.newCred
      if (newCred.email && newCred.firstName && newCred.surName && newCred.userName && newCred.password && newCred.passwordConfirm && newCred.playerId) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    login () {
      var params = {
        email: this.loginCred.email,
        password: this.loginCred.password,
        rememberMe: this.loginCred.rememberMe
      }
      auth.login(params)
    },
    newUser () {
      if (this.newCred.password === this.newCred.passwordConfirm) {
        var params = {
          email: this.newCred.email,
          password: this.newCred.password,
          passwordConfirm: this.newCred.passwordConfirm,
          firstName: this.newCred.firstName,
          surName: this.newCred.surName,
          userName: this.newCred.userName,
          playerId: this.newCred.playerId
        }
        auth.newUser(params)
      } else {
        window.$toasted.show('<b>Failed to create new user</b>: Passwords do not match.', {
          icon: {
            name: 'error_outline'
          }
        })
      }
    }
  },
  mounted () {
    this.token = localStorage.getItem('token')
  }
}
</script>

<style>
.menuBtn {
  display: none
}
</style>
