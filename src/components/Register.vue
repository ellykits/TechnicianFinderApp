<template>
  <q-layout>
    <div slot="header" class="toolbar">
     <button @click="goBack()" class="">
        <i class="on-right">keyboard_arrow_left</i>
        Back
      </button>
      <q-toolbar-title class="w3-center" :padding="0">
        Sign Up
      </q-toolbar-title>
    </div>
    <div class="layout-view">
      <div class='w3-margin'></div>
      <p class="w3-padding w3-text-white w3-center ">Please enter all the details</p>
      <form v-on:submit.prevent="addNewUser" class="w3-container w3-section w3-white w3-round-xlarge w3-margin w3-padding">
        <label>Full Name</label>
        <input class="w3-input w3-border-1" type="text" v-model="newUser.name">
        <label>Registered Email</label>
        <input required class="w3-input w3-border-1" ref="email" type="email" v-model="newUser.email">
        <label>New Password</label>
        <input class="w3-input w3-border-1" ref="password" type="password" v-model="newUser.password">
        <label>Confirm Password</label>
        <input class="w3-input w3-border-1" ref="cpassword" type="password">

      </form>
      <div class=" w3-padding">
        <button @click.prevent="addNewUser()" class="glossy w3-button w3-large w3-padding w3-blue-grey w3-margin-top full-width w3-round-xlarge w3-ripple w3-text-white"><i class="fa fa-save"></i> SAVE</button>
      </div>
    </div>
  </q-layout>
</template>

<script>

import axios from "axios"
import { Toast, Dialog } from 'quasar'
import misc from "../mixins/auxilliaryMixin"

export default {
  mixins: [misc],
  data() {
    return {
      errors: [],
      responseData: [],
      newUser: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    addNewUser() {
      if (!this.validateEmail()) {
        Toast.create.warning("Please enter a valid email address.")
      }
      if (!this.validateSentData()) {
        Dialog.create({
          title: 'Email, Name and Password Required',
          message: 'The name, password and email cannot be left empty.'
        })
      }
      if (this.checkPasswordConfirmation() && this.validateSentData() && this.validateEmail()) {
        console.log("[+] We are saving the new user to the database...")
        //Here i used axios but i will be using firebase instead
        var url = "http://127.0.0.1:3000/api/users/add";
        // this.newUser.password = md5(this.newUser.password)
        axios.post(url, this.newUser)
          .then(response => {
            if (response != null && response.status==200) {
              Toast.create.positive("Registration has been successfull. Please login.")
              //console.log(response)
              this.$router.push('/')
            }
          })
          .catch(e => {
            Toast.create.negative("Registration failed with Internal Error. Check your connection.")
            console.log(e)
            this.errors.push(e)
          })
      }
    },
    checkPasswordConfirmation() {
      if (this.$refs.password.value != this.$refs.cpassword.value) {
        Dialog.create({
          title: 'Password mismatch',
          message: 'The password confirmation is incorrect.'
        })
        return false
      }
      return true
    },
    validateSentData() {
      if (this.$refs.password.value != '' && this.$refs.cpassword.value != '' && this.$refs.email.value != '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
label {
  font-weight: bold;
}
</style>
