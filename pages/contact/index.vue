<template>
  <div>
    <div class="mt-5">
      <form v-on:submit.prevent="submitForm()">
        <div class="form-group">
          <label for="fullname">Full Name</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            aria-describedby="emailHelp"
            placeholder="Enter Full Name"
            v-model="fullName"
          >
        </div>
        <div class="form-group">
          <label for="emailaddress">Email address</label>
          <input
            type="email"
            class="form-control"
            id="emailaddress"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="EmailAddress"
          >
          <small
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Example textarea</label>
          <textarea v-model="TextArea" class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
        </div>
        <p v-if="error && error.full_name">fullname: {{error.full_name.toString()}}</p>
        <p v-if="error && error.email_address">email: {{error.email_address.toString()}}</p>
        <p v-if="error && error.description">fullname: {{error.description.toString()}}</p>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      EmailAddress:'',
      fullName: '',
      TextArea:''

    }
  },
  computed:{
    error(){
      return this.$store.getters.getError
    }
  },
  methods:{
    submitForm(){
      let data ={
        full_name: this.fullName,
        email_address: this.EmailAddress,
        description: this.TextArea,

      };
      this.$store.dispatch('postContactForm', data);
      this.$router.push('/thankyou');

    }

  }
}
</script>
