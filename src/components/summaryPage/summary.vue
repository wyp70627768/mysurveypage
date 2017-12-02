<template>
  <div class="container">
    <div class="Chart">
      <h1 style="text-align:center;">Survey Result</h1>
      <doughnut-example></doughnut-example>
    </div>
  </div>
</template>

<script>
  import DoughnutExample from './DoughnutExample'
  export default {
    components: {
      DoughnutExample
    }
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  h1 {
    font-family: 'Helvetica', Arial;
    color: #464646;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
  }
  .Chart {
    padding: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
  }
</style>