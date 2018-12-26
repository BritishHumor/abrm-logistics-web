<template>
  <div data-backdrop="static" :id="'cancelDeliveryModal-' + delivery.id" class="modal fade">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Cancel Delivery Job</h5>
          <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> -->
        </div>
        <div class="modal-body">
          Are you sure you want to cancel a Delivery?<br>
          Only an <em>ABRM Logistics Operator</em> can recover this job after cancelation, after submission of appropriate paperwork.
        </div>
        <div class="modal-footer">
          <button @click="cancelDelivery(delivery.id)" type="button" class="btn btn-danger">Cancel Job</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api'
export default {
  name: 'cancel-delivery-modal',
  props: ['delivery'],
  data () {
    return {
    }
  },
  methods: {
    cancelDelivery (id) {
      var params = {
        status: 6
      }
      api.updateDelivery(params, id, this)
    }
  }
}
</script>

<style>

</style>
