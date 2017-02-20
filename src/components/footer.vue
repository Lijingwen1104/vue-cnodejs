<template>
    <ul class="footer" >
        <li @click="changePage(value.footId)" class="cell" v-for="value in foot"
         v-bind:class="{active:value.footId==footId}">
            <span class="iconfont" v-html="value.footIcon"></span>
            {{value.footName}}
            <i>{{value.num==0?"":value.num}}</i>
        </li>
    </ul>

</template>
<script>
  import fetchData from '../util/fetchData';

    export default{
        name:'footer',
        props:['footId'],
        data:function(){
            return{
                foot:[
                    {footId:"home",footName:"首页",footIcon:"&#xe629;"},
                    {footId:"publish",footName:"发表",footIcon:"&#xe62f;"},
                    {footId:"message",footName:"消息",footIcon:"&#xe613;",num:0},
                    {footId:"mine",footName:"我的",footIcon:"&#xe653;"},

                ],
                messageCount:""

            }
        },
        created:function(){
            // console.log(this.footId+"9999999999");
            // console.log(this.messageCount+"9999999999");
            var self=this;
            var accesstoken=localStorage.accesstoken;
            fetchData.getMessageCount(accesstoken)
                .then(res=>{
                    if(res.success){
                        self.messageCount=res.data;
                    }
                    // self.messages=res.data;
                    // console.log(self.messageCount);
                    self.foot[2].num=self.messageCount;
                })
        },
        
        methods:{
            changePage:function(pageId){
                this.now=pageId;
                Router.push({path:"/"+pageId});
                // console.log(this.now+"--------------");
            // console.log(Router.$route.path);
                
            }
        }

    }

</script>
<style scoped lang="scss">
$green:#80bd01;
.footer{
    background-color: $green;
    color:#ffffff;
    list-style-type: none;
    margin:0px;
    padding:0px;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing:border-box;
    left: 0;
}
i{
    position: absolute;
    top:0;
    color: #e21800;
}
.cell{
    float:left;
    box-sizing:border-box;
    width: 25%;
    text-align: center;
    padding:0;
    margin: 0;
    font-size: 0.9rem;
    padding:1.3rem 0 0.2rem 0;
    border:1px solid darken($green,6%);
    position:relative;
    font-weight: bold;
    .iconfont{
        position:absolute;
        text-align: center;
        font-weight: normal;
        top: 0.2rem;
        left:0;
        right: 0;
        // width:100%;
    }
}
.active{
    background-color: lighten($green,4%);
}
</style>
