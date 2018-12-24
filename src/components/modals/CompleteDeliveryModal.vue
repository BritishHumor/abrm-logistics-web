<template>
  <div data-backdrop="static" :id="'completeDeliveryModal-' + delivery.id" class="modal fade">
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
          <button :disabled="!formValid" @click="completeDelivery(delivery.id)" type="button" class="btn btn-success">Complete Job</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
export default {
  name: 'complete-delivery-modal',
  props: ['delivery'],
  data () {
    return {
      actualProfit: 0,
      expenses: 0,
      netProfit: 0,
      experienceGained: 0,
      drivenDistance: 0,
      timeTakenInGame: 0,
      fuelConsumed: 0
    }
  },
  computed: {
    formValid () {
      if (this.actualProfit) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
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
    }
  }
}
</script>

<style>

</style>
