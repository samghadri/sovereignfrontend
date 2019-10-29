export const state = ()=>({
    coins:[],
    tags: []
})


export const getters ={
    getCoin: state => state.coins,
    getTag: state => state.tags
}


export const mutations ={
    setCoin(state, payload) {
        state.coins = payload
      },
    setTag(state, payload){
        state.tags = payload
    }
}
export const actions ={
    async getCoin({ commit }, payload) {
        await this.$axios
          .get("coins", {
            params: payload
          })
          .then(success => {
            console.log("worked");
            commit("setCoin", success.data);
          });
      },
    async getTag({commit}){
        await this.$axios.get("tags")
        .then(result =>{
            console.log(result.data)
            commit("setTag", result.data)
        }).catch(err =>{
            console.log(err)
        }

        )
    }

    
}