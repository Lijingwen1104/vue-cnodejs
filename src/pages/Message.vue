<template>
    <div class="message">
        <div class="back">
            消息
        </div>
        <div v-if="isLogin">
            <div class="tabs">
                <div v-for="item in tabs" @click="changeTab(item.tabId)" 
                v-bind:class="{active:now==item.tabId}"
                 >
                    {{item.tabName}}
                </div>
            </div>
            <ul class="messagesList" v-bind:class="now" >
                <li v-for="item in messages[now]"  @click="()=>toDetail(item.topic.id)">
                    <img v-bind:src="item.author.avatar_url" alt="">
                    <span class="name">{{item.author.loginname}}</span>
                    <span class="time">{{item.reply.create_at|formatTime}}</span>
                    <p class="title">回复了您的话题 {{item.topic.title}}</p>
                </li>
                
            </ul>
            <p v-if="noMessage" class="noMessage">没有未读消息</p>
        </div>
        <p class="tologin" v-if="!isLogin">
            您还没有登陆，请<span @click="tologin">登录</span>
        </p>
        <foot  footId="message" ></foot>
    </div>
</template>
<script>
import foot from '../components/footer.vue';
import fetchData from '../util/fetchData';
var timeago = require("timeago.js");

export default{
    name:'message',
    filters:{
      formatTime:function(time){
        var timeagoInstance = new timeago();
         return  timeagoInstance.format(time, 'zh_CN');
       
      }
    },
    data:function(){
        return{
            isLogin:!!localStorage.accesstoken,
            messages:{},
            tabs:[
                {tabId:"hasnot_read_messages",tabName:"未读消息"},
                {tabId:"has_read_messages",tabName:"已读消息"}
            ],
            now:"hasnot_read_messages",
            noMessage:false
        }
    },
    created:function(){
        var self=this;
        if(this.isLogin){
            var accesstoken=localStorage.accesstoken;
            fetchData.getMessages(accesstoken,false)
                .then(res=>{
                    self.messages=res.data;
                    if(res.data.hasnot_read_messages.length==0){
                        this.noMessage=true;
                    }
                })
            
        }
        
    },
    components:{
        foot
    },
    methods:{
        tologin:function(){
            Router.push({path:'login',query:{from:'/message'}})
        },
        changeTab(tabId){
            this.now=tabId;
        },
        toDetail:function(id){
            fetchData.getTopicInfo(id)
                .then(res => {
                    if (res&&res.success) {
                        Router.push({name:'article',params:{id:id},query:{from:'/'}})
                    }else{
                        alert('话题不存在');
                    }
                        
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }
}
</script>
<style scoped lang="scss">
$green:#80bd01;
.message{
    padding-bottom: 4rem;
}
.back{
    position: relative;
    span{
        position: absolute;
        right: 2rem;
    }
}
.tologin{
margin-top: 1rem;
text-align: center;
span{
    color:$green;
    padding: 0.5rem;
}
}
.tabs{
   div{
        background-color: #eee;
        border-bottom: 6px solid #eee;
        padding:0.5rem 0;
        display: inline-block;
        width: 50%;
        text-align: center;
        box-sizing: border-box;
        display: inline-block;
        float: left;
    }
    .active{
        border-bottom: 6px solid $green;
    }
}
.messagesList{
    li{
        border-bottom:2px solid #d2d2d2;
        img{
            border-radius: 50%;
            width:120px;
            height: 120px;
            vertical-align:middle;
            margin:0.5rem;
        }
        .name{
            font-size: 0.8rem;
        }
        .time{
            color:#d2d2d2;
            font-size: 0.8rem;
        }
        .title{
            font-size: 0.8rem;
            padding:   0 0 0 3.5rem;
            margin:-0.5rem 0 0.5rem 0;
        }
        
    }
}
.hasnot_read_messages{
    p{
        position: relative;
        &:before{
            content:"·";
            font-weight: bolder;
            padding-right: 0.5rem;
            color:red;
            position: absolute;
            left:2.8rem;
        }
    }
}
.noMessage{
    margin: 0;
    text-align: center;
    // line-height: 4rem;
}
</style>