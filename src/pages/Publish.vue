<template>
    <div class="publish">
        <div class="back">
            <span @click="publish" class="iconfont">&#xe698;</span> 发布
        </div>
        <div class="item">
            <select v-model="tab" >  
                <option value="">选择分类</option>  
                <option  v-for="tab in tabs" :value ="tab.tabId">{{tab.tabName}}</option>  
            </select> 
        </div>
        <div class="item">
            <input  v-model="title" type="text" placeholder="标题字数 10 字以上">
        </div>
        <div class="item">
            <textarea v-model="content" placeholder="内容字数 30 字以上"></textarea>
        </div>
        <foot></foot>
    </div>
</template>
<script>
import fetchData from '../util/fetchData';
import foot from '../components/footer.vue';
export  default{
    name:'publish',
    components:{
        foot
    },
    data:function(){
        return{
            tabs:[
                {tabId:"ask",tabName:"问答"},
                {tabId:"share",tabName:"分享"},
                {tabId:"job",tabName:"工作"}
            ],
            tab:"",
            title:"",
            content:""
        }
    },
    methods:{
        publish:function(){
            var self=this;
            var title=this.title;
            var content=this.content;
            var tab=this.tab;
            var accesstoken=localStorage.accesstoken;
            if(tab==""||title==""||content==""){
                alert("你确定都填完了么？");
            }else{
                fetchData.publish(accesstoken,title,tab,content)
                    .then(res=>{
                        console.log(res);
                        if(res.success){
                            alert("发布成功");
                            Router.push({name:'article',params:{id:res.topic_id},query:{from:'/'}})
                        }
                    })
            }
            // console.log(this.tab)
            // console.log(this.title)
            // console.log(this.content)
        }
    }
}
</script>
<style scoped lang="scss">
$green:#80bd01;
.userIndex{
    border-top: 1px solid;
    background-color: lighten($green,1%);
    color:#ffffff;
    padding:0.6rem 0 ;
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
.item{
    border-bottom:1px solid;
}
select{
    display: block;
    font-size: 1rem;
     padding:0.5rem 0;
     box-sizing: border-box;
}
option{
    font-size: 1rem;
    padding:0.5rem 0;
}
textarea,input{
    width:100%;
    border:none;
    
}
.back{
    position: relative;
    span{
        position: absolute;
        right: 2rem;
    }
}
</style>