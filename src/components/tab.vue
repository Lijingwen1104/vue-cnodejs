<template>
  <div class="tab">
    <!--<div>当前的板块名：{{section}}</div>-->
    <!--<div @click="changeSection222">点我改变section</div>-->
    <ul>
      <li @click="clickTab(tab)" v-for="tab in tabList" v-bind:class="{active:section==tab.tabId}">
      
      {{tab.tabName}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'child',
    data: function () {
      return {
        tabList:[
          {tabId:"all",tabName:"全部"},
          {tabId:"ask",tabName:"问答"},
          {tabId:"share",tabName:"分享"},
          {tabId:"job",tabName:"招聘"},
          {tabId:"good",tabName:"精华"}
        ]
      }
    },
    props:['section'],
    methods:{
      clickTab:function(tab){
        var self = this;
        this.$emit('change',{sectionName:tab.tabId});
      },
      // changeSection222:function () {
      //   var arr=['ask','good','job','share','all'];
      //   var i =parseInt(Math.random()*arr.length);
      //   this.$emit('change',{sectionName:arr[i]})
      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tab{
  font-family:"Microsoft YaHei"
}
  .active{
    color: #f3f3f3;
    background-color:#80bd01;
  }
  ul {
    list-style-type: none;
    padding: 0;
    color: #80bd01;
    background-color:#f3f3f3;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    height: 2rem;
    line-height: 2rem;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    height: 1rem;
    line-height: 1rem;
    padding: 10px;
   
    &:nth-of-type(1){
      margin-left:1rem;
    }

  }
  
</style>
