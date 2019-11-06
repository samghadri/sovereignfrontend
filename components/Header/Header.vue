<template>
<div class="header-gradient">
  <b-navbar class="header-gradient" sticky toggleable="lg" type="dark"
            variant="info">

    <b-navbar-brand href="/">
          <img src="/img/george-v-logo.png" class="header-logo-ctr" alt="">
        </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto mr-auto font-weight-bold">
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/wanted">Wanted coins</b-nav-item>
        <b-nav-item href="/sovereigns">Sovereigns</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
        <b-nav-item href="/contact">Contact</b-nav-item>
        <b-nav-item href="/login" v-if="!getToken">Login</b-nav-item>
        <b-nav-item @click="logout()" v-if="getToken">Logout</b-nav-item>
        <b-nav-item href="/create-account" v-if="!getToken">Create Account</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-navbar-brand href="/">
          <img src="/img/edward-vii-logo.png" class="header-logo-ctr" alt="">
        </b-navbar-brand>

  </b-navbar>
    <div class="container pb-2">
     <Search v-if="this.$route.name !== 'sovereigns'"/>
  </div>
</div>
</template>

<script>
import Search from '~/components/Search'
export default {
  components:{
    Search
  },
  computed:{
    getToken(){
return this.$store.getters.getToken;
    }
  },
  methods:{
    logout(){
      this.$cookies.removeAll()
      location.replace("/login");
    }
  }
}
</script>
