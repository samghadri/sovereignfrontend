export default ({ app, redirect }) =>{ 
   if(!app.$cookies.get('token')){
    return redirect('/login')
   }
  }