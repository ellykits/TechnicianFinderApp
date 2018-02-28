<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="goBack()" class="">
        <i class="on-right">keyboard_arrow_left</i>
        Back
      </button>
      <q-toolbar-title class="w3-center" :padding="0">
        {{technicianDetails.company_name}}
      </q-toolbar-title>
    </div>
    <div class="layout-view">
      <div class="w3-margin"></div>
      <div class="w3-container" :margin="0">

        <div class="w3-container w3-white w3-padding w3-round-xlarge w3-border-2">
          <strong>
            <h2 class="w3-center w3-margin-bottom w3-text-brown">{{technicianDetails.company_name}}</h2>
          </strong>
          <p class="w3-small w3-center">({{technicianDetails.category}} - {{technicianDetails.speciality}}</P>
          <ul class="w3-ul">
            <li>

            </li>
            <li class="w3-light-grey">
              <span class="text-bold w3-text-brown ">
                <i class="fa fa-globe"></i> Online Details</span>
              <p class="w3-margin-0">Website: {{technicianDetails.website}}</p>
              <p class="w3-margin-0">Email: {{technicianDetails.email}} </p>
            </li>
            <li>
              <span class="text-bold w3-text-brown">
                <i class="fa fa-phone-square"></i> Phone: </span>{{technicianDetails.phone}}
            </li>
            <li>
              <span>
                Working Days: </span>{{technicianDetails.working_days}}
            </li>
            <li>
              <span>
                Working Hours: </span>{{technicianDetails.working_hrs}}
            </li>
            <li>
              <div class="w3-center w3-text-brown w3-light-grey">
                <strong>Location Address </strong>
                <div class="w3-row">
                  <div class="w3-col s4 w3-center">
                    <i class="fa"></i> Location
                  </div>
                  <div class="w3-col s4 w3-center">
                    <i class="fa "></i> County
                  </div>
                  <div class="w3-col s4 w3-center">
                    <i class="fa"></i> Country
                  </div>
                </div>
                <div class="w3-row">
                  <div class="w3-col s4 w3-center">
                    {{technicianDetails.p_address}}
                  </div>
                  <div class="w3-col s4 w3-center">
                    {{ technicianDetails.county}}
                  </div>
                  <div class="w3-col s4 w3-center">
                    {{technicianDetails.country}}
                  </div>
                </div>
              </div>
            </li>
            <li class="w3-center">
              <b>
                <span class="w3-text-brown">Products</span>
              </b>
              <p class="w3-margin-0 w3-small">{{technicianDetails.products}}</p>
              <strong class="w3-margin-0 w3-text-brown">Brands</strong>
              <p class="w3-small">{{technicianDetails.brands}}</p>
              <strong class="w3-margin-0 w3-text-brown">Offer Warranty?
              </strong>
              <span>{{technicianDetails.warranty}}</span>
            </li>
            <li class="w3-center w3-light-grey">
              <strong class="w3-text-brown">Services</strong>
              <p class="w3-margin-0 w3-small">{{technicianDetails.services}}</p>
              <strong class=" w3-margin-0 w3-text-brown">Place where service is offered</strong>
              <p class="w3-margin-0 w3-small">{{technicianDetails.service_location}}</p>

            </li>

          </ul>
        </div>
      </div>
      <div class="w3-container">
        <button @click.prevent="submitRequest" class="glossy w3-button w3-large w3-padding w3-blue-grey w3-margin-top full-width w3-round-xlarge w3-ripple w3-text-white">Request Service</button>
        <button @click.prevent="addToFavorite(technicianDetails._id)" class="glossy w3-button w3-large w3-padding w3-brown w3-margin-top full-width w3-round-xlarge w3-ripple w3-text-white">
          <i class="fa fa-star"></i> Add to Favorite</button>

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
import { Dialog, Toast } from 'quasar'
export default {
  mixins: [misc],
  data() {
    return {
	  technicianFavorites:[],
      technicianDetails: {},
      myFavorites: [],
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
    this.retrieveOneTechnician()
  },
  methods: {
    retrieveOneTechnician() {
      let url = "http://localhost:3000/api/service-providers/" + this.$route.params.tid
      axios.get(url)
        .then(response => {
          this.technicianDetails = response.data
          //console.log(response)
        })
        .catch(e => {
          Toast.create.negative("Loading data failed. Check your connection.")
          console.log(e)

        })
    },
    submitRequest() {
      Dialog.create({
        title: 'Request for Service',
        form: {
          task: {
            type: 'textbox',
            label: 'What service?',
            model: 'repair appliance'
          },
          item: {
            type: 'textbox',
            label: 'Name of appliance/model',
            model: ''
          },
          deadline: {
            type: 'textbox',
            label: 'Date to service (dd-mm-yyyy)',
            model: ''
          },
          description: {
            type: 'textarea',
            label: 'Comments(e.g. cause of fault)',
            model: ''
          }
        },
        buttons: [
          'Cancel',
          {
            label: 'Ok',
            handler: (data) => {
              this.newBooking.task = data.task
              this.newBooking.description = data.description
              this.newBooking.deadline = data.deadline
              this.newBooking.item = data.item
              this.postRequestToDatabase(this.newBooking)
            }
          }
        ]
      })
    },
    postRequestToDatabase(data) {
      var url = "http://127.0.0.1:3000/api/bookings/new";
      axios.post(url, data)
        .then(response => {
          if (response != null && response.status == 200) {
            Toast.create.positive("Requst posted successfully.")
            this.$router.push('../enquiries')
          }
        })
        .catch(e => {
          Toast.create.negative("Posting request failed with Internal Error. Check your connection.")
          console.log(e)
        })
    },
    addToFavorite(tid) {
	  let t_url =  'http://127.0.0.1:3000/api/service-providers/' + tid
      let url = 'http://127.0.0.1:3000/api/users/' + this.$route.params.id
      //console.log(url)
	  //get the list of favorites for the user then update favorites
      axios.get(url)
        .then(response => {
          this.myFavorites = response.data.favorites
          if(this.myFavorites.indexOf(tid) != -1){
            Toast.create.warning("Technician exists in your favs list")
            return
          }
          this.myFavorites.push(tid)
          axios.put("http://127.0.0.1:3000/api/users/edit/" + this.$route.params.id,{"favorites":this.myFavorites})
            .then(response => {				
				
				 axios.get(t_url)
					.then(response => {
					  this.technicianFavorites = response.data.subscribers
					
					  this.technicianFavorites.push(this.id)
					  axios.put('http://127.0.0.1:3000/api/service-providers/' + tid,{"subscribers":this.technicianFavorites})
						.then(response => {
							  Toast.create("Added to favorite list successfully!")
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
		
    }
  }
}
</script>

<style>

</style>
