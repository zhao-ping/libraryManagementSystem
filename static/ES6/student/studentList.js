var app=new Vue({
    el:"#app",
    data:function(){
        return {
            formData:{
                student_id:null,
                student_name:null,
            },
            pager:null,
            list:null
        }
    },
    created(){
        getData('/student/list',this,{formData:this.formData}).then(r=>{
            this.list=r.list;
            this.pager=r.pager;
        })
    },
    mounted(){
        var time=vueExtends.formateDateTime(1591943058);
        console.log(time)
    }
})