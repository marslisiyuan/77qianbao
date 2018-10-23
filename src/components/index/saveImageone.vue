<template>
    <div id="share">
        <div class="title titlefixed"> 
            <div @click="backed"><img src="../../assets/left.png" alt=""></div>
            <span>收款码汇总</span>
            <span></span>
        </div>
        <div class="header"></div>
        <ul class="pay" v-for="(item, index) in items" :key="index">
            <li>
                <p>{{item.CREATE_TIME}}</p>
                <p>有效</p>
            </li>
            <li style="border:none">
                <p>{{item.shopName}}</p>
                <div style="color:#F25661">
                    <p>花呗费率：{{item.TMK}}%</p>
                </div>
            </li>
            <li style="border:none" class="button">
                <!-- <router-link tag="li" to="/erweima"> -->
                    <button @click="open(item.url)">打开</button>
                <!-- </router-link> -->
                
                <button @click="delet(item.ID)">删除</button>
            </li>
        </ul>
        <div class="add">
            <button @click="show"> + 新增收款码</button>
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
            }
        },
        mounted(){
            this.$store.commit("shownav",false)
            this.payed()
            this.version=this.$store.state.version
        },
        methods:{
            backed(){
                window.history.go(-1)
            },
            show(){
                 this.$router.push({path:'/addnew'}) ;
            },
            payed(){
                    var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                    var MAC=$.md5('0700790004'+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                    this.$http.post(
                    'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                    {
                        '0':'0700',
                        '3':'790004',
                        '42':merchantidNo,
                        '59':this.version,
                        '64':MAC
                    },{
                        emulateJSON:true
                    }).then(function(res){
                        if(res.data['39']=='00'){
                            this.items=JSON.parse(res.data['31']);
                        }    
                    })
                },
            delet(re){
                console.log(re)
                this.payed()
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                // window.location.reload();
                 var MAC=$.md5('0700790005'+merchantidNo+re+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                          this.$http.post(
                            'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                            {
                                '0':'0700',
                                '3':'790005',
                                '42':merchantidNo,
                                '43':re,
                                '59':this.version,
                                '64':MAC
                            },{
                                emulateJSON:true,
                                dataType:'json'
                            }).then(function(res){
                              if(res.data['39']=='00'){
                                  this.payed()
                                  this.unbind=true
                                  this.text='操作成功'
                              }else{
                                  this.unbind=true
                                 this.text='操作失败'+":"+res.data['39']
                              }
                          })
            },
            open(rel){
                         this.$router.push({path:'/erweima',query:{'js':rel}}) ;
                         console.log(rel)
                    }
                    
        }
    }
</script>
<style scoped="scoped">
   #share{
       height: 100%;
   }
   .header{
       margin-top: 1.5rem;
   }
.pay{
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
}
.pay>.button{
    display: flex;
    justify-content: flex-end;
}
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
    margin-top: .466667rem; 
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
    display: none;
}
.show-ul>li{
    display: flex;
    justify-content: space-around;
    padding: .3rem;
}
.show-ul>li>p{
    width: 30%;
}
.show-ul>li>input{
    width: 70%;
    height: .7rem;
    outline:none ;
}
</style>
