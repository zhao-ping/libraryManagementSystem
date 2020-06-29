var app=new Vue({
    el:"#app",
    data:function(){
        return {
            list:null
        }
    },
    methods:{
        getList(){
            getData('/admin/book/type/list',this,{formData:this.formData}).then(r=>{
                this.list=r
            })
        }
    },
    created(){
        this.getList()
    },
    mounted(){
    }
})