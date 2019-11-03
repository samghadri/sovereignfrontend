<template>
  <div>
    <div class="container mt-5">
      <form>
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
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>