<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <div class="card-header"><h5>Create new city</h5></div>
            <div class="card-body">
                <div class="form-group">
                  <label for="cityName">City Name</label>
                  <select v-model="selectedCountry" class="form-control">
                    <option v-for="country in countryOptions" :key="'options-' + country.id" :value="country.id">{{country.name}}</option>
                  </select>

                  <label for="cityName">City Name</label>
                  <input v-model="cityName" name="cityName" class="form-control" placeholder="City Name">
                </div>
                <button :disabled="cityName.length < 4" @click="createCity()" class="btn btn-primary btn-block">Save City</button>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="card">
            <div class="card-header"><h5>Existing cities</h5></div>
            <div class="card-body cargos">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>City Name</th>
                    <th>Country</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="city in cities" :key="city.id">
                    <td>{{city.name}}</td>
                    <td>{{city.country.name}} ({{city.country.iso_code}})</td>
                    <td>{{city.created_at}}</td>
                    <td><button class="btn btn-sm btn-primary">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'cities',
  data () {
    return {
      cityName: '',
      cities: [],
      countryOptions: {},
      countries: [],
      selectedCountry: ''
    }
  },
  watch: {
    countries (val) {
      if (val.length) {
        var output = {}
        for (var i in val) {
          output[i] = val[i]
        }
        this.countryOptions = output
      }
    }
  },
  methods: {
    createCity () {
      var params = {
        name: this.cityName,
        country_id: this.selectedCountry
      }
      api.createCity(params, this)
    }
  },
  beforeMount () {
    api.getAllCities(this)
    api.getAllCountries(this)
  }
}
</script>

<style scoped>
.card-body {
  height: 70vh;
  overflow-y: auto
}
</style>
