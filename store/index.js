export const state = ()=>({
    coins:[]
})


export const getters ={
    getCoin: state => state.coins
}


export const mutations ={
    setCoin(state, payload) {
        state.coins = payload
      },
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
      }
    
}