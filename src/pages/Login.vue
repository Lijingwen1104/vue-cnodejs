<template>
    <div class="login">
        <div class="back">
            <span @click="back" class="iconfont">&#xe617;</span>返回
        </div>
        <div class="center">
            <input type="text" placeholder="请输入accessToken" v-model="accesstoken">
            <div class="but" @click="login">登陆</div>
        </div>
    </div>
</template>
<script>
    import fetchData from '../util/fetchData';
    export default {
        name: 'login',
        components: {
        },
        data: function () {
            return {
                accesstoken: "",
            }
        },
        methods: {
            back: function () {
                // console.log(111)
                let from = this.$route.query.from || '/';
                Router.push({ path: from })
                // console.log(this.$route.query.from)
                // console.log(from)
                // console.log(Router)
            },
            login: function () {
                // 8f5dfb9a-ae41-4124-9476-53337f0d69c2
                var self = this;
                fetchData.login(this.accesstoken)
                    .then(res => {
                        if (res.success) {
                            console.log(res);
                            localStorage.accesstoken = this.accesstoken;
                            localStorage.loginname = res.loginname;
                            localStorage.id=res.id;
                            Router.push({ path: "/mine" })
                        }
                    })
            }
        }
    }
</script>
<style scoped lang="scss">
$green:#80bd01;
.login{
    margin:0px;
}
.center{
    margin-top: 50%;
    transform: translate(0,-50%);

}
input{
    width:80%;
    font-size: 1.2rem;
    margin:0 auto 1rem auto;
}
.but{
    width: 80%;
    margin:0 auto;
    text-align: center;
    background-color:$green;
    box-sizing:border-box;
    color:#ffffff;
    font-size: 1.1rem;
    padding:0.5rem 0.3rem;
    border-radius: 0.2rem;
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
</style>