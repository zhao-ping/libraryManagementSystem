var app=new Vue({
    el:"#app",
    data(){
        return {
            formData:{
                admin_name:null,
                password:null,
            },
        }
    },
    methods:{
        login(){
            let formData=this.formData;
            getData(`/login`,this,{formData,method:"post"}).then(r=>{
                setCookie("admin",r);
                location.href="/";
            })
        }
    }
})