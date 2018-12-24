<template>
  <div id="dashboard" class="container-fluid">
    <div class="">
      <div class="card-header"><strong>Welcome Back</strong>, {{driverInfo.driver_name}}</div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-10 col-sm-7 col-12">
            <span class="text-muted">
              Some General Player Info will go here, not sure what yet though...
            </span>
          </div>
          <div class="col-lg-2 col-sm-5 col">
            <img :src="playerInfo.avatar" style="width: 100%">
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-lg-12">
            <span class="text-muted">
              <table class="table">
                <thead>
                  <tr>
                    <th>Cargo</th>
                    <th>Profit</th>
                    <th>Time Taken</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="delivery in pastDeliveries" :key="delivery.id">
                    <td>{{delivery.cargo.name}}</td>
                    <td>{{( ( delivery.net_profit === null ) ? '' : '€ ' + delivery.net_profit )}}</td>
                    <td>{{( (delivery.time_taken_in_game) ? deliveryTime(delivery.time_taken_in_game) : '' )}}</td>
                    <td><span :class="'badge ' + deliveryStatusClass(delivery.status)">{{deliveryStatus(delivery.status)}}</span></td>
                  </tr>
                </tbody>
              </table>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
export default {
  name: 'dashboard',
  data () {
    return {
      token: '',
      deliveries: [],
      drivers: {},
      inputPlayerID: '',
      queryPlayerInfo: {},
      playerInfo: {},
      driverId: '',
      playerId: '',
      driverInfo: {},
      pastDeliveries: []
    }
  },
  watch: {
    driverId (val) {
      api.getDriverInfo(val, this)
      this.usersDelivieries()
    },
    pastDeliveries (val) {
      var max = 5
      var output = []
      if (val.length > max) {
        for (var i = 0; i < max; i++) {
          output[i] = val[i]
        }
        this.pastDeliveries = output
        console.log('updated past deliveries')
      }
    }
  },
  methods: {
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
    usersDelivieries () {
      api.getUsersDeliveries(this.driverId, this)
    }
  },
  mounted () {
    this.token = sessionStorage.getItem('token')
    this.driverId = JSON.parse(sessionStorage.getItem('driverRaw')).id
    this.playerId = sessionStorage.getItem('playerId')
    api.getProfile(this.playerId, this)
  }
}
</script>

<style>
#dashboard {
  text-align: center
}
.card-header {
  text-align: left
}
.menuBtn {
  display: flex
}
</style>
