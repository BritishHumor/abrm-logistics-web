<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <div class="card-header"><h5>Create new company</h5></div>
            <div class="card-body">
                <div class="form-group">
                  <label for="companyName">Country</label>
                  <select v-model="selectedCountry" class="form-control">
                    <option :value="country.id" v-for="country in countryOptions" :key="'option-' + country.id">{{country.name}}</option>
                  </select>

                  <label for="companyName">City</label>
                  <select :disabled="!selectedCountry.length" v-model="selectedCity" class="form-control">
                    <option :value="city.id" v-for="city in cityOptions" :key="'option-' + city.id">{{city.name}}</option>
                  </select>

                  <label for="companyName">Company Name</label>
                  <input :disabled="!selectedCity.length" v-model="companyName" name="companyName" class="form-control" placeholder="Company Name">
                </div>
                <button :disabled="!selectedCountry.length || !selectedCity.length || companyName.length < 3" @click="createCompany()" class="btn btn-primary btn-block">Save Company</button>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="card">
            <div class="card-header"><h5>Existing cargo types</h5></div>
            <div class="card-body cargos">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="company in companies" :key="company.id">
                    <td>{{company.name}}</td>
                    <td>{{company.city.name}}</td>
                    <td>{{company.country.name}} ({{company.country.iso_code}})</td>
                    <td>{{company.created_at}}</td>
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
  name: 'companies',
  data () {
    return {
      companyName: '',
      companies: [],
      countries: [],
      cities: [],
      countryOptions: {},
      cityOptions: {},
      selectedCountry: '',
      selectedCity: ''
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
    },
    cities (val) {
      if (val.length) {
        var output = {}
        for (var i in val) {
          if (val[i].country.id === this.selectedCountry) {
            output[i] = val[i]
          }
        }
        this.cityOptions = output
      }
    },
    selectedCountry (val) {
      if (val.length) {
        var output = {}
        for (var i in this.cities) {
          if (this.cities[i].country.id === this.selectedCountry) {
            output[i] = this.cities[i]
          }
        }
        this.cityOptions = output
      }
    }
  },
  methods: {
    createCompany () {
      var params = {
        name: this.companyName,
        country_id: this.selectedCountry,
        city_id: this.selectedCity
      }
      api.createCompany(params, this)
    }
  },
  beforeMount () {
    api.getAllCompanies(this)
    api.getAllCountries(this)
    api.getAllCities(this)
  }
}
</script>

<style scoped>
.card-body {
  height: 70vh;
  overflow-y: auto
}
</style>
