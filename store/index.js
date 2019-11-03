export const state = () => ({
    coins: [],
    tags: [],
    error: null,
})


export const getters = {
    getCoin: state => state.coins,
    getTag: state => state.tags,
    getError: state => state.error,
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
}
export const actions = {
    async getCoin({ commit }, payload) {
        await this.$axios
            .get("coins", {
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
            }).catch(err => {
                console.log(err)
            }

            )
    },

    postContactForm({commit}, payload){
        this.$axios.post("contact", payload).then(res=>{
            console.log("message sent")
        }).catch(err=>{
            console.log(err)
        })
    }



}