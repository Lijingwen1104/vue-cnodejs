<template>
    <ul class="footer" >
        <li @click="changePage(value.footId)" class="cell" v-for="value in foot">
            <span class="iconfont" v-html="value.footIcon"></span>
            {{value.footName}}
        </li>
    </ul>

</template>
<script>
    export default{
        name:'footer',
        data:function(){
            return{
                foot:[
                    {footId:"home",footName:"首页",footIcon:"&#xe629;"},
                    {footId:"publish",footName:"发表",footIcon:"&#xe62f;"},
                    {footId:"message",footName:"消息",footIcon:"&#xe613;"},
                    {footId:"mine",footName:"我的",footIcon:"&#xe653;"},

                ]

            }
        },
        methods:{
            changePage:function(pageId){
                Router.push({path:"/"+pageId})
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
</style>
