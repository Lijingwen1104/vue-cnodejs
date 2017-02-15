<template>
  <div class="list">
    <ul>
      <li v-for="item in articleList"  @click="()=>toDetail(item.id)" >
        <img  v-bind:src="item.author.avatar_url" alt="">
        <div class="titleContent">
          <h3><span v-if="item.top" class="top">置顶</span>{{item.title}}</h3>
          <p> {{item.reply_count}}/{{item.visit_count}} 
            <span class="time">{{item.last_reply_at|formatTime}}</span>
          </p>
        </div>
        
      </li>
    </ul>
  </div>
</template>

<script>
  import fetchData from '../util/fetchData';
  import articleDetail from '../pages/ArticleDetail';
  var timeago = require("timeago.js");
  
  export default {
    name: 'child',
    props: ['section'],
    
    filters:{
      formatTime:function(time){
        var timeagoInstance = new timeago();
         return  timeagoInstance.format(time, 'zh_CN');
       
      }
    },
    data: function () {
      return {
        articleList: [],
        article:"这是list传递的文章内容"
      }
    },
    
    created: function(){
      var self = this;
      fetchData.getTopics("",1,6)
        .then(res=>{
          self.articleList=res.data;
        })
    },
    watch: {
      section: function (a) {
        // console.log(a)
        var self = this
        fetchData.getTopics(this.section, 1, 6)
          .then(res=> {
            self.articleList = res.data;
          })
      }
    },
    methods: {
      toDetail:function(id){
        
        Router.push({name:'article',params:{id:id},query:{from:'/'}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    border-bottom: 5px solid #f0f0f0;
    overflow: hidden;
    position: relative;
     width: 90%;
     margin: 0 5%;
     img{
      border-radius:0.5rem;
      display:inline-block;
      width:2.5rem;
      height:2.5rem;
      margin:0.3rem 0;
     }
     .titleContent{
       position: absolute;
       top:0;
       padding-left: 3rem;
       margin:0.3rem 0;
       width: 100%;
       box-sizing: border-box;
       h3{
         padding:0;
         margin:0;
         font-size:1rem;
         font-weight: normal;
         overflow: hidden; 
          text-overflow:ellipsis; 
          white-space: nowrap;
          width:80%;
          .top{
            color: #f3f3f3;
            background-color:#80bd01;
            font-size: 0.8rem;
            display: inline-block;
            padding: 0.2rem;
            margin: 0 0.5rem 0 0;
            border-radius: 0.15rem;
          }
       }
       p{
         margin:0px;
         padding:0.2rem 0;
         color: #b4b4b4;
         font-size: 0.9rem;
        .time{
          float: right;
        }
       }
       
     }
  }

</style>
