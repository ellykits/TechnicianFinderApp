<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="goBack()" class="">
        <i class="on-right">keyboard_arrow_left</i>
        Back
      </button>
      <q-toolbar-title class="w3-center" :padding="0">
        Retrieved Request
      </q-toolbar-title>
    </div>
    <div class="layout-view">
      <div class="w3-margin"></div>
      <div class="w3-container" :margin="0">

        <div class="w3-container w3-white w3-padding w3-round-xlarge w3-border-2">
          <form>
            <ul class="w3-ul">
              <li>
                <strong class=" w3-margin-0 w3-text-black">Current Status</strong>
                <p class="w3-margin-0 w3-small">{{requestDetails.status}}</p>
              </li>

              <li>
                <span class="text-bold w3-text-brown">
                  </i> Name of Item to Service: </span>
                <input type="text" v-model="requestDetails.item">
              </li>
              <li>
                <span>
                  Task to be done : </span>
                <input type="text" v-model="requestDetails.task">
              </li>
              <li>
                <span>
                  Date for servicing:(dd-mm-yyyy) </span>
                <input type="text" v-model="requestDetails.deadline">
              </li>

              <li class="w3-center w3-light-grey">
                <strong class="w3-text-brown">Description</strong>
                <p class="w3-margin-0 w3-small"><textarea type="text" v-model="requestDetails.description"></textarea></p>

              </li>
              <li v-if="requestDetails.status === 'PENDING'"><button @click.prevent="updateRequest(requestDetails._id)" class="glossy w3-button w3-tiny  w3-center w3-padding w3-blue-grey w3-margin-top  w3-round-xlarge w3-ripple w3-text-white"><i class="fa fa-save"></i> Save</button>
       </li>
            </ul>
          </form>
        </div>
      </div>
     
        <div class="w3-row w3-row-padding">
          <div class=" w3-col s6 ">
<button @click.prevent="viewTechnician(requestDetails.svcprv_id)" class="glossy w3-btn w3-small full-width w3-small-padding w3-brown w3-margin-top  w3-round-xlarge w3-ripple w3-text-white"><i class="fa fa-eye"></i> See Technician</button>
        
          </div>
          <div class=" w3-col s6">
 <button @click.prevent="goBack" class="glossy w3-btn w3-small full-width w3-small-padding w3-blue w3-margin-top  w3-round-xlarge w3-ripple w3-text-white">
          <i class="fa fa-arrow-left"></i> Back</button>
          </div>
        </div>
    
      <div class="w3-margin"></div>
    
    
    </div>
  </q-layout>
</template>

<script>
import axios from 'axios'
import misc from "../mixins/auxilliaryMixin"
import { Dialog, Toast } from 'quasar'
export default {
  mixins: [misc],
  data() {
    return {
      requestDetails: {},
      id: this.$route.params.id,
      newBooking: {
        user_id: this.$route.params.id,
        svcprv_id: this.$route.params.tid,
        item: '',
        task: '',
        description: '',
        deadline: '',
        status: 'PENDING'
      }
    }
  },
  created() {
    this.retrieveRequest()
  },
  methods: {
    updateRequest(id){
       let url = "http://localhost:3000/api/bookings/edit/" + id
      axios.put(url,this.requestDetails)
        .then(response => {         
          //console.log(response)
           Toast.create.positive("Request update successfull!")
           this.requestDetails = response.data
        })
        .catch(e => {
          Toast.create.negative("Error occurred while updating. Check your connection.")
          console.log(e)
         
        })
    },
    retrieveRequest() {
      let url = "http://localhost:3000/api/bookings/req/" + this.$route.params.rqid
      axios.get(url)
        .then(response => {
          this.requestDetails = response.data
          console.log(response)
        })
        .catch(e => {
          Toast.create.negative("Loading data failed. Check your connection.")
          console.log(e)
          this.errors.push(e)
        })
    },
    viewTechnician(id){
      this.$router.push('../technician/'+ id)
    }
  }
}
</script>

<style>

</style>
