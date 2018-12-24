<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <div class="card-header"><strong>Cargo</strong></div>
        <img src="https://via.placeholder.com/1000x1000?text=[Placeholder]%20Cargo%20Image" width="100%">
        <div class="">
          <table class="table" style="text-align: center">
            <tr>
              <th>{{delivery.cargo.name}}</th>
            </tr>
            <tr>
              <td><strong>Rarity</strong>: Common</td>
            </tr>
          </table>
        </div>
        <div class="">
          <div class="card-header"><strong>Driver</strong></div>
          <img :src="playerInfo.avatar" width="100%"><br>
          <div class="">
            <table class="table" style="text-align: center">
              <tr>
                <th>{{delivery.driver.driver_name}}</th>
              </tr>
              <tr>
                <td>Level {{delivery.driver.level}} - € {{delivery.driver.money.toLocaleString()}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="col-10">
        <div class="card-header">
          <strong>{{delivery.cargo.name}}</strong>
          <span class="badge badge-pill badge-secondary">{{delivery.weight}} Tons</span>
          <span style="float: right">
            <strong>{{delivery.origin_company.name}}</strong> {{delivery.origin_city.name}} ({{delivery.origin_country.iso_code}}) - <strong>{{delivery.destination_company.name}}</strong> {{delivery.destination_city.name}} ({{delivery.destination_country.iso_code}})
          </span>
        </div>
        <div class="card-body">
          <div class="progress bg-light">
            <div class="progress-bar" role="progressbar" :style="'width:' + delivery.status / 5 * 100  + '%;'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"><span style="z-index: 1">{{deliveryStatus(delivery.status)}}</span></div>
            <div :style=" ( (delivery.status >= 0) ? 'background-color: var(--primary);' : 'background-color: var(--gray);' ) + ' position:absolute; width: 25px; height: 25px; border-radius: 100%; margin-left: -12.5px; margin-top: -5px'"></div>
            <div :style=" ( (delivery.status >= 1) ? 'background-color: var(--primary);' : 'background-color: var(--gray);' ) + ' position:absolute; width: 25px; height: 25px; border-radius: 100%; margin-left: calc(18.5% - 12.5px); margin-top: -5px'"></div>
            <div :style=" ( (delivery.status >= 2) ? 'background-color: var(--primary);' : 'background-color: var(--gray);' ) + ' position:absolute; width: 25px; height: 25px; border-radius: 100%; margin-left: calc(38.5% - 12.5px); margin-top: -5px'"></div>
            <div :style=" ( (delivery.status >= 3) ? 'background-color: var(--primary);' : 'background-color: var(--gray);' ) + ' position:absolute; width: 25px; height: 25px; border-radius: 100%; margin-left: calc(57.5% - 12.5px); margin-top: -5px'"></div>
            <div :style=" ( (delivery.status >= 4) ? 'background-color: var(--primary);' : 'background-color: var(--gray);' ) + ' position:absolute; width: 25px; height: 25px; border-radius: 100%; margin-left: calc(76.5% - 12.5px); margin-top: -5px'"></div>
            <div :style=" ( (delivery.status >= 5) ? 'background-color: var(--primary);' : 'background-color: var(--gray);' ) + ' position:absolute; width: 25px; height: 25px; border-radius: 100%; margin-left: calc(95.75% - 12.5px); margin-top: -5px'"></div>
          </div>
          <br>
          <button v-if="delivery.status < 4" @click="progressDelivery(delivery.id, delivery.status)" class="btn btn-primary" style="float: right">Progress Delivery</button>
          <button v-if="delivery.status === 4" data-toggle="modal" :data-target="'#completeDeliveryModal-' + delivery.id" class="btn btn-success" style="float: right">Complete Delivery</button>
          <button v-if="delivery.status === 5" @click="exportDelivery(delivery.id)" class="btn btn-info" style="float: right">Export Delivery PDF</button>
          <button v-if=" delivery.status < 5" data-toggle="modal" :data-target="'#cancelJob-' + delivery.id" class="btn btn-danger" style="float: left">Cancel Delivery</button> &nbsp;
          <button v-if="delivery.status > 0 && delivery.status < 5" @click="deprogressDelivery(delivery.id, delivery.status)" class="btn btn-light" style="float: left; margin-left: 5px">Revert Progress Delivery</button>
          <br><br>
          <div v-if="delivery.status < 5">
            <br>
            <table class="table">
              <thead>
                <tr>
                  <th>Cargo</th>
                  <th>Weight</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Estimated Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{delivery.cargo.name}}</td>
                  <td>{{delivery.weight}} Tons</td>
                  <td><strong>{{delivery.origin_company.name}}</strong> {{delivery.origin_city.name}} ({{delivery.origin_country.iso_code}})</td>
                  <td><strong>{{delivery.destination_company.name}}</strong> {{delivery.destination_city.name}} ({{delivery.destination_country.iso_code}})</td>
                  <td>€ {{delivery.estimated_profit.toLocaleString()}}</td>
                </tr>
              </tbody>
            </table>
            <img src="https://via.placeholder.com/2000x800?text=[Placeholder]%20ETS2Map%20Tracker" width="100%">
          </div>
          <div v-else>
            <br>
            <table class="table">
              <thead>
                <tr>
                  <th>Cargo</th>
                  <th>Weight</th>
                  <th>Source</th>
                  <th>Destination</th>
                  <th>Estimated Profit</th>
                  <th>Expenses</th>
                  <th>Net Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{delivery.cargo.name}}</td>
                  <td>{{delivery.weight}} Tons</td>
                  <td><strong>{{delivery.origin_company.name}}</strong> {{delivery.origin_city.name}} ({{delivery.origin_country.iso_code}})</td>
                  <td><strong>{{delivery.destination_company.name}}</strong> {{delivery.destination_city.name}} ({{delivery.destination_country.iso_code}})</td>
                  <td>€ {{delivery.actual_profit.toLocaleString()}}</td>
                  <td>€ <span :style="( ( delivery.expenses > 0 ) ? 'color: var(--danger)' : '' )">{{delivery.expenses.toLocaleString()}}</span></td>
                  <td>€ <span :style="( ( delivery.net_profit > 0 ) ? 'color: var(--success)' : 'color: var(--warning)' )">{{delivery.net_profit.toLocaleString()}}</span></td>
                </tr>
              </tbody>
            </table>

            <hr>

            <table class="table">
              <thead>
                <tr>
                  <th>Distance travelled</th>
                  <th>Time taken in game</th>
                  <th>Fuel Consumed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{delivery.driven_distance}} miles</td>
                  <td>{{delivery.time_taken_in_game}} mins</td>
                  <td>{{delivery.fuel_consumed}} Litres</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <complete-delivery-modal :delivery="delivery" />
    <cancel-delivery-modal />
  </div>
</template>

<script>
import api from '../api'
// import cancelDeliveryModal from './modals/CancelDeliveryModal'
import completeDeliveryModal from './modals/CompleteDeliveryModal'
export default {
  components: { completeDeliveryModal },
  data () {
    return {
      deliveryId: '',
      playerInfo: {},
      delivery: {}
    }
  },
  watch: {
    delivery (val) {
      api.getProfile(this.delivery.driver.player_id, this)
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
    deprogressDelivery (id, status) {
      var params = {
        status: status - 1
      }
      api.updateDelivery(params, id, this)
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
    refreshDeliveries () {
      api.getSingleDelivery(this.deliveryId, this)
    }
  },
  mounted () {
    this.deliveryId = this.$route.query.delivery
    this.refreshDeliveries()
  }
}
</script>

<style>

</style>
