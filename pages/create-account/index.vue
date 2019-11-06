<template>
  <div>
    <form v-on:submit.prevent="submitForm()">
        <div class="form-group">
        <label for="exampleInputusername1">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputusername1"
          placeholder="Enter username"
          v-model="Username"
        >
      </div>

      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="emailAddress"
        >
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="passWord"
        >
      </div>
      <button type="submit" class="btn btn-primary" :disabled="showCondfirmation == true">Submit</button>
    </form>
        <p v-if="error && error.username" class="mt-5">{{ error.username.toString() }}</p>
        <p v-if="showCondfirmation">thanks for your submission</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Username: "",
      passWord: "",
      emailAddress: "",
      showCondfirmation:false
    };
  },
  computed:{
      error(){
      return this.$store.getters.getError
    }
  },
  methods: {
    submitForm() {
      let data = {
        username: this.Username,
        password: this.passWord,
        email: this.emailAddress
      };
      this.$store.dispatch("createUser", data);
      this.showCondfirmation = true;
    }
  }
};
</script>