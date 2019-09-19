<template>
  <div class="search-panel">
    <span>
      <input class="search" placeholder="Szukaj..." :value="valueSearch" @keyup="valueSearchKey"/>
    </span>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
  name: 'Search',
  computed:mapState([
    'valueSearch',
  ]),
  methods:{
    ...mapMutations([
        'valueSearchKey',
      ]),
  }
}
</script>
<style scoped lang="scss">
  .search-panel{
    margin-top:30px;
    text-align: center;
    span{
      .search{
        width: calc(10% + 230px);
        border:1px solid rgba(0, 0, 0, 0.212);
        padding:0 0 3px 0;
        font-size: 15px;
        padding:2px 5px;
        border-radius: 2px;
        background: rgb(255, 255, 255);
        transition: all .2s cubic-bezier(0, 0, 0.55, 1.71);
      }
      .search::placeholder{font-size: 15px;}
      .search:focus{
        transform: translateY(-20%);
      }
    }
  }
</style>
