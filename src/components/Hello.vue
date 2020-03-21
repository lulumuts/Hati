<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Hati</h2>
  <div>

    <div class="m-0">Value: {{ text }}</div>
  </div>
  <div>
    <b-row align-h="center">
   <b-card no-body class="overflow-hidden" style="max-width: 540px;margin:0;display:flex;">
    <b-row align-h="center">
      <b-col md="6">
        <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Horizontal Card">
          <b-card-text>
            <b-input v-model="text" placeholder="Name"></b-input>
          <b-input v-model="text" placeholder="Password"></b-input>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
  </b-row>
</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      text: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
b-card{
  margin-left:10vh;
}

</style>
