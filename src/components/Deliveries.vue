<template>
  <div class="container-fluid">
    <div id="statSection" class="row">
      <div class="col-7">
        <div class="">
          <div class="card-header">Did you know?</div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="stat">
                  Your most common cargo type is<br>
                  <strong>{{mostCargoType.name}}</strong><br>
                  with a total of<br>
                  <strong>{{mostCargoType.count}}</strong><br>deliveries
                </div>
              </div>
              <div class="col">
                <div class="stat">
                  You have used a total of<br><br>
                  <strong>{{mostUsedFuel}}</strong><br><br>
                  litres of fuel, that's a lot!<br>
                </div>
              </div>
              <div class="col">
                <div class="stat">
                  You have travelled a total of<br><br>
                  <strong>{{mostTravelledDistance}}</strong><br><br>
                  miles on the job, mr worldwide!<br>
                </div>
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
                <div class="stat">
                  <span class="text-muted">
                    This Feature is currently Disabled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="">
          <div class="card-header"><strong>Active Deliveries</strong> - X Total Deliveries <button data-toggle="modal" data-target="#newDeliveryModal" class="btn btn-sm btn-primary startDelivery">Start a Delivery</button></div>
          <div class="card-body">
            <div class="row">
              <div class="col" v-if="activeDeliveries.length">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Cargo</th>
                      <!-- <th>Weight (Tons)</th> -->
                      <!-- <th>Source Company</th> -->
                      <th>Source City</th>
                      <!-- <th>Destination Company</th> -->
                      <th>Destination City</th>
                      <th>Driver</th>
                      <!-- <th>Status</th> -->
                      <!-- <th>Net Profit</th> -->
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="delivery in activeDeliveries" :key="delivery.id">
                      <td>{{delivery.cargo.name}}</td>
                      <!-- <td>{{delivery.weight}}</td> -->
                      <!-- <td>{{delivery.origin_company.name}}</td> -->
                      <td>{{delivery.origin_city.name}}</td>
                      <!-- <td>{{delivery.destination_company.name}}</td> -->
                      <td>{{delivery.destination_city.name}}</td>
                      <td>{{delivery.driver.driver_name}}</td>
                      <!-- <td>
                        <div class="progress bg-light">
                          <div class="progress-bar" role="progressbar" :style="'width:' + delivery.status / 5 * 100  + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{deliveryStatus(delivery.status)}}</div>
                        </div>
                      </td> -->
                      <td><btn @click="goToPage('/delivery?delivery=' + delivery.id)" class="btn btn-sm btn-primary">More Details</btn></td>
                      <!-- <td>€ {{delivery.net_profit}}</td> -->
                    </tr>
                  </tbody>
                </table>
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
          <div class="card-header"><strong>Completed Deliveries</strong> - X Total Deliveries</div>
          <div class="card-body">
            <div class="row">
              <div class="col" v-if="completeDeliveries.length">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Cargo</th>
                      <!-- <th>Weight (Tons)</th> -->
                      <!-- <th>Source Company</th> -->
                      <th>Source City</th>
                      <!-- <th>Destination Company</th> -->
                      <th>Destination City</th>
                      <th>Net Profit</th>
                      <th>Driver</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="delivery in completeDeliveries" :key="delivery.id">
                      <td>{{delivery.cargo.name}}</td>
                      <!-- <td>{{delivery.weight}}</td> -->
                      <!-- <td>{{delivery.origin_company.name}}</td> -->
                      <td>{{delivery.origin_city.name}}</td>
                      <!-- <td>{{delivery.destination_company.name}}</td> -->
                      <td>{{delivery.destination_city.name}}</td>
                      <td>€ {{delivery.net_profit.toLocaleString()}}</td>
                      <td>{{delivery.driver.driver_name}}</td>
                      <td><btn @click="goToPage('/delivery?delivery=' + delivery.id)" class="btn btn-sm btn-primary">More Details</btn></td>
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
          <div class="card-header"><strong>Canceled Deliveries</strong> - X Total Deliveries</div>
          <div class="card-body">
            <div class="row">
              <div class="col" v-if="canceledDeliveries.length">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Cargo</th>
                      <!-- <th>Weight (Tons)</th> -->
                      <!-- <th>Source Company</th> -->
                      <!-- <th>Source City</th> -->
                      <!-- <th>Destination Company</th> -->
                      <!-- <th>Destination City</th> -->
                      <!-- <th>Net Profit</th> -->
                      <th>Driver</th>
                      <th>Cancelation Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="delivery in canceledDeliveries" :key="delivery.id">
                      <td>{{delivery.cargo.name}}</td>
                      <!-- <td>{{delivery.weight}}</td> -->
                      <!-- <td>{{delivery.origin_company.name}}</td> -->
                      <!-- <td>{{delivery.origin_city.name}}</td> -->
                      <!-- <td>{{delivery.destination_company.name}}</td> -->
                      <!-- <td>{{delivery.destination_city.name}}</td> -->
                      <!-- <td>€ {{delivery.net_profit}}</td> -->
                      <td>{{delivery.driver.driver_name}}</td>
                      <td>{{deliveryStatus(delivery.status)}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col" v-else>
                <span class="text-muted">No Canceled Deliveries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <new-delivery-modal :cargos="cargos" :countries="countries" :cities="cities" :companies="companies" :driverId="driverId"/>
  </div>
</template>

<script>
import newDeliveryModal from './modals/NewDeliveryModal'
import api from '../api'
export default {
  name: 'deliveries',
  components: {newDeliveryModal},
  data () {
    return {
      deliveries: [],
      completeDeliveries: [],
      activeDeliveries: [],
      canceledDeliveries: [],
      mostCargoType: {},
      mostUsedFuel: 0,
      mostTravelledDistance: 0,
      driverId: '',
      cargos: [],
      countries: [],
      cities: [],
      companies: []
    }
  },
  watch: {
    deliveries (val) {
      var complete = []
      var canceled = []
      var active = []
      var cargoType = {}
      if (val.length) {
        for (var i = 0; i < val.length; i++) {
          if (this.driverId === val[i].driver.id) {
            this.mostUsedFuel += val[i].fuel_consumed
            this.mostTravelledDistance += val[i].driven_distance
            if (cargoType[val[i].cargo.name]) {
              cargoType[val[i].cargo.name]++
            } else {
              cargoType[val[i].cargo.name] = 1
            }
          }

          if (val[i].status < 5) {
            active.push(val[i])
          } else if (val[i].status === 5) {
            complete.push(val[i])
          } else {
            canceled.push(val[i])
          }
        }
        this.mostUsedFuel = Math.floor(this.mostUsedFuel)
        this.mostTravelledDistance = Math.floor(this.mostTravelledDistance)
        this.completeDeliveries = complete
        this.activeDeliveries = active
        this.canceledDeliveries = canceled
        var highestCargo = {count: 0}
        for (var cargo in cargoType) {
          if (highestCargo.count < cargoType[cargo]) {
            highestCargo.name = cargo
            highestCargo.count = cargoType[cargo]
          }
        }
        this.mostCargoType = highestCargo
        console.log(highestCargo)
        console.log(cargoType)
      }
    }
  },
  methods: {
    deliveryStatus (status) {
      switch (status) {
        case 0:
          return 'Not Accepted'
        case 1:
          return 'Job Accepted'
        case 2:
          return 'Loading Cargo'
        case 3:
          return 'En-route'
        case 4:
          return 'Unloading Cargo'
        case 5:
          return 'Delivery Complete'
        case 6:
          return 'Delivery Canceled by Driver'
        case 7:
          return 'Delivery Canceled by Operator'
        default:
          return 'Unknown Delivery Status'
      }
    },
    goToPage (url) {
      window.$router.push({ path: url })
    }
  },
  beforeMount () {
    api.getAllDeliveries(this)
    api.getAllCountries(this)
    api.getAllCities(this)
    api.getAllCargos(this)
    api.getAllCompanies(this)
    this.driverId = JSON.parse(sessionStorage.getItem('driverRaw')).id
  },
  mounted () {
  }
}
</script>

<style>
.stat {
  padding: 5px 30px 5px 30px;
  text-align: center;
  font-size: 1.2em;
  background-color: rgba(255,255,255,0.05);
  height: 175px
}
.stat strong {
  font-size: 1.3em
}

.startDelivery {
  float: right;
  margin-top: -5px;
  margin-right: -10px;
}
@media only screen and (max-width: 2000px) {
  .stat {
    font-size: 1.1em
  }
}
@media only screen and (max-width: 1680px) {
  .stat {
    font-size: 1em
  }
}
@media only screen and (max-width: 1280px) {
  .stat {
    font-size: 0.9em
  }
}
@media only screen and (max-width: 1030px) {
  #statSection {
    display:none
  }
}
</style>
