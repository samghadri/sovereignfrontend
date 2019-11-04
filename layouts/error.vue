<template>
    <div class="container">
<h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred  {{ error.statusCode}}</h1>
    <div>
        <a  href="/">Home page</a>
    </div>
    
    </div>
</template>
<script>
export default {
  props: ['error'],
}
</script>