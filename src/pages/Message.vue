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
                    <span>{{item.author.loginname}}</span>
                    <span>{{item.reply.create_at|formatTime}}</span>
                    <p>回复了您的话题 {{item.topic.title}}</p>
                    <!--{{item.id}}-->
                </li>
                
            </ul>
        </div>
        <p class="tologin" v-if="!isLogin">
            您还没有登陆，请<span @click="tologin">登录</span>
        </p>
        <foot></foot>
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
            now:"hasnot_read_messages"
        }
    },
    created:function(){
        var self=this;
        if(this.isLogin){
            fetchData.getMessages(localStorage.accesstoken,false)
                .then(res=>{
                    self.messages=res.data;
                    console.log(self.messages+"---");
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
                        // self.article = res.data;
                        // console.log("seccess");
                        Router.push({name:'article',params:{id:id},query:{from:'/'}})
                    }else{
                        alert('话题不存在');
                    }
                        
                    console.log("hahaha")
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
        img + span{
            font-size: 0.8rem;
        }
        img + span + span{
            font-size: 0.3rem;
            color:#d2d2d2;
        }
        p{
            font-size: 0.8rem;
        }
    }
}
</style>