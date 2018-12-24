<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h4>Deliveries
            <button v-if="deliveries.length && !driverHasActiveJob" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#newDeliveryModal" style="float: right">Start a Delivery</button>
            <button v-else-if="deliveries.length" disabled class="btn btn-sm btn-primary" data-toggle="modal" data-target="#newDeliveryModal" style="float: right">Finish currenty Delivery before starting a new one.</button>
            </h4></div>
          <div class="card-body deliveriesBody" v-if="deliveries.length">
            <div id="accordion">
              <div v-for="delivery in deliveries" :key="delivery.id" class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0" style=" width: 100%">
                    <button class="btn btn-link collapsed text-white" style="width:100%" data-toggle="collapse" :data-target="'#collapseDelivery-' + delivery.id" aria-expanded="true" :aria-controls="'collapseDelivery-' + delivery.id">
                      <span style="float: left"><strong>{{delivery.cargo.name}}</strong> - {{delivery.weight}} Tons</span>
                            <span style="float: left; margin-left: 50px"><span class="badge badge-secondary">Driver: {{delivery.driver.driver_name}}</span></span>
                            <span style="float: right" :class="'badge ' + deliveryStatusClass(delivery.status)">{{deliveryStatus(delivery.status)}}</span>
                            <span style="float: right; margin-right: 50px" v-if="delivery.status === 5"><span class="badge badge-success "><strong class="textToHideIfWidthIsTooSmall">Income:</strong> ${{delivery.actual_profit}}</span> <span class="badge badge-danger"><strong class="textToHideIfWidthIsTooSmall">Expenses:</strong> ${{delivery.expenses}}</span> <span class="badge badge-info"><strong class="textToHideIfWidthIsTooSmall">Profit:</strong> ${{((delivery.net_profit) ? delivery.net_profit : 0)}}</span> <span class="badge badge-primary"><strong class="textToHideIfWidthIsTooSmall">Time Taken:</strong> {{deliveryTime(delivery.time_taken_in_game)}}</span></span>
                    </button>
                  </h5>
                </div>

                <div :id="'collapseDelivery-' + delivery.id" :class="((delivery.status < 5 && delivery.driver.id === driverId) ? 'collapse show' : 'collapse')" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    <div class="progress bg-light">
                      <div class="progress-bar" role="progressbar" :style="'width:' + delivery.status / 5 * 100  + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{deliveryStatus(delivery.status)}}</div>
                    </div>
                    <table class="table" v-if="delivery.status === 5">
                      <thead>
                        <tr>
                          <th>Estimated Profit</th>
                          <th>Actual Profit</th>
                          <th>Expenses</th>
                          <th>Net Profit</th>
                          <th>XP Gained</th>
                          <th>Driven Distance</th>
                          <th>Time Taken</th>
                          <th>Fuel Consumed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>€ {{delivery.estimated_profit}}</td>
                          <td>€ {{delivery.actual_profit}}</td>
                          <td>€ {{delivery.expenses}}</td>
                          <td>€ {{delivery.net_profit}}</td>
                          <td>{{delivery.experience_gained}}</td>
                          <td>{{delivery.driven_distance}} Miles</td>
                          <td>{{delivery.time_taken_in_game}} mins</td>
                          <td>{{delivery.fuel_consumed}} litres</td>
                        </tr>
                      </tbody>
                    </table>
                    <table class="table" v-else>
                      <thead>
                        <tr>
                          <th>Estimated Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>€ {{delivery.estimated_profit}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button v-if="delivery.status < 4" @click="progressDelivery(delivery.id, delivery.status)" class="btn btn-primary" style="float: right">Progress Delivery</button>
                    <button v-if="delivery.status === 4" data-toggle="modal" :data-target="'#completeDeliveryModal-' + delivery.id" class="btn btn-success" style="float: right">Complete Delivery</button>
                    <button v-if="delivery.status === 5" @click="exportDelivery(delivery.id)" class="btn btn-info" style="float: right">Export Delivery PDF</button>
                    <button v-if=" delivery.status < 5" data-toggle="modal" :data-target="'#cancelJob-' + delivery.id" class="btn btn-danger" style="float: left">Cancel Delivery</button> &nbsp;
                    <button v-if="delivery.status > 0 && delivery.status < 5" @click="deprogressDelivery(delivery.id, delivery.status)" class="btn btn-light" style="float: left; margin-left: 5px">Revert Progress Delivery</button>
                    <br>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="card-body noDeliveries">
            <h4>No Deliveries have been recorded</h4>
            <p class="text-muted">Why not start your own?</p>
            <button class="btn btn-primary" data-toggle="modal" data-target="#newDeliveryModal">Start a Delivery</button>
          </div>
        </div>
      </div>
    </div>
    <div data-backdrop="static" id="newDeliveryModal" class="modal fade">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Register a new Delivery</h5>
            <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> -->
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="cargoType">Cargo Type</label>
              <select v-model="selectedCargoType" name="cargoType" id="cargoType" class="form-control" placeholder="Cargo Type">
                <option :value="type.id" v-for="type in cargoTypeOptions" :key="type.id">{{type.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="cargoWeight">Cargo Weight</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Tons</div>
                </div>
                <input type="number" name="cargoWeight" id="cargoWeight" v-model="cargoWeight" class="form-control">
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                <label for="originCountry">Origin Country</label>
                <select v-model="selectedOriginCountry" name="originCountry" id="originCountry" class="form-control" placeholder="Starting Country">
                  <option :value="country.id" v-for="country in countryOptions" :key="country.id">{{country.name}}</option>
                </select>

                <label for="originCity">Origin City</label>
                <select v-model="selectedOriginCity" name="originCity" id="originCity" class="form-control" placeholder="Starting City">
                  <option :value="city.id" v-for="city in originCityOptions" :key="city.id">{{city.name}}</option>
                </select>

                <label for="originCompany">Employer</label>
                <select v-model="selectedOriginCompany" name="originCompany" id="originCompany" class="form-control" placeholder="Employer">
                  <option :value="company.id" v-for="company in originCompanyOptions" :key="company.id">{{company.name}}</option>
                </select>
              </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                <label for="destinationCountry">Destination Country</label>
                <select v-model="selectedDestinationCountry" name="destinationCountry" id="destinationCountry" class="form-control" placeholder="Starting Country">
                  <option :value="country.id" v-for="country in countryOptions" :key="country.id">{{country.name}}</option>
                </select>

                <label for="destinationCity">Destination City</label>
                <select v-model="selectedDestinationCity" name="destinationCity" id="destinationCity" class="form-control" placeholder="Starting City">
                  <option :value="city.id" v-for="city in destinationCityOptions" :key="city.id">{{city.name}}</option>
                </select>

                <label for="destinationCompany">Customer</label>
                <select v-model="selectedDestinationCompany" name="destinationCompany" id="destinationCompany" class="form-control" placeholder="Employer">
                  <option :value="company.id" v-for="company in destinationCompanyOptions" :key="company.id">{{company.name}}</option>
                </select>
              </div>
              </div>
            </div>
            <div class="form-group">
              <label for="estimatedProfit">Estimated Profit</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">€</div>
                </div>
                <input type="number" name="estimatedProfit" id="estimatedProfit" v-model="estimatedProfit" class="form-control">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="createNewDelivery()" type="button" class="btn btn-primary">Start Job</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-for="delivery in deliveries" :key="'completeDeliveryModal-' + delivery.id" data-backdrop="static" :id="'completeDeliveryModal-' + delivery.id" class="modal fade">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Complete Job</h5>
            <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> -->
          </div>
          <div class="modal-body">
            <div class="form-group">
              
              <label for="actualProfit">Actual Profit</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">€</div>
                </div>
                <input type="number" name="actualProfit" id="actualProfit" v-model="actualProfit" class="form-control">
              </div>

              <label for="expenses">Expenses</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">€</div>
                </div>
                <input type="number" name="expenses" id="expenses" v-model="expenses" class="form-control">
              </div>

              <label for="netProfit">Net Profit</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">€</div>
                </div>
                <input type="number" name="netProfit" id="netProfit" v-model="netProfit" class="form-control">
              </div>

            </div>
            <div class="form-group">

              <label for="experienceGained">Experience Gained</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">XP</div>
                </div>
                <input type="number" name="experienceGained" id="experienceGained" v-model="experienceGained" class="form-control">
              </div>

              <label for="drivenDistance">Driven Distance</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Miles</div>
                </div>
                <input type="number" name="drivenDistance" id="drivenDistance" v-model="drivenDistance" class="form-control">
              </div>

              <label for="timeTakenInGame">Time Taken (game time)</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">Minutes</div>
                </div>
                <input type="number" name="timeTakenInGame" id="timeTakenInGame" v-model="timeTakenInGame" class="form-control">
              </div>

              <label for="fuelConsumed">Fuel Consumed</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <div class="input-group-text">litres</div>
                </div>
                <input type="number" name="fuelConsumed" id="fuelConsumed" v-model="fuelConsumed" class="form-control">
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button @click="completeDelivery(delivery.id)" type="button" class="btn btn-success">Complete Job</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div v-for="delivery in deliveries" :key="delivery.id + '-cancelJobModal'" data-backdrop="static" :id="'cancelJob-' + delivery.id" class="modal fade">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Are you sure you want to cancel your Delivery?</h5>
              <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button> -->
            </div>
            <div class="modal-body">
              Are you sure? Only an Operator can recover a Delivery after a Driver cancels it.
            </div>
            <div class="modal-footer">
              <button @click="cancelDelivery(delivery.id)" type="button" class="btn btn-danger">Cancel Delivery</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
      cargos: [],
      deliveries: [],
      cargoTypeOptions: {},
      selectedCargoType: '',
      cargoWeight: 0,
      countries: [],
      cities: [],
      companies: [],
      countryOptions: {},
      originCityOptions: {},
      originCompanyOptions: {},
      destinationCityOptions: {},
      destinationCompanyOptions: {},
      selectedOriginCountry: '',
      selectedDestinationCountry: '',
      selectedOriginCity: '',
      selectedDestinationCity: '',
      selectedOriginCompany: '',
      selectedDestinationCompany: '',
      estimatedProfit: 0,
      driverId: '',
      actualProfit: 0,
      expenses: 0,
      netProfit: 0,
      experienceGained: 0,
      drivenDistance: 0,
      timeTakenInGame: 0,
      fuelConsumed: 0,
      driverHasActiveJob: false
    }
  },
  watch: {
    deliveries (val) {
      if (val.length) {
        for (var i in val) {
          if (val[i].driver.id === this.driverId) {
            if (val[i].status < 5) {
              this.driverHasActiveJob = true
            }
          }
        }
      }
    },
    cargos (val) {
      if (val.length) {
        var output = {}
        for (var i in val) {
          output[i] = val[i]
        }
        this.cargoTypeOptions = output
      }
    },
    countries (val) {
      if (val.length) {
        var output = {}
        for (var i in val) {
          output[i] = val[i]
        }
        this.countryOptions = output
      }
    },
    selectedOriginCountry (val) {
      if (val.length) {
        var output = {}
        for (var i in this.cities) {
          if (this.cities[i].country.id === this.selectedOriginCountry) {
            output[i] = this.cities[i]
          }
        }
        this.originCityOptions = output
      }
    },
    selectedOriginCity (val) {
      if (val.length) {
        var output = {}
        for (var i in this.companies) {
          if (this.companies[i].country.id === this.selectedOriginCountry && this.companies[i].city.id === this.selectedOriginCity) {
            output[i] = this.companies[i]
          }
        }
        this.originCompanyOptions = output
      }
    },
    selectedDestinationCountry (val) {
      if (val.length) {
        var output = {}
        for (var i in this.cities) {
          if (this.cities[i].country.id === this.selectedDestinationCountry) {
            output[i] = this.cities[i]
          }
        }
        this.destinationCityOptions = output
      }
    },
    selectedDestinationCity (val) {
      if (val.length) {
        var output = {}
        for (var i in this.companies) {
          if (this.companies[i].country.id === this.selectedDestinationCountry && this.companies[i].city.id === this.selectedDestinationCity) {
            output[i] = this.companies[i]
          }
        }
        this.destinationCompanyOptions = output
      }
    }
  },
  methods: {
    exportDelivery (id) {
      api.exportDeliveryPdf(id, this)
    },
    deliveryTime (time) {
      var hours = Math.floor(time / 60)
      if (time >= 60) {
        if (time % 60 > 0) {
          return hours + ' hours ' + time % 60 + ' mins'
        } else {
          return hours + ' hours'
        }
      } else {
        return time + ' mins'
      }
    },
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
    deliveryStatusClass (status) {
      switch (status) {
        case 0:
          return 'badge-danger'
        case 1:
          return 'badge-primary'
        case 2:
          return 'badge-warning'
        case 3:
          return 'badge-info'
        case 4:
          return 'badge-info'
        case 5:
          return 'badge-success'
        case 6:
          return 'badge-secondary'
        case 7:
          return 'badge-secondary'
        default:
          return 'badge-secondary'
      }
    },
    resetForm (id = null) {
      this.driverId = ''
      this.selectedCargoType = ''
      this.cargoWeight = ''
      this.selectedOriginCompany = ''
      this.selectedOriginCountry = ''
      this.selectedOriginCity = ''
      this.selectedDestinationCompany = ''
      this.selectedDestinationCountry = ''
      this.selectedDestinationCity = ''
      this.estimatedProfit = ''
      window.$('#newDeliveryModal').modal('hide')
      window.$('#completeDeliveryModal-' + id).modal('hide')
    },
    progressDelivery (id, status) {
      var params = {
        status: status + 1
      }
      api.updateDelivery(params, id, this)
    },
    cancelDelivery (id) {
      var params = {
        status: 6
      }
      window.$('#cancelJob-' + id).modal('hide')
      api.updateDelivery(params, id, this)
    },
    completeDelivery (id) {
      var params = {
        actual_profit: this.actualProfit,
        expenses: this.expenses,
        net_profit: this.netProfit,
        experience_gained: this.experienceGained,
        driven_distance: this.drivenDistance,
        time_taken_in_game: this.timeTakenInGame,
        fuel_consumed: this.fuelConsumed,
        status: 5
      }
      api.updateDelivery(params, id, this)
      this.resetForm(id)
    },
    deprogressDelivery (id, status) {
      var params = {
        status: status - 1
      }
      api.updateDelivery(params, id, this)
    },
    createNewDelivery () {
      var params = {
        driver_id: this.driverId,
        cargo_id: this.selectedCargoType,
        weight: this.cargoWeight,
        origin_company_id: this.selectedOriginCompany,
        origin_country_id: this.selectedOriginCountry,
        origin_city_id: this.selectedOriginCity,
        destination_company_id: this.selectedDestinationCompany,
        destination_country_id: this.selectedDestinationCountry,
        destination_city_id: this.selectedDestinationCity,
        estimated_profit: this.estimatedProfit,
        status: 1
      }
      api.createDelivery(params, this)
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
    setTimeout(function () {
      // remote.webContents.getFocusedWebContents().print({silent: false, printBackground: true})
    }, 2000)
  }
}
</script>

<style>
.noDeliveries {
  text-align: center
}
@media only screen and (max-width: 1175px) {
  .textToHideIfWidthIsTooSmall {
    display: none
  }
}
.deliveriesBody {
  height: 78vh;
  overflow-y: auto
}
</style>
