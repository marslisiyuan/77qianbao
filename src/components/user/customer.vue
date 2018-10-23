<template>
    <div id="app">
        <!-- 我的客户title -->
        <div class="title titlefixed">
            <div @click="backed"><img src="../../assets/left.png" alt=""></div>
            <span>代理订单</span>
            <span></span>
        </div>
        <!-- 我的客户数量 -->
        <ul class="user-ul">
            <ul class="search">
                <li class="list">
                    <img src="../../assets/drawable/mycustomer_weirenzheng.png" alt="">
                    <div>
                        <p class="one">{{name}}</p>
                        <ul class="number">
                            <li>
                                <p class="two">今日订单</p>
                                <p class="three">{{client}}</p>
                            </li>
                            <!-- <li class="four">
                                <p class="two">今日订单分佣</p>
                                <p class="three">0</p>
                            </li> -->
                        </ul>
                    </div>
                </li>
            </ul>  
        </ul>
        <ul class="search-one">
            <li>
                <img src="../../assets/banner/ding.png" alt="">
                <p>分佣信息</p>
            </li>
        </ul>
        <el-dialog
            :visible.sync="unbind"
            width="90%"
            top="30vh"
            >
            <span>{{text}}</span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="unbind = false">取 消</el-button> -->
                <el-button type="primary" @click="unbind = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'fourone',
        data() {
            return {
              version:" ",
              client:'',
              text:'',
              level:'',
              unbind:false,
              name:'',
              client:''
            }
        },
        mounted(){
            this.$store.commit('shownav',false)
            this.version=this.$store.state.version
            this.level=this.$route.query.id
            this.name=this.$route.query.data
            console.log(this.name)
            var MAC=$.md5('0700790008'+this.level+'1'+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
            this.$http.post(
                'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                {
                    '0':'0700',
                    '3':'790008',
                    '42':this.level,
                    '43':'1',
                    '44':'',
                    '45':'',
                    '46':'',
                    '59':this.version,
                    '64':MAC
                },{
                emulateJSON:true
                }).then(function(res){
                if(res.data['39']=='00'){
                   this.client=res.data['58']
                }
            })
        },
        methods:{
            backed(){
                window.history.go(-1)
            },
          
        },
    }
</script>
<style scoped="scoped">
#app{
    height: 100%;
    overflow: hidden;
}
.user-ul{
      background-color: white;
      width: 93%;
      margin: 0 auto;
      margin-top: 1.5rem;
      border-radius: .266667rem;
}
.user-ul li{
       height: 1.2rem;
       display: flex;
       align-items: center;
   }
   .user-ul li img{
     width: .293333rem;
     height: .533333rem;
     padding:0  .4rem;
   }
   .user-ul li>img{
    height:.666667rem;
    width:.666667rem;
    padding:0  .4rem;
   }
   .user-ul .list{
       height: 3rem;
   }
   .list>div{
       width: 80%;
   }
   .user-ul .list>img{
        height:1.5rem;
        width:1.5rem;
        padding:0  .4rem;
   }
   .number{
       width: 100%;
       overflow: hidden;
   }
   .number>li{
       float: left;
       display: flex;
       flex-wrap: wrap;
       /* width: 50%; */
       text-align: center;
   }
   .number>li p{
       width: 100%;
   }
   .one{
       font-size: .4rem;
       color:#211C18;
   }
   .two{
       font-size: .3rem;
   }
   .three{
       font-size: .3rem;
       color: #2472c8;
   }
   .four{
       margin-left: 2.5rem;
   }
   .search-one{
      background-color: white;
      width: 93%;
      margin: 0 auto;
      margin-top: .5rem;
      border-radius: .266667rem;
   }
   .search-one>li{
       width: 93%;  
       margin: 0 auto;
       display: flex;
       flex-wrap: wrap;
       align-items: center;
       height: 2rem;
       border-bottom: 1px solid #E4E4E4;
       margin-bottom: .2rem;
   }
   .search-one>li>img{
       width: .7rem;
       height: .7rem;
   }
</style>
