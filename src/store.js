import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    valueSearch:'',
    valueTitle:'',
    valueText:'',
    choose:'#FFED94',
    colors:['#FFED94','#B3E2F6','#B3F6D9','#F6C1B3','#F2B3F6'],
    newNote:{},
    notes:[
      {
        title:'lorem Ipsum',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet mollis hendrerit. Quisque a est non eros congue ornare. Donec urna lectus, ultricies et enim sed, ultrices ultrices eros. Mauris porta felis erat, non fermentum lacus ullamcorper vitae. Pellentesque dolor tortor, volutpat et maximus egestas',
        date:'2019-09-19 | 14:20:23',
        color:'#FFED94',
      }
    ],
    index:'',
    panelAdd:false,
    panelEdit:false,
  },
  mutations: {
    valueSearchKey(state,event){state.valueSearch=event.target.value},
    valueTitleKey(state,event){state.valueTitle=event.target.value},
    valueTextKey (state, value) {state.valueText = value},
    addNewNote(state){
      let dateDay=new Date().toJSON().slice(0,10)
      let dateHour=new Date().toString().slice(16,25)
      state.newNote={
        title:state.valueTitle,
        text:state.valueText,
        date:dateDay+' | '+dateHour,
        color:state.choose,
      }
      if((state.valueText!=='')&&(state.valueTitle!=='')){
        state.notes.push(state.newNote)
        state.panelAdd=false;
        localStorage.setItem('NOTES', JSON.stringify(state.notes));
      }else{alert('wypełnij wszystkie pola!')}
    },
    chooseColor(state,color){
      const colorNote = document.querySelectorAll('.color')
      state.choose = color;
      let index = state.colors.indexOf(color);
      colorNote.forEach(obj => obj.style.background=0)
      colorNote[index].style.background=state.choose
    },
    showPanelAdd(state){
      state.panelAdd=!state.panelAdd;
      state.valueSearch='';
      state.valueTitle='';
      state.valueText='';
      state.choose='#FFED94';
      state.panelEdit=false
    },
    deleteNote(state,note){
      state.index=state.notes.indexOf(note);
      state.notes.splice(state.index,1);
      localStorage.setItem('NOTES', JSON.stringify(state.notes));
    },
    editNote(state,note){
      state.panelAdd=true;
      state.panelEdit=true;
      state.index=state.notes.indexOf(note);
      state.valueTitle=state.notes[state.index].title
      state.valueText=state.notes[state.index].text
      state.choose=state.notes[state.index].color;
    },
    correct(state){
      if((state.valueText!=='')&&(state.valueTitle!=='')){
        state.notes[state.index].title=state.valueTitle
        state.notes[state.index].text=state.valueText
        state.notes[state.index].color=state.choose
        state.panelAdd=false;
        state.panelEdit=false;
        state.choose='#FFED94'
        localStorage.setItem('NOTES', JSON.stringify(state.notes));
      }else{alert('wypełnij wszystkie pola!')}
    },
    pinned(state,note){
      state.index=state.notes.indexOf(note);
      state.notes.unshift(state.notes[state.index]);
      state.notes.splice(state.index+1,1);
      localStorage.setItem('NOTES', JSON.stringify(state.notes));
    },
  },
  getters:{
    filteredList:state =>{
      return state.notes.filter(note => {
        return note.title.slice(0,state.valueSearch.length).toLowerCase().includes(state.valueSearch.toLowerCase())
      })
    }
  }
})
