<template>
  <div class="add-note">
      <input :value="valueTitle" @keyup="valueTitleKey" placeholder="Tytuł" type="text" class="title">
      <textarea v-model="valueText" name="text" id="text" placeholder="Text" wrap="hard"></textarea>
      <div class="colors" v-for="(color,value) in colors" :key="value">
          <div @click="chooseColor(color)" class="color" :style="(`border:3px solid ${color};`)"></div>
      </div>
      <button v-if="panelEdit===false" @click="addNewNote" class="btn-add">Dodaj</button>
      <button v-if="panelEdit===true" @click="correct" class="btn-correct">Potwierdź</button>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
  name: 'AddNote',
  computed:{
    ...mapState([
        'valueTitle',
        'colors',
        'newNote',
        'panelEdit',
        'choose'
    ]),
    valueText:{
      get () {return this.$store.state.valueText},
      set (value) {this.$store.commit('valueTextKey', value)},
    }
  },
  methods:{
    ...mapMutations([
        'valueTitleKey',
        'addNewNote',
        'chooseColor',
        'correct'
      ]),
  }
}
</script>
<style scoped lang="scss">
@mixin focus {
  transform: scale(1.05);
  transform: translateY(-5px);
}
.add-note{
  z-index: 998;
  position: fixed;
  transform:translate(-50%,-50%);
  left:50%;
  top:30%;
  background: white;
  width: calc(10% + 230px);
  margin:auto;
  margin-top:20px;
  border:3px solid black;
  padding: 10px;
  .title{
    font-style: italic;
    width: 100%;
    margin-top:10px;
    background: 0;
    outline:0;
    border:0;
    font-size :15px;
    border-bottom:1px solid gray;
    padding: 3px;
    transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);  
  }
  #text{
    padding: 3px;
    margin-top:20px;
    width: 100%;
    height: 15vh;
    outline:0;
    font-size :15px;
    font-style: italic;
    border:1px solid gray;
    transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
    margin-bottom:5px;
  }
  #text:focus{@include focus}
  .title:focus{@include focus}
  .colors{
    display: block;
    float: right;
    .color{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-left:3px;
      transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
    }
    .color:hover{
      transform: scale(1.2);
      cursor: pointer;
    }
  }
  button{
    background: 0;
    outline:0;
    border:2px solid black;
    padding:3px 5px;
    font-weight: bold;
    font-size: 15px;
    transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
  }
  button:hover{
      cursor:pointer;
      background: black;
      color:white;
      transform: scale(1.1);
      box-shadow:3px 3px 5px gray;
  }
}
</style>
