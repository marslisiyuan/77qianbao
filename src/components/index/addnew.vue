<template>
    <div id="share">
        <div class="title titlefixed"> 
            <div @click="backed"><img src="../../assets/left.png" alt=""></div>
            <span>新增收款码</span>
            <span></span>
        </div>
        <div class="add">
            <ul class="show-ul">
                <li class="name">
                    <p>店名：</p>
                    <input type="text" v-model="name" placeholder="请输入您的店名">
                </li>
                <li>
                    <p>费率%：</p>
                    <input type="text" v-model="percent" placeholder="0.00">
                </li>
                <li>
                    <p>手续费：</p>
                    <input type="text" v-model="pay" placeholder="0.00">
                </li>
                <!-- <li>
                    <p>商户号：</p>
                    <input type="text" v-model="shopname">
                </li> -->
                <li style="color:#2472C8" id="buli">
                    <button @click="add" id="butt">确定添加</button>
                </li>
                <li id="tip">
                    <p>Tips:</p>
                    <p>1.花呗费率需大于2.55%，且不能大于20%</p>
                </li>
            </ul>
        </div>
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
            items:'',
            unbind:false,
            info:'',
            version:'',
            name:'',
            percent:'',
            pay:'',
            text:'',
            // shopname:'',
            }
        },
        mounted(){
            this.$store.commit("shownav",false)
            this.version=this.$store.state.version
        },
        methods:{
            backed(){
                window.history.go(-1)
            },
            show(){
                $('.show-ul').slideDown();
            },
            add(){
                console.log('点我了');
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                var MAC=$.md5('0700790003'+this.name+this.percent+this.pay+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                this.$http.post(
                'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                {
                    '0':'0700',
                    '3':'790003',
                    '8':this.name,
                    '9':this.percent,
                    '10':this.pay,
                    '42':merchantidNo,
                    '59':this.version,
                    '64':MAC
                },{
                    emulateJSON:true,
                    dataType:'json'
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
            }
        }
    }
</script>
<style scoped="scoped">
   #share{
        height: 100%;
        background: -webkit-linear-gradient(-45deg,#67BDF8 , #534CE7); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(-45deg,#67BDF8 , #534CE7); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(-45deg,#67BDF8 , #534CE7); /* Firefox 3.6 - 15 */
        background: linear-gradient(-45deg,#67BDF8 , #534CE7); /* 标准的语法 */
        overflow: hidden;
   }
/* .pay{
    margin: 0 auto;  
    margin-top: 1.466667rem;  
    width: 93%;  
    background-color: #FFF;
    border-radius:  .266667rem;         
}
.pay>li{
    display: flex;
    width: 92%;  
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding:.4rem 0 .4rem 0;
    border-bottom: 0.013333rem solid #ddd;
    border-bottom: 1px solid #EAEAEA;
}
.pay>.button{
    display: flex;
    justify-content: flex-end;
} */
button{
    width: 1.7rem;
    padding: .2rem;
    color: white;
    background-color: #544DE7;
    border: none;
    border-radius: .666667rem;
}
button:first-child{
    margin-right: .5rem;
}
.add{
    margin: 0 auto;
    margin-top: 3.466667rem; 
    width: 93%;
    border-radius:  .266667rem;  
    background-color: white;
}
.add>button{  
    width: 100%;  
    height: 1.3rem;
    background-color: #FFF;
    border-radius:  .266667rem;  
    color: #5E52E7;  
    font-size: .45rem;    
}
.show-ul{
    width: 100%;
    margin: 0 auto;
    background-color: white;
    border-radius: 0.266667rem;
    overflow: hidden;
}
.show-ul>li{
    display: flex;
    justify-content: space-around;
    padding: .3rem;
    border-bottom: 1px solid #EAEAEA;
    width: 93%;
    margin: 0 auto;
}
.show-ul>.name{
    margin-top: 1.5rem;
}
.show-ul>li>p{
    width: 30%;
    color:black;
}
.show-ul>li>input{
    width: 70%;
    height: .7rem;
    outline:none ;
    border: none;
}
#butt{
    width: 100%;
    padding-right: 0;
    margin-right: 0;
}
#buli{
    margin-top: 1.5rem;
    border: none;
}
#tip{
    display: flex;
    flex-wrap: wrap;
}
#tip>p{
    width: 100%;
    height: .7rem;
    color: #B6B6B6;
}
</style>