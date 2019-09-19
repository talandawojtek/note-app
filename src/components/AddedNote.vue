<template>
  <div class="added-panel">
      <div class="notes" v-for="(note,value) in filteredList" :key="value">
        <transition name="fade">
        <div class="note" :style="(`background:${note.color}`)">
            <h1>{{note.title}}</h1>
            <pre class="mt-3 mb-0" wrap='hard' >{{ note.text }}</pre>
            <span>{{note.date}}</span>
        </div>
        </transition>
            <div class="panel-option">
              <button @click="editNote(note)" class="edit">Edytuj</button>
              <button @click="deleteNote(note)" class="delete">Usuń</button>
              <button @click="pinned(note)" class="pinned">Do góry</button>
            </div>
      </div>
      <button @click="showPanelAdd" class="btn-add">
        <strong class="plus" v-if="panelAdd===false">+  </strong>
        <strong class="cancel" v-if="panelAdd===true">Zamknij</strong>
      </button>
  </div>
</template>

<script>
import { mapState,mapMutations,mapGetters } from 'vuex';
export default {
  name: 'AddedNote',
  computed:{
    ...mapGetters(['filteredList']),
    ...mapState(['notes','panelAdd',]),
  },
  methods:{
    ...mapMutations([
        'deleteNote',
        'editNote',
        'pinned',
        'showPanelAdd'
      ]),
  },
  mounted() {
    if(JSON.parse(localStorage.getItem('NOTES'))!==null)
    {this.$store.state.notes=JSON.parse(localStorage.getItem('NOTES'))}
  },
}
</script>
<style scoped lang="scss">
.added-panel{
  font-size :15px;
  margin-bottom:50px;
  @media (min-width: 600px){
    display: grid;
    grid-template-columns: 1fr 1fr;
  } 
  @media(min-width:1024px){grid-template-columns: 1fr 1fr 1fr;}
  @media(min-width: 1366px){grid-template-columns: 1fr 1fr 1fr 1fr;}
  margin-top:20px;
  .notes{
    margin:auto;
    width: calc(10% + 230px);
    display:grid;
    .note{
      min-height: calc(10vh + 100px);
      margin-top:20px;
      padding: 5px;
      box-shadow:3px 3px 5px rgba(128, 128, 128, 0.479);
      transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
      h1{
        font-size:21px;
        font-style: italic;
        margin-bottom:7px;
      }
      pre{
        font-style: italic;
      }
      span{
        float: right;
        font-size:11px;
        margin:10px 0;
      }
    }
    .panel-option{
      justify-content: right;
      margin-left:-5px;
      margin-top:-10px;
      position: absolute;
      position: relative;
      button{
        transform: scale(1.1);
        margin-right: 15px;
        background: rgb(0, 0, 0);
        color:white;
        outline:0;
        border:1px solid black;
        padding:3px 5px;
        font-weight: bold;
        transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
        box-shadow:3px 3px 5px gray;
      }
      .pinned{
        background: white;
        border:1px solid white;
        color:black;
      }
      button:hover{
        cursor:pointer;
        background: rgb(255, 255, 255);
        color:rgb(0, 0, 0);
        transform: scale(1.2);
        box-shadow:3px 3px 5px gray;
        border:1px solid white;
      }
    }
  }
  .btn-add{
  padding: 30px 60px;
  margin:auto;
  display:flex;
  justify-content: center;
  background: 0;
  border:0;
  outline: 0;
  font-size: 35px;
  font-weight: bold;
  transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
  .cancel{
    border:3px solid black;
    top:55%;
    left:50%;
    font-size: 15px;
    position: fixed;
    transform: translate(-50%,-50%);
    background: white;
    padding:3px 5px;
    z-index:999;
    @media(min-width:600px){
      top:60%;
    }
    @media (min-width: 768px){
      top:48%;
    }
    }
  }
  .btn-add:hover{cursor:pointer;}
}
</style>
