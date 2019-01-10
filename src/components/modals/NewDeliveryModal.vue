<template>
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
            <label for="cargoType">Cargo Type</label>
            <!-- <select v-model="selectedCargoType" name="cargoType" id="cargoType" class="form-control" placeholder="Cargo Type">
              <option :value="type.id" v-for="type in cargoTypeOptions" :key="type.id">{{type.name}}</option>
            </select> -->
            <div class="row">
              <div class="col cargo" v-for="type in cargoTypeOptions" :key="type.id" @click="selectCargo(type.id, type.name)">
                <div class="card">
                  <div :class="'card-body cargoSelection ' + ( ( type.selected ) ? 'selected' : '' )" :style="'background-image: url(\'https://via.placeholder.com/500x500?text=[Placeholder]%20Cargo%20Image\');background-repeat: no-repeat;background-size:cover;background-position: center; '">
                    <span style="background-color: rgba(0,0,0,0.5); padding: 5px; word-wrap: break-word;" v-html="type.name"></span>
                  </div>
                </div>
              </div>
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
              <div v-if="Object.keys(originCityOptions).length">
                <select v-model="selectedOriginCity" name="originCity" id="originCity" class="form-control" placeholder="Starting City">
                  <option :value="city.id" v-for="city in originCityOptions" :key="city.id">{{city.name}}</option>
                </select>
              </div>
              <div v-else>
                <span>No Cities available for selected country</span>
              </div>

              <label for="originCompany">Employer</label>
              <div v-if="Object.keys(originCompanyOptions).length">
                <select v-model="selectedOriginCompany" name="originCompany" id="originCompany" class="form-control" placeholder="Employer">
                  <option :value="company.id" v-for="company in originCompanyOptions" :key="company.id">{{company.name}}</option>
                </select>
              </div>
              <div v-else>
                <span>No Companies available for selected City</span>
              </div>
            </div>
            </div>
            <div class="col-6">
              <div class="form-group">
              <label for="destinationCountry">Destination Country</label>
              <select v-model="selectedDestinationCountry" name="destinationCountry" id="destinationCountry" class="form-control" placeholder="Starting Country">
                <option :value="country.id" v-for="country in countryOptions" :key="country.id">{{country.name}}</option>
              </select>

              <label for="destinationCity">Destination City</label>
              <div v-if="Object.keys(destinationCityOptions).length">
                <select v-model="selectedDestinationCity" name="destinationCity" id="destinationCity" class="form-control" placeholder="Starting City">
                  <option :value="city.id" v-for="city in destinationCityOptions" :key="city.id">{{city.name}}</option>
                </select>
              </div>
              <div v-else>
                <span>No Companies available for selected City</span>
              </div>

              <label for="destinationCompany">Customer</label>
              <div v-if="Object.keys(destinationCompanyOptions).length">
                <select v-model="selectedDestinationCompany" name="destinationCompany" id="destinationCompany" class="form-control" placeholder="Employer">
                  <option :value="company.id" v-for="company in destinationCompanyOptions" :key="company.id">{{company.name}}</option>
                </select>
              </div>
              <div v-else>
                <span>No Companies available for selected City</span>
              </div>

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
          <button :disabled="!formValid" @click="createNewDelivery()" type="button" class="btn btn-primary">Start Job</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
export default {
  name: 'new-delivery-modal',
  props: ['cargos', 'countries', 'cities', 'companies', 'driverId'],
  data () {
    return {
      cargoTypeOptions: {},
      selectedCargo: '',
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
      cargoWeight: 0
    }
  },
  computed: {
    formValid () {
      if (this.cargoWeight > 0 && this.estimatedProfit > 0 && this.selectedCargo && this.selectedDestinationCompany && this.selectedOriginCompany) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    cargos (val) {
      if (val.length) {
        var output = {}
        for (var i in val) {
          output[i] = val[i]
        }
        this.cargoTypeOptions = output
      }
    },
    selectedCargo (val) {
      var output = {}
      for (var i in this.cargos) {
        if (this.cargos[i].id === val) {
          output[i] = ({id: this.cargos[i].id, name: this.cargos[i].name, selected: true})
        } else {
          output[i] = ({id: this.cargos[i].id, name: this.cargos[i].name, selected: false})
        }
      }
      this.cargoTypeOptions = output
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
    selectCargo (id, name) {
      this.selectedCargo = id
    },
    createNewDelivery () {
      var params = {
        driver_id: this.driverId,
        cargo_id: this.selectedCargo,
        weight: this.cargoWeight,
        origin_company_id: this.selectedOriginCompany,
        origin_country_id: this.selectedOriginCountry,
        origin_city_id: this.selectedOriginCity,
        destination_company_id: this.selectedDestinationCompany,
        destination_country_id: this.selectedDestinationCountry,
        destination_city_id: this.selectedDestinationCity,
        estimated_profit: this.estimatedProfit,
        status: 0
      }
      api.createDelivery(params, this)
    },
    closeModal () {
      window.$('#newDeliveryModal').modal('hide')
    }
  }
}
</script>

<style>
.cargo {
  --caroSelectionSize: 125px;
  margin: 0px -10px 5px -10px;
  text-align: center;
  /* height: var(--caroSelectionSize);
  width: var(--caroSelectionSize); */
}
.cargoSelection {
  --caroSelectionSize: 125px;
  height: var(--caroSelectionSize);
  /* width: var(--caroSelectionSize); */
  box-shadow: inset 25px -25px 75px rgba(255,255,255,0.1);
  cursor: pointer;
}

.selected {
  border: 1px solid var(--primary)
}
</style>
