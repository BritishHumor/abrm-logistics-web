<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12" v-if="enabled">
                <div class="card">
                    <div class="card-header">Telemetry</div>
                    <div class="card-body" v-if="Object.keys(telemetryInfo).length">
                      {{telemetryInfo.job}}
                      <br><br>
                      {{telemetryInfo.navigation}}
                    </div>
                </div>
            </div>
            <div class="col-12" v-else>
                <div class="card">
                    <div class="card-header">Telemetry</div>
                    <div class="card-body">
                      Sorry, but this feature is currently disabled until further notice.
                    </div>
                </div>
            </div>
        </div>
        <div v-if="enabled" data-backdrop="static" id="recievedNewJob" class="modal fade">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">New Job</h5>
                <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> -->
              </div>
              <div class="modal-body">
                Hey they Driver!
                We saw you just picked up a new Job, want to register that?
                <div class="form-group">
                  <label>Employer</label>
                  <input class="form-control" v-model="originCompany">
                  <label>Origin City</label>
                  <input class="form-control" v-model="originCity">
                  <label>Customer</label>
                  <input class="form-control" v-model="destinationCompany">
                  <label>Destination City</label>
                  <input class="form-control" v-model="destinationCity">
                </div>
              </div>
              <div class="modal-footer">
                <button @click="createNewDelivery()" type="button" class="btn btn-primary">Start Job</button>
                <button @click="driverRecievedNewJob = false" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers'
import api from '../api'
export default {
  name: 'telemetry',
  data () {
    return {
      enabled: false,
      telemetryInfo: {},
      loop: null,
      driverRecievedNewJob: false,
      originCompany: '',
      originCity: '',
      destinationCompany: '',
      destinationCity: ''
    }
  },
  watch: {
    telemetryInfo (val) {
      if (val.job) {
        if (val.job.income > 0 && this.driverRecievedNewJob === false) {
          console.log('PING! Driver just picked up a new job! details below:')
          console.log(val.job)
          this.driverRecievedNewJob = true
          this.originCompany = val.job.sourceCompany
          this.originCity = val.job.sourceCity
          this.destinationCompany = val.job.destinationCompany
          this.destinationCity = val.job.destinationCity
          window.$('#recievedNewJob').modal('show')
        }
      }
    }
  },
  methods: {
    init () {
      var self = this
      self.loop = setInterval(function () {
        api.getTelemetryData(self)
      }, 1000)
    }
  },
  beforeMount () {
    if (this.enabled) {
      this.init()
    }
  },
  beforeDestroy () {
    clearInterval(this.loop)
  }
}
</script>

<style scoped>

</style>