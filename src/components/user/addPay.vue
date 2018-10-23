<template>
    <div id="codeImg">
        <div class="title">
            <div @click="backed"><img src="../../assets/left.png" alt=""></div><span>入驻</span>
            <span></span>
        </div>
         <ul class="show-ul">
                                    <li id="one">
                                        <p>账号：</p>
                                        <input type="text" v-model="number" placeholder="请输入账号">
                                    </li>
                                    <li>
                                        <p>支付宝名称:</p>
                                        <input type="text" v-model="name" placeholder="请输入支付宝名称">
                                    </li>
                                    <li>
                                        <p>费率：</p>
                                        <input type="text" v-model="percent" placeholder="请输入费率">
                                    </li>
                                    <li>
                                        <p>每笔的最小额度:</p>
                                        <input type="text" v-model="mix" placeholder="请输入最小额度">
                                    </li>
                                    <li>
                                        <p>每笔的最大额度:</p>
                                        <input type="text" v-model="max" placeholder="请输入最大额度">
                                    </li>
                                    <li>
                                        <p>每日额度:</p>
                                        <input type="text" v-model="everyday" placeholder="请输入每日额度">
                                    </li>
                                    <!-- <li>
                                        <p>商户号:</p>
                                        <input type="text" v-model="shopnumber">
                                    </li> -->
                                    <li>
                                        <button @click="goin" id="butt">确定</button>
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
        data(){
            return{
               items:"",
               text:'',
               unbind:false,
               version:'',
               name:'',
                number:'',
                percent:'',
                mix:'',
                max:'',
                everyday:'',
            }
        },
        mounted(){
           this.$store.commit('shownav',false)
           this.items=JSON.parse(this.$route.query.js);
           console.log(this.items);
           this.version=this.$store.state.version;
           var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo     
        },
        methods:{
            backed(){
               window.history.go(-1)
            },
             goin(){
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo 
                console.log(this.name+this.number+this.percent+this.mix+this.max+this.everyday+this.shopnumber+this.version);
                var MAC=$.md5('0700790001'+this.name+this.number+this.percent+this.mix+this.max+this.everyday+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                this.$http.post(
                        'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                        {
                                '0':'0700',
                                '3':'790001',
                                '8':this.name,
                                '9':this.number,
                                '10':this.percent,
                                '12':this.mix,
                                '13':this.max,
                                '14':this.everyday,
                                '42':merchantidNo,
                                '59':this.version,
                                '64':MAC
                        },{
                             emulateJSON:true
                        }).then(function(res){
                            if(res.data['39']=='00'){
                                this.unbind=true
                                this.text='操作成功'
                                setTimeout(function(){
                                         window.history.go(-1)},1000)
                                
                              }else{
                                 this.unbind=true
                                 this.text='操作失败'+":"+res.data['39']
                              }
                          })
                        },
             ulclick(rel){
                    
                    this.$router.push({path:'/user/usererweima',query:{'js':rel}}) ;
                    
                    console.log(rel)

             }    
        }
    }
</script>
<style scoped="scoped">
 #codeImg{
     height: 100%;
     background: -webkit-linear-gradient(-45deg,#67BDF8 , #534CE7); /* Safari 5.1 - 6.0 */
     background: -o-linear-gradient(-45deg,#67BDF8 , #534CE7); /* Opera 11.1 - 12.0 */
     background: -moz-linear-gradient(-45deg,#67BDF8 , #534CE7); /* Firefox 3.6 - 15 */
     background: linear-gradient(-45deg,#67BDF8 , #534CE7); /* 标准的语法 */
 }
 .show-ul{
    width: 93%;
    margin: 0 auto;
    margin-top: 2.5rem;
    background-color: white;
    border-radius: 0.266667rem;
    overflow: hidden;
}
.show-ul>li{
    display: flex;
    width: 93%;
    margin: 0 auto;
    justify-content: space-around;
    padding: .3rem;
    border-bottom: 1px solid #777777;
}
.show-ul>li>p{
    width: 40%;
    color: black;
}
.show-ul>li>input{
    width: 60%;
    height: .7rem;
    outline:none ;
    border: none;
}
#one{
    margin-top:1.5rem; 
}
#butt{
    width: 93%;
    border-radius: 0.266667rem;
    color: white;
    background-color: #5454E8;
    border: none;
    height: 1rem;
}
</style>
