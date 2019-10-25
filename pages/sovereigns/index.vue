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

    <div v-if="coins && coins.length > 0 ">
      <div v-for="coin in coins" :key="coin.id">
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
    filterByTag (tag) {
      this.tags.push(tag)
      this.filters.tags = this.tags.join('|')
      this.$router.push({
        query: this.filters
      })
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