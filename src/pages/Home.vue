<template>
  <div class="home">
    <tab :section="section" v-on:change="setSection"></tab>
    <list :section="section"></list>
    <foot footId="home"></foot>
  </div>
</template>

<script>
 import fetchData from '../util/fetchData';
  import list from '../components/list.vue';
  import tab from '../components/tab.vue';
  import foot from '../components/footer.vue';
  export default {
    name: 'home',
    components:{
      list,
      tab,
      foot
    },
    created:function(){
      // console.log(Router) 
        // Router.push({name:"login"});
    },
    data: function () {
      return {
        userName: 'lijingwen',
        section:'all'  // good job
      }
    },
    methods: {
      setSection:function (data) {
        this.section=data.sectionName;
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .title {
    font-size: 2rem;
    color:#f00
  }
</style>
