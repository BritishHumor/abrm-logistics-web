import axios from 'axios'
// const telemetry = require('trucksim-telemetry')

export default {
  token: sessionStorage.getItem('token'),

  getTelemetryData (context) {
    axios.get('http://localhost/api-abrm-logistics/public/api/cors?url=http://127.0.0.1:25555/api/ets2/telemetry').then((data) => {
      context.telemetryInfo = data.data
    })
  },

  searchForProfile: function (id, context) {
    axios.get('https://api.truckersmp.com/v2/player/' + id).then((data) => {
      if (data) {
        if (data.data.error === false) {
          var curData = data.data.response
          var output = {
            'avatar': curData.avatar,
            'joinDate': curData.joinDate,
            'name': curData.name
          }
          context.queryPlayerInfo = output
          return output
        }
      }
    }).catch((err) => {
      if (err) throw err
    })
  },

  getProfile: function (id, context) {
    axios.get('https://api.truckersmp.com/v2/player/' + id).then((data) => {
      if (data) {
        if (data.data.error === false) {
          var curData = data.data.response
          var output = {
            'avatar': curData.avatar,
            'joinDate': curData.joinDate,
            'name': curData.name
          }
          context.playerInfo = output
          return output
        }
      }
    }).catch((err) => {
      if (err) throw err
    })
  },

  getDriverInfo (id, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'drivers/' + id, { headers: headers }).then((data) => {
      if (data.data) {
        context.driverInfo = data.data
      }
    }).catch((err) => {
      if (err) throw err
    })
  },

  exportDeliveryPdf (id, context) {
    var pdfWin = window.open()
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    var route = window.serverUrl + 'export/delivery/' + id
    axios({
      method: 'get',
      url: route,
      responseType: 'arraybuffer',
      headers: headers
    }).then((data) => {
      let blob = new Blob([data.data], { type: 'application/pdf' })
      var fileURL = URL.createObjectURL(blob)
      pdfWin.location(fileURL)
    })
  },

  getUsersDeliveries (id, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'deliveries', {headers: headers}).then((data) => {
      var output = []
      console.log(data.data)
      for (var i in data.data) {
        if (data.data[i].driver.id === id) {
          output.push(data.data[i])
        }
      }
      console.log(output)
      context.pastDeliveries = output
    })
  },

  getAllDeliveries (context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'deliveries', { headers: headers }).then((data) => {
      context.deliveries = data.data
    })
  },

  createDelivery (params, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.post(window.serverUrl + 'deliveries', params, { headers: headers }).then((data) => {
      context.resetForm()
      this.getAllDeliveries(context)
    })
  },

  updateDelivery (params, id, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.put(window.serverUrl + 'deliveries/' + id, params, { headers: headers }).then((data) => {
      context.resetForm()
      this.getAllDeliveries(context)
    })
  },

  getAllCargos (context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'cargos', { headers: headers }).then((data) => {
      context.cargos = data.data
    })
  },

  createCargo (params, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.post(window.serverUrl + 'cargos', params, { headers: headers }).then((data) => {
      context.cargoName = ''
      this.getAllCargos(context)
    })
  },

  getAllCompanies (context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'companies', { headers: headers }).then((data) => {
      context.companies = data.data
    })
  },

  getAllCountries (context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'countries', { headers: headers }).then((data) => {
      context.countries = data.data
    })
  },

  getAllCities (context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'cities', { headers: headers }).then((data) => {
      context.cities = data.data
    })
  },

  createCountry (params, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.post(window.serverUrl + 'countries', params, { headers: headers }).then((data) => {
      context.countryName = ''
      context.countryIso = ''
      this.getAllCountries(context)
    })
  },

  createCompany (params, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.post(window.serverUrl + 'companies', params, { headers: headers }).then((data) => {
      context.companyName = ''
      context.selectedCountry = ''
      context.selectedCity = ''
      this.getAllCompanies(context)
    })
  },

  createCity (params, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.post(window.serverUrl + 'cities', params, { headers: headers }).then((data) => {
      context.cityName = ''
      context.selectedCountry = ''
      this.getAllCities(context)
    })
  },

  getRoles (context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'roles', { headers: headers })
      .then(function (response) {
        // sessionStorage.setItem('token', response.data.token)
        context.roles = response.data
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Failed</b>: Unable to get Roles.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  },
  getInterfaces (context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'interfaces', { headers: headers })
      .then(function (response) {
        // sessionStorage.setItem('token', response.data.token)
        context.machInts = response.data
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Failed</b>: Unable to get Interfaces.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  },
  getSingleInterface (id, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'interfaces/' + id, { headers: headers })
      .then(function (response) {
        // sessionStorage.setItem('token', response.data.token)
        context.machInts = response.data
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Failed</b>: Unable to get Interfaces.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  },
  updateSingleInterface (params, id, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.put(window.serverUrl + 'interfaces/' + id, params, { headers: headers })
      .then(function (response) {
        // sessionStorage.setItem('token', response.data.token)
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Failed</b>: Unable to get Interfaces.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  },
  deleteSingleInterface (id, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.delete(window.serverUrl + 'interfaces/' + id, { headers: headers })
      .then(function (response) {
        // sessionStorage.setItem('token', response.data.token)
        window.$router.go(-1)
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Failed</b>: Unable to get Interfaces.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  },
  getRoleOptions (interfaceRoles, allRoles) {
    var outputRoles = []
    var rolesToCheck = ''
    for (var intRole in interfaceRoles) {
      rolesToCheck = rolesToCheck + interfaceRoles[intRole].id
    }
    for (var role in allRoles) {
      allRoles[role].checked = false
      if (rolesToCheck.includes(allRoles[role].id)) {
        allRoles[role].checked = true
      }
      outputRoles.push(allRoles[role])
    }
    return outputRoles
  },
  getSingleRole (id, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.get(window.serverUrl + 'roles/' + id, { headers: headers })
      .then(function (response) {
        // sessionStorage.setItem('token', response.data.token)
        context.roles = response.data
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Failed</b>: Unable to get Role.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  },
  deleteSingleRole (id, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.delete(window.serverUrl + 'roles/' + id, { headers: headers })
      .then(function (response) {
        // sessionStorage.setItem('token', response.data.token)
        window.$router.go(-1)
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Failed</b>: Unable to get Interfaces.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  },
  createRole (params, context) {
    var headers = {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    }
    axios.post(window.serverUrl + 'roles', params, { headers: headers })
      .then(function (response) {
        // sessionStorage.setItem('token', response.data.token)
        window.$router.go(-1)
      })
      .catch(function (error) {
        console.log(error)
        window.$toasted.show('<b>Failed</b>: Unable to get Interfaces.', {
          icon: {
            name: 'error_outline'
          }
        })
      })
  }
}
