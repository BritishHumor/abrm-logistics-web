<template>
  <div class="container-fluid">
    <div class="">
      <div class="card-header">
        <strong>Drivers</strong> - <small>All ABRM Logistics Drivers</small>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12" v-for="driver in drivers" :key="driver.id">
            <div class="card">
              <div class="card-header">{{driver.driver_name}}</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-1">
                    <img :src="driverTruckerInfo(driver.player_id).avatar" width="100%">
                  </div>
                  <div class="col-11">
                    <code v-html="driver"></code>
                  </div>
                </div>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'drivers',
  data () {
    return {
      drivers: []
    }
  },
  methods: {
    init () {
      this.getAllDrivers()
    },
    driverTruckerInfo (driverId) {
      return {
        avatar: 'https://via.placeholder.com/1000x1000?text=User Has No Truckers MP Info'
      }
    },
    getAllDrivers () {
      api.getAllDrivers(this)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
</style>
