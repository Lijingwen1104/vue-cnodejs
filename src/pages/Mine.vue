<template>
    <div class="mine">
        <div class="back">
            个人中心<span @click="logout" class="iconfont">&#xe642;</span>
        </div>
        <div class="userIndex">
            <img class="userImg" v-bind:src="user.avatar_url" alt="">
            <p>{{user.loginname}}</p>
            <p class="userInf">
                积分：{{user.score}} 注册时间：{{user.create_at|resetTime}}
            </p>
        </div>
        <div class="topics">
            <!--v-bind:class="{active:section==tab.tabId}"-->
            <div  v-for="recent in recents" @click="changeTopics(recent.recentId)"  v-bind:class="{active:now==recent.recentId}">
                {{recent.recentName}}
            </div>
        </div>
        <ul>
            <li  class="item" v-for="item in user[now]" @click="()=>toDetail(item.id)">
                <span class="title">
                    {{item.title}}

                </span>
                <span class="time">
                    {{item.last_reply_at|resetTime}}
                </span>
            </li>
        </ul>
        <foot></foot>
    </div>
</template>
<script>
import back from   '../components/back.vue';
import fetchData from '../util/fetchData';
import foot from '../components/footer.vue';
var timeago = require("timeago.js");
var timeagoInstance = new timeago();
export  default{
    name:'mine',
    components:{
        foot
    },
    data:function(){
        return{
            user:{},
            recents:[
                {recentId:"recent_topics",recentName:"主题"},
                {recentId:"recent_replies",recentName:"回复"}
            ],
            now:"recent_topics"
        }
    },
    filters:{
        resetTime:function(time){
            return timeagoInstance.format(time, 'zh_CN');
        }
    },
    beforeCreate:function(){
         var loginname=localStorage.loginname;
         if(!loginname){
             Router.push({path:'login',query:{from:'/home'}})
            //  Router.push({name:'article',params:{id:id},query:{from:'/'}})
         }

    },
    created:function(){
        // console.log(window.Router,'====')
        // if(loginname==undefined){
        //       Router.push({name:'login'})
        // }else{

        // }
        var self=this;
        var loginname=localStorage.loginname;
        // console.log(Router)
        if(loginname){
            fetchData.userInfo(loginname)
                .then(res=>{
                    if(res.success){
                        self.user=res.data;
                        console.log(self.user);
                    }

                })
        }
    },
    methods:{
        changeTopics:function(recentId){
            this.now=recentId;
            console.log(this.now);
        },
        toDetail:function(id){
            Router.push({name:'article',params:{id:id},query:{from:'/mine'}})
        },
        logout:function(){
            localStorage.clear();
            Router.push({ path: "/home" })
        }
    }
}
</script>
<style scoped lang="scss">
$green:#80bd01;
.userIndex{
    border-top: 1px solid #ffffff;
    background-color: lighten($green,1%);
    color:#ffffff;
    padding:0.6rem 0 ;
    margin-top: 2.6rem;
    box-sizing: border-box;
}
.userImg{
    display: block;
    margin:0.3rem auto 0.3rem auto ;
    width: 220px;
    height: 220px;
    border-radius: 50%;
}
p{
    text-align: center;
    padding:0.2rem;
    margin:0;
}
.userInf{
    color:lighten($green,45%);
    font-size: 0.7rem;
}
.topics{

    div{
        background-color: #eee;
        border-bottom: 6px solid #eee;
        padding:0.5rem 0;
        display: inline-block;
        width: 50%;
        text-align: center;
        box-sizing: border-box;

    }
    .active{
        border-bottom: 6px solid $green;
    }
}
.item{
    display: block;
    margin: 0 1rem;
    box-sizing: border-box;
    border-bottom:1px  solid ;
    padding:0.5rem 0;
   &:nth-of-type(1){
    padding-top:1rem;
   }
    span{
        display: inline-block;
    }
    .title{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 75%;
    }
    .time{
        text-align: right;
        float: right;
    }
}
.back{
    span{
        right: 2rem;
        font-size: 1.5rem;
        position: absolute;

    }
}
</style>
