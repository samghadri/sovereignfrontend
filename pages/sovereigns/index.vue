<template>
  <div>
    <!-- <div class="input-group mb-3 mt-5">
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
    </div>-->
    <Search class="mt-5"/>
    <!-- <div>
      <input class="mt-5 mb-5" type="text" style="height: 2.3rem;" @keydown.enter="searchButton()" v-model="searchText">
      <button class="btn btn-success d-inline-block" v-on:click.prevent="searchButton()">Search</button>
    </div>-->
    <button class="btn btn-info" @click="filterByCoinType('G')">Gold</button>
    <button class="btn btn-info" @click="filterByCoinType('S')">Silver</button>
    <button class="btn btn-info" @click="filterByCoinType('C')">Copper</button>

    <div class="d-inline-block">
      <b-dropdown
        id="dropdown-1"
        text="Tags"
        class="m-md-2"
        v-if="cointags.result && cointags.result.length > 0"
      >
        <b-dropdown-item v-for="tag in cointags.result" @click="filterByTag(tag.name)">{{tag.name}}</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="text-right">
      <button class="btn btn-secondary" @click="clearFilter()">Clear Filter</button>
    </div>
    <div v-if="coins.result && coins.result.length > 0 ">
      <hr>
      <div v-for="coin in coins.result" :key="coin.id">
        <div class="row mb-5">
          <div class="col-7">
            <p class="font-weight-bold" style="font-size:20px;">{{ coin.name }}</p>
          </div>
          <div class="col-3">
            <p>
              <span class="font-weight-bold">year of mintage:</span>
              {{ coin.year_of_mintage }}
            </p>
          </div>
          <div class="col-2">
            <p>
              <span class="font-weight-bold">Metal Type:</span>
              {{ getMetalType(coin.metal_type)}}
            </p>
          </div>
          <div class="col-12 mt-5 font-weight-bold">
            <p v-if="coin.description">{{ coin.description }}</p>
          </div>
          <div class="col-12 mt-5 text-center">
            <img
              v-if="coin.image_url"
              :src="coin.image_url"
              alt
              class="img-fluid"
              style="max-height:400px"
            >
          </div>
          <div class="col-12 mt-4 text-center">
            <div class="row">
              <div class="col-6">
                <p v-if="coin.grading_company">
                  <span>Grading Company:</span>
                  <span v-if="coin.grading_company === 'P'">PCCS</span>
                  <span v-else>NGC</span>
                </p>
              </div>
              <div class="col-6">
                <a
                  v-if="coin.grading_company && 
                coin.grading_company === 'P' && 
                coin.certification_code"
                  target="_blank"
                  :href="'https://www.pcgs.com/cert/'+coin.certification_code"
                >Check the certification</a>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-primary" v-on:click="showModal(coin.name, coin.id)">Make an Offer</button>
        </div>

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

    <!-- modal -->
    <b-modal id="sovModal" size="lg" centered ref="sovModal" hide-header hide-footer>
      <button
        style="margin-right:1rem;"
        type="button"
        class="close mt-2"
        @click="closeModal()"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>

      <div class="container">
        <p>Hello {{userName}}</p>
        <form v-on:submit.prevent="submitForm()" ref="offerForm">
          <div class="form-group">
            <label for="exampleInputName1">Name</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="emailHelp"
              disabled
              :value="sovModalName"
            >
          </div>
          <div class="form-group">
            <label for="exampleInputoffer1">offer</label>
            <input
              type="number"
              class="form-control"
              id="exampleInputoffer1"
              v-model="CoinOffer"
              placeholder="please enter your best offer "
            >
          </div>
          <button type="submit" class="btn btn-primary" :disabled="showCondfirmation == true">Submit</button>
        </form>
        <p v-if="showCondfirmation" class="mt-3 mb-3 fomt-weight-bold">Offer Submited</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Search from "~/components/Search";
import { BModal } from "bootstrap-vue";

export default {
  components: {
    Search,
    BModal
  },
  middleware: "auth",
  async mounted() {
    await this.$store.dispatch("getCoin", this.query ? this.query : "");
    await this.$store.dispatch("getTag");
    console.log("the query", this.$route.query);
    console.log(this.getQueryassign());
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
  data() {
    return {
      query: this.$route.query,
      tags: [],
      filters: {
        tags: this.$route.query.tags ? this.$route.query.tags : "",
        metal_type: this.$route.query.metal_type
          ? this.$route.query.metal_type
          : "",
        limit: 2,
        offset: 0
      },
      currentPage:
        this.$route.query.offset !== 0 ? this.$route.query.offset / 2 + 1 : 1,
      searchText: "",
      sovModalName: "",
      sovModalId: "",
      CoinOffer: '',
      showCondfirmation:false
    };
  },
  computed: {
    coins() {
      return this.$store.getters.getCoin;
    },
    cointags() {
      return this.$store.getters.getTag;
    },
    totalRows() {
      return Math.ceil(this.coins.count / 2);
    },
    error() {
      return this.$store.getters.getError;
    },
    userName() {
      return this.$store.getters.getName;
    }
  },
  watch: {
    $route(newval) {
      this.$store.dispatch("getCoin", this.$route.query);
    }

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
      if (this.tags.includes(tag)) {
        // check if the tags exists already
        this.tags.splice(this.tags.indexOf(tag), 1); // remove the string from the array if it matches
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            tags: this.tags.join("|")
          }) // update the url query
        });
      } else {
        this.tags.push(tag); // push the value to the tags array
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            tags: this.tags.join("|")
          }) // update the url query | gets the query key and get the last object an apend it into the new object if, key exist, then it will replace it with the new object
        });
      }
    },
    async filterByCoinType(coinType) {
      this.filters.metal_type = coinType;
      this.$router.push({
        query: this.filters
      });
    },
    clearFilter() {
      if (this.query !== "") {
        this.$router.push({
          query: ""
        });
        this.currentPage = 1;
      }
    },
    async nextPage(pageNum) {
      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          offset: (this.filters.offset = 2 * pageNum - 2)
        }) // update the url query
      });
    },

    getMetalType(result) {
      if (result === "G") {
        return "GOLD";
      } else if (result === "S") {
        return "SILVER";
      } else {
        return "COPPER";
      }
    },
    getQueryassign() {
      let tag = { tags: "hello|hi|salam" };
      let query = {
        tags: "john|dog"
      };
      console.log("before result", query);
      let result = Object.assign({}, query, tag);
      console.log("the result", result);

      return result;
    },
    showModal(sovereignName, sovereignId) {
      this.$refs.sovModal.show();
      this.sovModalName = sovereignName;
      this.sovModalId = sovereignId;
    },
    submitForm(){
      let data = {
        person: this.userName,
        offer: this.CoinOffer,
        coin: this.sovModalName
      }
      this.$store.dispatch('postCoinOffer', data);
      this.showCondfirmation = true;
      
    },
    closeModal(){
      this.$refs.offerForm.reset();
      this.showCondfirmation = false;
       this.sovModalName = ''
       this.CoinOffer=''
        this.$refs.sovModal.hide();

    },
    // IF USING LOAD MORE INSTEAD OF PAGINATION

    // getNextResults() {
    //     this.$router.push({
    //       query: Object.assign({}, this.$route.query, {
    //         limit: (this.query.limit += 3),
    //         is_channel_article: this.query.is_channel_article,
    //       })
    //     });
    //   },
  }
};
</script>