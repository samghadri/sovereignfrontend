export const state = () => ({
    coins: [],
    tags: [],
    error: null,
})


export const getters = {
    getCoin: state => state.coins,
    getTag: state => state.tags,
    getError: state => state.error,
    getToken:() => window.$nuxt.$cookies.get('token'),
    getName:() => window.$nuxt.$cookies.get('username'),
}


export const mutations = {
    setCoin(state, payload) {
        state.coins = payload
    },
    setTag(state, payload) {
        state.tags = payload
    },
    setError(state, payload) {
        state.error = payload
      },
      setCookie(state, payload) {
        window.$nuxt.$cookies.set('token', payload, {
          path: '/',
        })
      },
      setName(state, payload) {
        window.$nuxt.$cookies.set('username', payload, {
          path: '/',
        })
      },
}
export const actions = {
    async getCoin({ commit, getters }, payload) {
        await this.$axios
            .get("coins", {
                // headers: {'Authorization':'Token ' +getters.getToken},
                params: payload
            })
            .then(success => {
                console.log("worked");
                commit("setCoin", success.data);
            }).catch(err =>{
              commit('setError', err.message)
            });
    },
    async getTag({ commit }) {
        await this.$axios.get("tags")
            .then(result => {
                console.log(result.data)
                commit("setTag", result.data)
            })
    },

    postContactForm({commit}, payload){
        this.$axios.post("contact", payload).then(res=>{
            console.log("message sent")
        }).catch(err=>{
            console.log(err)
        })
    },
    postCoinOffer({commit}, payload){
        this.$axios.post("coin-offer", payload).then(res=>{
            console.log("offer made")
        }).catch(err=>{
            console.log(err)
        })
    },
    Login({commit}, payload){
        this.$axios.post("user/token", payload).then(res=>{
            console.log(res)
            commit('setCookie', res.data.token);
            commit('setName', payload.username);
              location.replace('/sovereigns')
        }).catch(err=>{
            console.log(err)
        })
    },
    createUser({commit}, payload){
        this.$axios.post('user/create', payload).then(res=>{
            console.log("user created")
        })
    }



}