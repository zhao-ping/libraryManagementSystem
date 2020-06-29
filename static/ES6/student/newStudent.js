var app=new Vue({
    el:"#app",
    data:function(){
        return {
            formData:{
                student_name:null,
                student_grade:1,
                student_major:"计算机科学与技术",
                student_age:18,
                student_sex:0,
            },
        }
    },
    methods:{
        newStudent(){
            getData('/admin/student/new',this,{method:"post",formData:this.formData}).then(r=>{
                this.$toast("新生入库成功");
            })
        }
    },
    created(){
        
    },
    mounted(){
        
    }
})