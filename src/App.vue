<script setup lang="ts">
import BaseNav from './components/BaseNav.vue';
import BaseSideNav from './components/BaseSideNav.vue';

import { useStore } from 'vuex'

const store = useStore()
</script>

<template>
  <div class="app">
    
    <div class="nav" v-if="store.state.screenSize">
      <BaseNav />
    </div>

    <div class="main" style="display: flex;">

      <!-- <div v-if="true" class="side"> -->
      <div v-if="store.state.screenSize" class="side">
        <BaseSideNav />
      </div>

      <div class="conte" style="flex:1;">
        <router-view></router-view>
      </div>

    </div>

  </div>
</template>

<style>
* {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;

  /* padding: 40px 0; */
}

</style>

