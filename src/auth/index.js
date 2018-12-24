import axios from 'axios'

export default {

  login (params) {
    axios.post(window.serverUrl + 'authenticate', params)
      .then(function (response) {
        console.log(response)
        sessionStorage.setItem('token', response.data.token)
        sessionStorage.setItem('first_name', response.data.user.forename)
        sessionStorage.setItem('surname', response.data.user.surname)
        sessionStorage.setItem('username', response.data.user.username)
        sessionStorage.setItem('playerId', response.data.user.player_id)
        sessionStorage.setItem('loggedIn', 1)
        window.$toasted.show('Welcome back, &nbsp;<b>' + response.data.user.forename + '</b>.', {
          icon: {
            name: 'tag_faces'
          }
        })
        window.$router.push({name: 'dashboard'})
        sessionStorage.setItem('userRaw', JSON.stringify(response.data.user))
        sessionStorage.setItem('driverRaw', JSON.stringify(response.data.user.driver))
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Authentication Failed</b>: Invalid Credentials.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  },
  newUser (params) {
    axios.post(window.serverUrl + 'newUser', params)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.response.data.error)
        window.$toasted.show('<b>Failed to create new user</b>: ' + error.response.data.reason)
      })
  }
}
