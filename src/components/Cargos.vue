<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <div class="card-header"><h5>Create new cargo type</h5></div>
            <div class="card-body">
                <div class="form-group">
                  <label for="cargoName">Cargo Name</label>
                  <input v-model="cargoName" name="cargoName" class="form-control" placeholder="Cargo Name">
                </div>
                <button :disabled="cargoName.length < 4" @click="createCargo()" class="btn btn-primary btn-block">Save Cargo</button>
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
                    <th>Cargo Name</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cargo in cargos" :key="cargo.id">
                    <td>{{cargo.name}}</td>
                    <td>{{cargo.created_at}}</td>
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
  name: 'cargos',
  data () {
    return {
      cargoName: '',
      cargos: []
    }
  },
  methods: {
    createCargo () {
      var params = {
        name: this.cargoName
      }
      api.createCargo(params, this)
    }
  },
  beforeMount () {
    api.getAllCargos(this)
  }
}
</script>

<style>

</style>
