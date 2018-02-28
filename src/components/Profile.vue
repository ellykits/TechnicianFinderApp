<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="goBack()" class="">
        <i class="on-right">keyboard_arrow_left</i>
        Back
      </button>
      <q-toolbar-title class="w3-center" :padding="0">
        Profile
      </q-toolbar-title>
    </div>
    <div class="layout-view">
      <div class="w3-margin"></div>
      <div class="w3-container" :margin="0">

        <div class="w3-container w3-white w3-padding w3-round-xlarge w3-border-2">
          <h2 class="w3-center w3-text-black w3-margin-bottom">{{user.name}}</h2>
          <div class="w3-container w3-center">
            <img width="50%" height="50%" src="../assets/user.jpg" class="w3-margin-bottom">
          </div>
          <ul class="w3-ul">
             <li>
              <span>Name: </span><input type="text" v-model="user.name">
            </li>
            <li>
              <span>Email: </span><input type="text" v-model="user.email">
            </li>
            <li>
              <span>National ID: </span><input type="text" v-model="user.national_id">
            </li>
            <li>
              <i class="fa fa-user"></i><span> Gender: </span><select class="w3-select" v-model="user.gender"><option>Male</option><option>Female</option></select>
            </li>
            <li>
               <i class="fa fa-phone"></i><span> Phone: </span><input type="text" v-model="user.phone">
            </li>
            <li>
               <i class="fa fa-address-book"></i><span> Physical Address: </span><input type="text" v-model="user.p_address">
               
            </li>
            <li>
               <i class="fa fa-road"></i><span> Street: </span><input type="text" v-model="user.street">
               
            </li>
             <li><i class="fa fa-home"></i><span> Estate: </span><input type="text" v-model="user.estate"></li>

          </ul>
        </div>
      </div>
      <div class="w3-container">
        <button @click.prevent="updateRequest(user._id)" class="glossy w3-button w3-large w3-padding w3-blue-grey w3-margin-top full-width w3-round-xlarge w3-ripple w3-text-white"><i class="fa fa-save"></i> Update</button>

      </div>

      <div class="w3-margin"></div>
    </div>

    </div>
    </div>
  </q-layout>
</template>

<script>
import axios from 'axios'
import misc from "../mixins/auxilliaryMixin"
import {Toast, Dialog } from 'quasar'
export default {
  mixins: [misc],
  data() {
    return {
      user: {},
      id: this.$route.params.id,
      canGoBack: window.history.length > 1,
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    updateRequest(id){
       let url = "http://localhost:3000/api/users/edit/" + id
      axios.put(url,this.user)
        .then(response => {         
          //console.log(response)
           Toast.create.positive("User details updated successfully!")
           this.user = response.data
        })
        .catch(e => {
          Toast.create.negative("Error occurred while updating. Check your connection.")
          console.log(e)
         
        })
    },
    getUserProfile() {
      let url = 'http://localhost:3000/api/users/' + this.$route.params.id
      // console.log(url)
      axios.get(url)
        .then(response => {
          this.user = response.data
          console.log(response.data)
        })
        .catch(e => {
          Toast.create.negative("Error encounterd. Please Check your connection.")
          //console.log(e)
        })
    }
  }
}
</script>

<style>

</style>
