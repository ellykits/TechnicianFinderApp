<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="goBack()" class="">
        <i class="on-right">keyboard_arrow_left</i>
        Back
      </button>
      <q-toolbar-title class="w3-center" :padding="0">
        Find Technicians
      </q-toolbar-title>

    </div>
    <div slot="header" class="w3-padding">
      <input class="w3-input w3-border w3-white w3-round" placeholder="Search..." v-model="searchModel" @keyup="filterDataInList()"></input>
    </div>
    <div class="layout-view">
      <div class="w3-container">
        <div class="w3-section w3-white  w3-round-xlarge w3-border-2">
          <ul id="ul-technicians" class="w3-ul glossy">
            <li class=" w3-padding-small w3-center" tappable v-bind:key="technician" v-for="technician in list_of_technicians">
              <div>
                <p id="company_name" class="text-bold">{{technician.company_name}}</p>
                <p id="cat_and_spec" class="w3-small w3-margin-0">{{technician.category}} ({{technician.speciality}})</p>
                <span class="w3-small">
                  <i class="fa fa-address-book"></i> {{technician.p_address}} <i class=" fa fa-phone"></i> {{technician.phone}}
                </span>
                <p class="w3-tiny w3-center"><button @click.prevent="addToFavorite(technician._id)" class="  push w3-round-jumbo w3-padding-medium w3-btn w3-green"><i class="fa fa-star"></i></button>
                 <button @click.prevent="viewTechnician(technician._id)" class=" w3-margin-left push w3-round-jumbo w3-padding-medium w3-btn w3-brown"><i class="fa fa-ellipsis-h"></i></button></p>
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
      searchModel:'',
      erorrs: [],
      list_of_technicians: {}
    }
  },
  created() {
    this.retrieveAllTechnicians()
  },
  methods: {
    retrieveAllTechnicians() {
      let url = "http://localhost:3000/api/service-providers/all"
      axios.get(url)
        .then(response => {
          this.list_of_technicians = response.data
          //console.log(response)
        })
        .catch(e => {
          Toast.create.negative("Loading data failed. Check your connection.")
          console.log(e)
          this.errors.push(e)
        })
    },
    addToFavorite(tid) {
      let url = 'http://127.0.0.1:3000/api/users/' + this.$route.params.id
      console.log(url)
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
    },
    viewTechnician(id){
      this.$router.push('../technician/'+ id)
    },
	filterDataInList() {		
	  //console.log(this.searchModel)
      let ul, li, i;
      this.searchModel.toLowerCase()
      ul = window.document.getElementById('ul-technicians');
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
		let li_div = li[i].querySelector('div')
		let div_p = li_div.querySelector('p')
		let company = div_p.textContent.toLowerCase()
//console.log(company)		
        if (company.indexOf(this.searchModel) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
	
  },
  computed:{
	  
  }
}
</script>

<style>

</style>
