<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="goBack()" class="">
        <i class="on-right">keyboard_arrow_left</i>
        Back
      </button>
      <q-toolbar-title class="w3-center" :padding="0">
        My Requests
      </q-toolbar-title>

    </div>
    <div slot="header" class="w3-padding">
      <q-search class="" v-model="searchModel.search"></q-search>
    </div>
    <div class="layout-view">
      <div class="w3-container">
        <div v-if="allRequests.length === 0" class="w3-section w3-padding">
        <div class="w3-container w3-white w3-padding w3-round-xlarge w3-border-2">
          <h4 class="w3-center w3-text-red w3-margin-bottom text-bold">
            <i class="fa fa-info-circle fa-2x"></i> No requests available</h4>
          <p class="w3-center w3-text-black"> It seems you have not made any request. Search for technician and request for services.</p>
        </div>
      </div>
        <div class="w3-section w3-white  w3-round-xlarge w3-border-2">
          <ul class="w3-ul glossy">
            <li class=" w3-padding-small w3-center" tappable v-bind:key="request" v-for="request in allRequests">
              <div>
                <strong>{{request.task}}</strong>
                <p class="w3-small w3-margin-0">Name of Item/Appliance: {{request.item}}</p>
                <span class="w3-small">
                  <i class="fa fa-calendar"></i> Deadline: {{request.deadline}}
                </span>
                <p class="w3-small">
                  <i class="fa fa-info"></i> Status: {{request.status}}
                </p>
                <p class="w3-tiny w3-center">
                  <button  @click.prevent="removeRequest(request._id)"  class="  push w3-round-jumbo w3-padding-medium w3-btn w3-red">
                    <i class="fa fa-trash"></i>
                  </button>
                  <button @click.prevent="viewRequest(request._id)" class=" w3-margin-left push w3-round-jumbo
                   w3-padding-medium w3-btn w3-brown">
                    <i class="fa fa-ellipsis-h"></i>
                  </button>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  </q-layout>
</template>
<script>

import axios from "axios"
import misc from "../mixins/auxilliaryMixin"
import { Toast, Dialog, Loading } from 'quasar'
import _ from "lodash"

export default {
  mixins: [misc],
  data() {
    return {
      userId: this.$route.params.id,
      searchModel: {
        search: ''
      },
      erorrs: [],
      allRequests: {},
	   setColor: this.$refs.stat === 'REJECTED' ? 'red' : 'green'
    }
  },
  created() {
    this.retrieveAllRequests()
  },
  methods: {
    retrieveAllRequests() {
      let url = "http://localhost:3000/api/bookings/" + this.userId
      axios.get(url)
        .then(response => {
          this.allRequests = response.data
        })
        .catch(e => {
          Toast.create.negative("Loading data failed. Check your connection.")
          console.log(e)
          this.errors.push(e)
        })
    },
    removeRequest(req_id) {
      let url = "http://localhost:3000/api/bookings/del/" + req_id
      axios.delete(url)
        .then(response => {
          let deletedRequest = response.data
          if (deletedRequest != null && response.data._id == req_id) {
            //console.log(response)
            Toast.create("Request deleted successfully")
             this.$router.push('../'+this.userId+ '/enquiries')
          }
        })
        .catch(e => {
          Toast.create.negative("Error with deletion. Check your connection.")
          console.log(e)
          this.errors.push(e)
        })
    },
    viewRequest(id) {
      this.$router.push('../enquiries/' + id)
    }
  }
}
</script>

<style>

</style>
