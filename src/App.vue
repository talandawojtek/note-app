<template>
  <div id="app">
    <Search/>
    <AddNote v-if="panelAdd===true"/>
    <AddedNote/>
  </div>
</template>

<script>
import AddNote from './components/AddNote.vue';
import Search from './components/Search.vue';
import AddedNote from './components/AddedNote.vue';
import { mapState } from 'vuex';
export default {
  name: 'app',
  components: {
    Search,
    AddNote,
    AddedNote
  },
  computed: mapState([
    'panelAdd'
  ])
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,700i&display=swap');
body{
  background: rgba(0, 0, 0, 0.075);
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}
#app {
  margin:5px 10px;
}
</style>
