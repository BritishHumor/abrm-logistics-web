<template>
  <div class="container-fluid interfaces">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header"><h5><strong>{{driverInfo.driver_name}}</strong> - Level {{driverInfo.level}}</h5></div>
          <div class="card-body">
            <div class="row">
              <div class="col-2">
                <img :src="playerInfo.avatar" style="width: 100%">
              </div>
              <div class="col-10">
                <div class="progress">
                  <div class="progress-bar bg-success" role="progressbar" style="padding-left: 5px; width: 100%; text-align: left" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">€ {{driverInfo.money}}</div>
                </div>
                <br>
                <div class="progress bg-light">
                  <div class="progress-bar bg-info" role="progressbar" :style="'padding-left: 5px; text-align: left; width:' + (driverInfo.experience / nextLvlXp(driverInfo.experience, driverInfo.level) * 100) + '%;'" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"> {{driverInfo.experience}} / {{nextLvlXp(driverInfo.experience, driverInfo.level)}} ({{Math.ceil(driverInfo.experience / nextLvlXp(driverInfo.experience, driverInfo.level) * 100)}}%)</div>
                </div>
                <div>
                  <br>
                  <h4>Past Deliveries</h4>

                  <div id="accordion" class="pastDeliveriesBody">
                    <div v-for="delivery in pastDeliveries" :key="delivery.id" class="card">
                      <div class="card-header" id="headingOne">
                        <h5 class="mb-0" style="float: left; width: 100%">
                          <button class="btn btn-link collapsed text-white" style="width:100%;" data-toggle="collapse" :data-target="'#collapseDelivery-' + delivery.id" aria-expanded="true" :aria-controls="'collapseDelivery-' + delivery.id">
                            <span style="float: left"><strong>{{delivery.cargo.name}}</strong> - {{delivery.weight}} Tons</span>
                            
                            <span style="float: right" :class="'badge ' + deliveryStatusClass(delivery.status)">{{deliveryStatus(delivery.status)}}</span>
                            <span style="float: right; margin-right: 50px" v-if="delivery.status === 5"><span class="badge badge-success "><strong class="textToHideIfWidthIsTooSmall">Income:</strong> ${{delivery.actual_profit}}</span> <span class="badge badge-danger"><strong class="textToHideIfWidthIsTooSmall">Expenses:</strong> ${{delivery.expenses}}</span> <span class="badge badge-info"><strong class="textToHideIfWidthIsTooSmall">Profit:</strong> ${{((delivery.net_profit) ? delivery.net_profit : 0)}}</span> <span class="badge badge-primary"><strong class="textToHideIfWidthIsTooSmall">Time Taken:</strong> {{deliveryTime(delivery.time_taken_in_game)}}</span></span>
                          </button>
                        </h5>
                      </div>

                      <div :id="'collapseDelivery-' + delivery.id" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
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
                                <td>{{deliveryTime(delivery.time_taken_in_game)}}</td>
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
                          <br>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <!-- <iframe src="http://ets2map.com/" style="width: 100%; height: 47vh"></iframe> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  const moment = require('moment')
  // import axios from 'axios'

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
        driverInfo: {},
        pastDeliveries: []
      }
    },
    computed: {
    },
    watch: {
      driverId (val) {
        api.getDriverInfo(val, this)
        this.usersDelivieries()
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
      searchForProfile: function (id) {
        api.searchForProfile(id, this)
      },
      resetPlayerQuery () {
        this.queryPlayerInfo = {}
        this.inputPlayerID = ''
      },
      formatDate (date) {
        var newDate = moment(date)
        return newDate.format('dddd, MMMM Do YYYY, h:mm:ss a')
      },
      selectProfile (id) {
        sessionStorage.setItem('playerId', id)
        window.$('#playerIdModal').modal('hide')
      },
      nextLvlXp (curxp, curlvl) {
        var levels = {
          1: 200,
          2: 700,
          3: 1400,
          4: 2300,
          5: 3300,
          6: 4400,
          7: 5700,
          8: 7300,
          9: 9000,
          10: 11100,
          11: 13400,
          12: 16000,
          13: 18700,
          14: 21600,
          15: 24600,
          16: 27700,
          17: 31100
        }
        if (curlvl < 17) {
          var nextLvlXp = levels[curlvl + 1]
          return nextLvlXp
        }
      },
      usersDelivieries () {
        api.getUsersDeliveries(this.driverId, this)
      },
      imageName (name) {
        var newName = name.replace(' ', '_')
        return newName
      }
    },
    mounted () {
      this.token = sessionStorage.getItem('token')
      this.driverId = JSON.parse(sessionStorage.getItem('driverRaw')).id
      this.playerID = sessionStorage.getItem('playerId')
      if (!this.playerID) {
        window.$('#playerIdModal').modal('show')
      } else {
        api.getProfile(this.playerID, this)
      }
    }
  }
</script>

<style>
html {
  background-color: #65c1c1
}
#login * {
  margin-left: 12.5%;
  width: 75%;
  text-align: center
}
.hidden {
  display: none;
}
.card-header .btn {
  float: right
}
.interfaces {
  overflow-y: hidden;
  height: 84vh
}
.pastDeliveriesBody {
  height: 58vh;
  overflow-y: auto
}
</style>
