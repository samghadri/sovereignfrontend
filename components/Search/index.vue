<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      @keydown.enter="searchButton()"
      v-model="searchText"
      placeholder="Search for Coin"
      aria-label="Search for Coin"
      aria-describedby="basic-addon2"
    >
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        type="button"
        v-on:click.prevent="searchButton()"
      >Search</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    // searchButton(){
    //     this.$emit('search', this.searchText)
    // },
    searchButton() {
      if (this.searchText !== "") {
        this.$router.push({
          path: "/sovereigns",
          query: Object.assign({}, this.$route.query, {
            searchText: this.searchText
          }) // update the url query
        },() =>{
            // this.$router.go(0)  this refreshes the page
        });
      }
    }
  }
};
</script>
