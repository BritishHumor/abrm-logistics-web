<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-7">
        <div class="">
          <div class="card-header">Did you know?</div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                Stat 1
              </div>
              <div class="col">
                Stat 2
              </div>
              <div class="col">
                Stat 3
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="">
          <div class="card-header">Your Daily Target</div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                € 3,000 / € 6, 000 Reached
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="">
          <div class="card-header">Active Deliveries</div>
          <div class="card-body">
            <div class="row">
              <div class="col" v-if="activeDeliveries.length">
              </div>
              <div class="col" v-else>
                <span class="text-muted">No active Deliveries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="">
          <div class="card-header">Completed Deliveries</div>
          <div class="card-body">
            <div class="row">
              <div class="col" v-if="completeDeliveries.length">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Cargo</th>
                      <th>Weight (Tons)</th>
                      <th>Source Company</th>
                      <th>Source City</th>
                      <th>Destination Company</th>
                      <th>Destination City</th>
                      <th>Net Profit</th>
                      <th>Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="delivery in completeDeliveries" :key="delivery.id">
                      <td>{{delivery.cargo.name}}</td>
                      <td>{{delivery.weight}}</td>
                      <td>{{delivery.origin_company.name}}</td>
                      <td>{{delivery.origin_city.name}}</td>
                      <td>{{delivery.destination_company.name}}</td>
                      <td>{{delivery.destination_city.name}}</td>
                      <td>€ {{delivery.net_profit}}</td>
                      <td>{{delivery.driver.driver_name}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col" v-else>
                <span class="text-muted">No Complete Deliveries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="">
          <div class="card-header">Canceled Deliveries</div>
          <div class="card-body">
            <div class="row">
              <div class="col" v-if="canceledDeliveries.length">
              </div>
              <div class="col" v-else>
                <span class="text-muted">No Canceled Deliveries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'deliveries',
  data () {
    return {
      deliveries: [],
      completeDeliveries: [],
      activeDeliveries: [],
      canceledDeliveries: []
    }
  },
  watch: {
    deliveries (val) {
      var complete = []
      var canceled = []
      var active = []
      if (val.length) {
        for (var i = 0; i < val.length; i++) {
          if (val[i].status < 5) {
            active.push(val[i])
          } else if (val[i].status === 5) {
            complete.push(val[i])
          } else {
            canceled.push(val[i])
          }
        }
        this.completeDeliveries = complete
        this.activeDeliveries = active
        this.canceledDeliveries = canceled
      }
    }
  },
  beforeMount () {
    api.getAllDeliveries(this)
  },
  mounted () {
  }
}
</script>

<style>
</style>
