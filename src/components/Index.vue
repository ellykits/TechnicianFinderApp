<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title class="w3-center" :padding="0">
        Techy Guide
      </q-toolbar-title>
    </div>

    <!--
        Replace following "div" with
        "<router-view class="layout-view">" component
        if using subRoutes
      -->
    <div class="layout-view">
      <div class="w3-margin"></div>
      <div class="w3-container">
        <div id="formdiv">
          <form id='login' class="w3-white w3-container w3-text-brown text-bold w3-padding w3-round-xlarge w3-border-2">
            <h3 class="w3-center w3-text-black w3-margin-bottom">Technician Finder  App</h3>
            <i class="fa fa-user-circle "><label class="w3-medium text-bold"> Email</label>
            </i><input class="w3-input " v-model="username" type="text" ref="email">
             <i class="fa fa-lock "></i><label class=" w3-medium"> Password</label>
            <input class="w3-input" v-model="password" type="password" ref="password">
            <div class="w3-margin"></div>
            <button @click.prevent="loginUser" class="glossy w3-button w3-large w3-padding w3-blue-grey w3-margin-top full-width w3-round-xlarge w3-ripple w3-text-white"> <i class="fa fa-sign-in "></i> SIGN IN</button>
            <div class="w3-section">
              <router-link to="/register/" class="w3-text-blue-grey w3-hover-text-white">Click Here</router-link> to register
            </div>
            <div class="w3-margin"></div>
          </form>
        </div>

      </div>
    </div>
    <router-view class="layout-view"></router-view>
    <div slot="footer"></div>
  </q-layout>
</template>

<script>
import axios from "axios"
import { Toast, Dialog } from "quasar"
import misc from "../mixins/auxilliaryMixin"

export default {
  mixins: [misc],
  data() {
    return {
      name: 'index',
      responseData: [],
      errors: [],
      username: '',
      password: '',
      newUsersRef: null
    }
  },
  methods: {
    loginUser() {
      if (!this.validateSentData()) {
        Dialog.create({
          title: 'Email required',
          message: 'The password and email cannot be left empty.'
        })
      }
      if (!this.validateEmail()) {
        Toast.create.warning("Please enter a valid email address.")
      }
      if (this.validateSentData() && this.validateEmail()) {

        let url = 'http://127.0.0.1:3000/api/users?id=' + this.$refs.email.value + '&pass=' + this.$refs.password.value
        //console.log('url is' + url)
        axios.get(url)
          .then(response => {
            if (response != null) {
              //console.log(response.data)
              if (response.data.email === this.$refs.email.value && response.data.password === this.$refs.password.value) {
                this.$router.push('/dashboard/' + response.data._id)
                // alert('we are ready to go')
              } else {
                  Dialog.create({
                    title: 'Login Failed',
                    message: 'Either the password or email is INCORRECT!'
                  })
              }
            } else {
              Dialog.create({
                    title: 'Login Failed',
                    message: 'Either the password or email is INCORRECT!'
                  })
            }
          })
          .catch(e => {
            Toast.create.negative("Error encounterd. Please Check your connection.")
            console.log(e)
          })
      }
    },
    validateSentData() {
      if (this.$refs.password.value != '' && this.$refs.email.value != '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
#formdiv{
  opacity:0.95;
}
#login{
   /*background-image:url('../assets/bg3.jpg');
   background-position: center;*/
}
</style>
