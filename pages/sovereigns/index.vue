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
    <button @click="clearFilter()">Clear Filter</button>

    <div class="d-inline-block">
      <b-dropdown id="dropdown-1" text="Tags" class="m-md-2" v-if="cointags.result && cointags.result.length > 0">
        <b-dropdown-item v-for="tag in cointags.result" @click="filterByTag(tag.name)">
          {{tag.name}}
        </b-dropdown-item>
      </b-dropdown>
    </div>

    <div v-if="coins.result && coins.result.length > 0 ">
      <hr>
      <div v-for="coin in coins.result" :key="coin.id">
        <p>{{ coin.name }}</p>
        <p> <span class="font-weight-bold">year of mintage:</span>  {{ coin.year_of_mintage }}</p>
        <p><span>Metal Type:</span> {{ coin.metal_type}}</p>
        <hr>
      </div>

      <div v-if="coins.count > filters.limit" class="mt-5">
        <paginate
          v-model="currentPage"
          :page-count="totalRows"
          :click-handler="nextPage"
          :prev-text="'Prev'"
          :next-text="'Next'"
          :page-link-class="'page-link'"
          :pageClass="'page-item'"
          :prev-class="'page-item'"
          :prev-link-class="'page-link'"
          :next-class="'page-item'"
          :next-link-class="'page-link'"
          :containerClass="'pagination justify-content-center'"
        ></paginate>
        
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
      async mounted () {
    await this.$store.dispatch('getCoin', this.query ? this.query : '');
    await this.$store.dispatch('getTag');
    // let hello = [];
  // if(this.cointags && this.cointags.length > 0){
  //   console.log(this.cointags)
  // }
    
    // this.cointags.result.forEach((tag) =>{
    //   hello.push(tag.name)
    // })
    //     this.cointags.result.map((tag) =>{
    //   hello.push(tag.name)
    // })
    // console.log(hello)   
  },
  data () {
    return {
      query: this.$route.query,
      tags: [],
      filters: {
        tags: this.$route.query.tags ? this.$route.query.tags : '',
        metal_type: this.$route.query.metal_type ? this.$route.query.metal_type : '',
        limit: 2,
        offset: 0
      },
      currentPage: this.$route.query.offset !== 0 ? this.$route.query.offset / 2 + 1 : 1,
      searchText: ""
    }
  },
  computed: {
    coins () {
      return this.$store.getters.getCoin
    },
    cointags(){
      return this.$store.getters.getTag
    },
    totalRows(){
      return Math.ceil(this.coins.count / 2);
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
    async filterByTag(tag) {
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
    async filterByCoinType (coinType) {
      this.filters.metal_type = coinType
      this.$router.push({
        query: this.filters
      })
    },
    clearFilter(){
      if(this.query !== ''){
        this.$router.push({
        query: ''
      })
      }
      
    },
    async nextPage(pageNum){
          this.$router.push({
            query: Object.assign({}, this.$route.query, {offset:(this.filters.offset = 2 * pageNum - 2)}) // update the url query
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