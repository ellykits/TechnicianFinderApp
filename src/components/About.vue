<template>
  <div>
    <q-layout>
      <div slot="header" class="toolbar">
        <!-- opens drawer below-->
        <button @click="goBack()" class="">
          <i class="on-right">keyboard_arrow_left</i>
          Back
        </button>
        <q-toolbar-title class="w3-center" :padding="0">
          About
        </q-toolbar-title>
      </div>
      <div class="layout-view">
        <div class="w3-section w3-padding">
          <div class="w3-container w3-white w3-padding w3-round-xlarge w3-border-2">
            <h4 class="w3-center w3-text-blue-grey w3-margin-bottom text-bold">
              <i class="fa fa-info-circle fa-2x"></i> About TechyGuide</h4>
            <p class="w3-justify w3-text-blue">Tech Guide is a mobile application that helps you find and book for services from technicians on the fly. You dont have to look for the posters anymore. Find a technician just with a click of a button. Search and Book Service at the comfort of your home. Have fun!! </p>
          </div>
        </div>

      </div>

    </q-layout>
  </div>
</template>

<script>
import misc from "../mixins/auxilliaryMixin"

export default {
  data() {
    return {}
  },
  mixins:[misc]
}
</script>

<style>

</style>
