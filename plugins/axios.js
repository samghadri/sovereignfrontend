export default ({$axios,app, store}) => {
  if (app.$cookies.get('token')) {
      $axios.setToken(app.$cookies.get('token'), 'Token')
  }
    $axios.onRequest((config) => {
    //   store.commit('setLoading', true, {root: true});
      store.commit('setError', null, {root: true});
      return config
    });
    $axios.onResponse((config) => {
    //   store.commit('setLoading', false, {root: true});
      store.commit('setError', null, {root: true});
      return config
    });
    $axios.onError(error => {
  //    store.commit('setLoading', false, {root: true});
  console.log("didnt work", error.message)

      store.commit('setError', error.message);
    //   setTimeout(() => {
    //     store.commit('setError', null, {root: true});
    //   }, 60000);
    })

  }
  