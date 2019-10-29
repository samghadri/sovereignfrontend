<template>
  <div class="container">
    <div>
      <input class="mt-5 mb-5" type="text" style="height: 2.3rem;" @keydown.enter="searchButton()" v-model="searchText">
      <button class="btn btn-success d-inline-block" v-on:click.prevent="searchButton()">Search</button>
    </div>
    <button class="btn btn-primary" @click="filterByCoinType('G')">
      Gold
    </button>
    <button class="btn btn-primary" @click="filterByCoinType('S')">
      Silver
    </button>
    <button class="btn btn-primary" @click="filterByCoinType('C')">
      Copper
    </button>

    <div class="d-inline-block">
      <b-dropdown id="dropdown-1" text="Tags" class="m-md-2" v-if="cointags.result && cointags.result.length > 0">
        <b-dropdown-item v-for="tag in cointags.result" @click="filterByTag(tag.name)">
          {{tag.name}}
        </b-dropdown-item>
      </b-dropdown>
    </div>

    <div v-if="coins.result && coins.result.length > 0 ">
      <div v-for="coin in coins.result" :key="coin.id">
        <p>{{ coin.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
      async mounted () {
    await this.$store.dispatch('getCoin', this.query ? this.query : ''),
    await this.$store.dispatch('getTag')
  },
  data () {
    return {
      query: this.$route.query,
      tags: [],
      filters: {
        tags: this.$route.query.tags ? this.$route.query.tags : '',
        metal_type: this.$route.query.metal_type ? this.$route.query.metal_type : ''
      },
      searchText: ""
    }
  },
  computed: {
    coins () {
      return this.$store.getters.getCoin
    },
    cointags(){
      return this.$store.getters.getTag
    }
  },
  watch: {
    $route (newval) {
      this.$store.dispatch('getCoin', this.$route.query)
    },

      // this is just another way of searching without using button submit - this will watch the input and as you type it will search

    // searchText(){
    //   if(this.searchText !== ""){
    //     this.$router.push({
    //         query: Object.assign({}, this.$route.query, {searchText: this.searchText}) // update the url query
    //       })
    //   }else{
    //     this.$router.push({
    //         query: Object.assign({}, this.$route.query, {searchText: null}) // update the url query
    //       })
    //   }
    // }
  },

  methods: {
    filterByTag(tag) {
        if (this.tags.includes(tag)) { // check if the tags exists already
          this.tags.splice(this.tags.indexOf(tag), 1); // remove the string from the array if it matches
          this.$router.push({
            query: Object.assign({}, this.$route.query, {tags: this.tags.join('|')}) // update the url query
          })
        } else {
          this.tags.push(tag); // push the value to the tags array
          this.$router.push({
            query: Object.assign({}, this.$route.query, {tags: this.tags.join('|')}) // update the url query
          })
        }
      },
    filterByCoinType (coinType) {
      this.filters.metal_type = coinType
      this.$router.push({
        query: this.filters
      })
    },
    searchButton(){
      if(this.searchText !== ""){
        this.$router.push({
            query: Object.assign({}, this.$route.query, {searchText: this.searchText}) // update the url query
          })
      }
    }
  }
}
</script>