<template>
  <div>
    <button @click="filterByCoinType('G')">
      Gold
    </button>
    <button @click="filterByCoinType('S')">
      Silver
    </button>
    <button @click="filterByCoinType('C')">
      Copper
    </button>

    <div>
      <b-dropdown id="dropdown-1" text="Tags" class="m-md-2">
        <b-dropdown-item @click="filterByTag('shieldback')">
          Shieldback
        </b-dropdown-item>
        <b-dropdown-item>200 anniversary</b-dropdown-item>
        <b-dropdown-item @click="filterByTag('victoria')">
          Victoria
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
    await this.$store.dispatch('getCoin', this.query ? this.query : '')
  },
  data () {
    return {
      query: this.$route.query,
      tags: [],
      filters: {
        tags: this.$route.query.tags ? this.$route.query.tags : '',
        metal_type: this.$route.query.metal_type ? this.$route.query.metal_type : ''
      }
    }
  },
  computed: {
    coins () {
      return this.$store.getters.getCoin
    }
  },
  watch: {
    $route (newval) {
      this.$store.dispatch('getCoin', this.$route.query)
    }
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
    }
  }
}
</script>