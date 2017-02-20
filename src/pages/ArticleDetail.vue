<template>
    <div class="article">
        <!--<h1 @click="back">back</h1>-->
        <div class="back">
            <span  @click="back" class="iconfont">&#xe617;</span>详情
        </div>
        <article>
            <header>
                <h3>{{article.title}}</h3>
                <ul>
                    <li>发布于 {{article.create_at|resetTime}}</li>
                    <!--<li>作者 {{article.author.loginname}}</li>-->
                    <li>{{article.visit_count}} 次浏览</li>
                    <li>来自 {{article.tab|resetTab}}</li>
                </ul>
            </header>
            <section class="content" v-html="article.content"></section>
        </article>
        <p class="replyCount">{{article.reply_count}}回复</p>
        <article>
            <div v-for="(reply,i) in article.replies" class="reply">
                <img class="avatar" v-bind:src="reply.author.avatar_url" alt="">
                <span>{{reply.author.loginname}} {{i+1}}楼·{{reply.create_at|resetTime}}</span>
                <div class="content" v-html="reply.content">
                </div>
                <p class="iconfont">
                    <span @click="ups(reply.id)"> {{reply.ups.length}} 点赞 &#xe608;</span>
                    <!--<span  @click="toggleArea(reply.isActive)">回复 &#xe632; </span>-->
                    <span  @click="reply.isActive=!reply.isActive">回复 &#xe632; </span>
                </p>
                <div  v-bind:class="{active:reply.isActive}">
                    <textarea class="replyPersonContent"  v-model="reply.replyPersonContent" :placeholder="'@'+reply.author.loginname" ></textarea>
                    <div class="replyPerson"  @click="replyPerson(reply.id,reply.author.loginname,reply.replyPersonContent)">回复</div>
                </div>
            </div>
        </article>
        <article>
            <textarea  v-model="replyArticleContent" placeholder="回复支持Markdown语法,请注意标记代码"></textarea>
        </article>
        <div class="replyArticle"  @click="replyArticle">评论</div>
    </div>
</template>
<script>
  import Vue from 'vue';
    import fetchData from '../util/fetchData';
    var timeago = require("timeago.js");
    var timeagoInstance = new timeago();

    export default {
        name: 'article',
        data() {
            return {
                article: {},
                replyArticleContent:"",
                // replyPersonContent:""
            }
        },
        created: function () {
            var self = this;
            // console.log(this.$route)
            var id = this.$route.params.id;
            fetchData.getTopicInfo(id)
                .then(res => {
                    if (res.success) {
                        self.article = res.data;
                        for (var i = 0; i < self.article.replies.length; i++) {
                            // var element = array[i];
//                            self.article.replies.$set(i,{isActive:true});
                          Vue.set(self.article.replies[i],'isActive',true);
                        }

                    }
                })
        },
        filters: {
            resetTab: function (tab) {
                var tabList = {
                    ask: "问答",
                    share: "分享",
                    job: "招聘",
                    good: "精华"
                };
                return tabList[tab];
            },
            resetTime: function (time) {
                return timeagoInstance.format(time, 'zh_CN');
            }
        },
        // watch:{
        //     article:function(){
        //         this.article.create_at=timeagoInstance.format(this.article.create_at, 'zh_CN');
        //         console.log("change");
        //     }

        // },
        methods: {
            back: function () {
                console.log(111)
                let from = this.$route.query.from || '/';
                Router.push({ path: from })
            },
            replyArticle:function(){
                var replyArticleContent=this.replyArticleContent;
                var accesstoken=localStorage.accesstoken;
                var self=this;
                var articleId=self.article.id;
                // console.log()
                if(replyArticleContent==""){
                    alert("请输入内容")
                }else{
                    console.log(this.replyArticleContent);
                    fetchData.setRepliy(articleId,accesstoken,self.replyArticleContent)
                        .then(res => {
                                console.log(res)

                            // if (res.success) {
                            // }
                            fetchData.getTopicInfo(articleId)
                                .then(res => {
                                    if (res.success) {
                                        self.article = res.data;
                                    }
                                })
                        })

                }
                console.log(this.article);
            },
            replyPerson:function(replyId,loginname,replyPersonContent){
                var accesstoken=localStorage.accesstoken;
                var self=this;
                var articleId=self.article.id;
                // console.log()
                if(replyPersonContent==""){
                    alert("请输入内容")
                }else{
                    console.log(replyPersonContent);
                    replyPersonContent="@"+loginname+" "+replyPersonContent;
                    fetchData.setRepliy(articleId,accesstoken,replyPersonContent,replyId)
                        .then(res => {
                                console.log(res)

                            // if (res.success) {
                            // }
                            fetchData.getTopicInfo(articleId)
                                .then(res => {
                                    if (res.success) {
                                        self.article = res.data;
                                    }
                                })
                        })

                }
            },
            ups:function(replyId){
                console.log(replyId);
                var self =this;
                var accesstoken=localStorage.accesstoken;
                var articleId=self.article.id;
                fetchData.ups(replyId,accesstoken)
                        .then(res => {
                                console.log(res)

                            // if (res.success) {
                            // }
                            fetchData.getTopicInfo(articleId)
                                .then(res => {
                                    if (res.success) {
                                        self.article = res.data;
                                    }
                                })
                        })
            },
            toggleArea:function(isActive){
                isActive = !isActive;
                console.log(isActive);
            }
        }
    }
