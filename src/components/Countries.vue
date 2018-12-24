<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <div class="card-header"><h5>Create new country</h5></div>
            <div class="card-body">
                <div class="form-group">
                  <label for="countryName">Country Name</label>
                  <input v-model="countryName" name="countryName" class="form-control" placeholder="Country Name">
                  <label for="countryIso">Country ISO</label>
                  <input v-model="countryIso" name="countryIso" class="form-control" placeholder="Country ISO">
                </div>
                <button :disabled="countryName.length < 4 &&  countryIso.length < 2" @click="createCountry()" class="btn btn-primary btn-block">Save Countries</button>
            </div>
          </div>
        </div>
        <div class="col-9">
          <div class="card">
            <div class="card-header"><h5>Existing countries</h5></div>
            <div class="card-body cargos">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Country Name</th>
                    <th>ISO Code</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="country in countries" :key="country.id">
                    <td>{{country.name}}</td>
                    <td>{{country.iso_code}}</td>
                    <td>{{country.created_at}}</td>
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
  name: 'countries',
  data () {
    return {
      countryName: '',
      countryIso: '',
      countries: []
    }
  },
  methods: {
    createCountry () {
      var params = {
        name: this.countryName,
        iso_code: this.countryIso
      }
      api.createCountry(params, this)
    }
  },
  beforeMount () {
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
