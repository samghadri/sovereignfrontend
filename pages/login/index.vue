<template>
  <div>
    <div class="mt-5">
      <form v-on:submit.prevent="login()">
        <div class="form-group">
          <label for="fullname">Username</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            aria-describedby="emailHelp"
            placeholder="Enter Full Name"
            v-model="Username"
          >
        </div>
        <div class="form-group">
          <label for="fullname">password</label>
          <input
            type="password"
            class="form-control"
            id="fullname"
            aria-describedby="emailHelp"
            placeholder="Enter Full Name"
            v-model="Password"
          >
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            Password: '',
            Username: '',
        }
    },
    methods:{
        login(){
            this.$store.dispatch('Login', {username:this.Username, password:this.Password})
        }
    }
}
</script>