</script>

<style scoped lang="scss">
    $bgc:#e1e1e1;
    $w:#ffffff;
    $br:0.15rem;
    $green:#80bd01;
    .replyCount{
        font-size: 0.7rem;
        color: darken($bgc,30%);
        margin:0;
        padding:0;
    }
    .article{
        margin:0;
        padding:2rem 0.5rem 3.5rem 0.5rem;
        overflow: hidden;
        background-color: $bgc;

    }
    article{
        background-color: $w;
        border-radius:$br;
        padding:0 0.4rem ;
        margin:1rem 0;

    }
    header{
        border-bottom: 1px solid $bgc;
        padding:0.5rem 0;
    }
    h3{
        word-break:break-all;
        text-align: center;
    }
    ul{
        color: darken($bgc,40%);
        padding:0;
        font-size:0.8rem;
        margin:0;
    }
    li{
        display: inline-block;
        margin: 0;
        padding:0;
        &:before{
         content: "·" ;
        }
    }
    .content{
        padding:1px 1rem  ;
        font-size: 0.7rem;
        text-align:justify;
         word-wrap:break-word;
         word-break:break-all;
        /*white-space:*/

    }
    .reply{
        border-bottom:3px solid $bgc;
        padding :0.5rem 0 1rem 0;
        &:nth-last-of-type(1){
            border:none;
        }
        .content{
            padding:0 0.5rem 0 1rem;
        }
        .iconfont{
            text-align: right;
            font-size: 0.4rem;
            padding: 0;
            span{
                padding:0 0.5rem;
            }
        }
    }
    .avatar{
        width: 2rem;
        border-radius: 30%;
        vertical-align: top;
        & + span{
            font-size:0.6rem;
            padding:0 0 0 0.5rem;
        }
    }
    .back{
        background-color: $green;
        margin:0px;
        color: #ffffff;
        font-weight: bold;
        padding: 0.6rem 0;
        text-align: center;
        position: absolute;
        margin:0;
        top:0;
        left: 0;
        width: 100%;
        font-size: 1.1rem;
        span{
            position: relative;
            right: 35%;
        }
    }
    textarea{
        box-sizing: border-box;
        width: 100%;
        height: 220px;
        padding: 0.5rem 10px;
        line-height: 24px;
        border-radius: 5px;
        resize: none;
        font-size: 0.6rem;
        border:none;
        margin: 0;
    }
    .replyPerson,.replyArticle{
        position: absolute;
        background-color: $green;
        color:#ffffff;
        padding: 0.5rem 1rem;
        width: auto;
        border-radius: 0.3rem;
        right: 0.5rem;
    }
    .replyPerson{
        right:2.5rem;
        margin-top: 0.5rem;

    }
    .replyPersonContent{
        border:1px solid;
        width: 85%;
        font-size: 0.7rem;
        box-sizing: border-box;
        height: 120px;
        margin: 0 auto;
    }
    .area{
        display: none;
        position: relative;
        padding-bottom: 3rem;
    }
    .active{
        display: none;
    }

</style>
