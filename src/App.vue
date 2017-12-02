<template>
  <div id="app">
     <header>
      <label>My Survey</label>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app header {
  color: white;
  height: 60px;
  background-color: #00BF6F;
  font-size: 30px;
  padding-left: 10px;
  text-align:left;
  padding-top: 10px;
}
</style>
