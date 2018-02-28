<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <!-- opens drawer below-->
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>

      <q-toolbar-title class="w3-center" :padding="0">
        Dashboard
      </q-toolbar-title>
    </div>

    <!-- Drawer-->
    <q-drawer ref="drawer">
      <div class="toolbar">
        <q-toolbar-title>
          Navigation
        </q-toolbar-title>
      </div>
      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="person" :to="{path:paths.profile, exact:true}">
          My Profile
        </q-drawer-link>
        <q-drawer-link icon="dashboard" :to="{path:paths.bookings, exact:true}">
          My Requests
        </q-drawer-link>
        <q-drawer-link icon="start" :to="{path:paths.favorites, exact:true}">
          Favorites
        </q-drawer-link>
        <q-drawer-link icon="people" :to="{path:paths.technicians, exact:true}">
          Find Technicians
        </q-drawer-link>
        <q-drawer-link icon="info" :to="{path:paths.about, exact:true}">
          About
        </q-drawer-link>
        <q-drawer-link icon="fa fa-sign-out" :to="{path:paths.logout, exact:true}">
          Logout
        </q-drawer-link>
      </div>
    </q-drawer>

    <div class="layout-view w3-padding">
      <div v-if="user.national_id ===''" class="w3-section ">
        <div class="w3-container w3-white w3-padding w3-round-xlarge w3-border-2">
          <h4 class="w3-center w3-text-blue-grey w3-margin-bottom text-bold">
            <i class="fa fa-info-circle fa-2x"></i> Welcome {{user.name}}</h4>
          <p class="w3-center w3-text-blue"> It seems its your first time to login please update your details</p>
        </div>
      </div>

      <div class="w3-section ">
        <div class="w3-container w3-white w3-padding w3-round-xlarge w3-border-2">
          <h4 class="w3-center w3-text-brown w3-margin-bottom text-bold">
            TechyGuide</h4>
          <p class="w3-justify w3-text-grey">Technicians from your favorites list.
          Click more button to show more information about your favorite technician</p>
        </div>
      </div>
		<div v-if="list_of_technicians.length === 0" class="w3-section">
        <div class="w3-container w3-white w3-padding w3-round-xlarge w3-border-2">
          <h4 class="w3-center w3-text-red w3-margin-bottom text-bold">
            <i class="fa fa-info-circle fa-2x"></i> No favorite</h4>
          <p class="w3-center w3-text-black"> You have not added any technicians in your favorites list.</p>
        </div>
      </div>
      <div class="w3-section w3-white  w3-round-xlarge w3-border-2">
        <ul class="w3-ul glossy">
          <li class=" w3-padding-small w3-center" tappable v-bind:key="technician" v-for="technician in list_of_technicians">
            <div>
              <strong>{{technician.company_name}}</strong>
              <p class="w3-small w3-margin-0">{{technician.category}} ({{technician.speciality}})</p>
              <span class="w3-small">
                <i class="fa fa-address-book"></i> {{technician.p_address}}
                <i class=" fa fa-phone"></i> {{technician.phone}}
              </span>
              <p class="w3-tiny w3-center">
                <button @click="removeFromFavorites(technician._id)" class="  push w3-round-jumbo
                 w3-padding-medium w3-btn w3-red">
                  <i class="fa fa-trash"></i>
                </button>
                <button @click="viewTechnician(technician._id)" class=" w3-margin-left push w3-round-jumbo
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
  </q-layout>
</template>

<script>
import axios from 'axios'
import {Toast, Dialog} from 'quasar'
export default {
  created() {
    this.getUserProfile()
    this.getFavoriteTechnicians()
  },
  data() {
    return {
	    user_id: this.$route.params.id,
      paths: {
        about: "./" + this.$route.params.id + "/about/",
        logout: "/",
        profile: "./" + this.$route.params.id + "/profile/",
        bookings: "./" + this.$route.params.id + "/enquiries/",
        favorites: "./" + this.$route.params.id + "/favorites/",
        technicians: "./" + this.$route.params.id + "/technicians/"
      },
      user: {},
      list_of_technicians: []
    }
  },
  methods: {
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
    },
    getFavoriteTechnicians() {
      let url = 'http://127.0.0.1:3000/api/users/' + this.$route.params.id
      console.log(url)
      axios.get(url)
        .then(response => {
          this.myFavorites = response.data.favorites
          this.myFavorites.forEach(fav => {
            // let data = this.retrieveOneTechnician(fav)
            // this.list_of_technicians.push(data)
            //console.log()
            axios.get("http://localhost:3000/api/service-providers/" + fav)
              .then(response => {
                //console.log(response.data)
                this.returned_data = response.data
                this.list_of_technicians.push(this.returned_data)
              })
              .catch(e => {
                Toast.create.negative("Loading data failed. Check your connection.")
                console.log(e)

              })
          })

        })
        .catch(e => {
          alert(e)
          Toast.create.negative("Error fetching favs. Please Check your connection.")
          console.log(e)
        })
    },
    retrieveOneTechnician(tid) {

      let url = "http://localhost:3000/api/service-providers/" + tid
      axios.get(url)
        .then(response => {
          console.log(response.data)
          this.returned_data = response.data
          //return this.returned_data
        })
        .catch(e => {
          Toast.create.negative("Loading data failed. Check your connection.")
          console.log(e)

        })

    },
    removeFromFavorites(tid) {
      let url = 'http://127.0.0.1:3000/api/users/' + this.$route.params.id
      console.log(url)
      axios.get(url)
        .then(response => {
          this.myFavorites = response.data.favorites
          let index = this.myFavorites.indexOf(tid)
          this.myFavorites.splice(index, 1)
          axios.put("http://127.0.0.1:3000/api/users/edit/" + this.$route.params.id, { "favorites": this.myFavorites })
            .then(response => {
              Toast.create("Remove from favorite list successfully!")
            })
            .catch(e => {
              Toast.create.negative("Error updating favs . Please Check your connection.")
              console.log(e)
            })

        })
        .catch(e => {
          alert(e)
          Toast.create.negative("Error fetching favs. Please Check your connection.")
          console.log(e)
        })
    },
    viewTechnician(id) {
      this.$router.push('./' + this.$route.params.id + '/technician/'+id)
    }
  }
}
</script>

<style>

</style>
