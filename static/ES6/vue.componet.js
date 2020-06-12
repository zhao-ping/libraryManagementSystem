Vue.component('pager',{
    props:['totalPage','page'],
    data(){
        return {
            pages:[]
        }
    },
    watch:{
        totalPage(){
            console.log(99)
            this.pages=[];
            if(page-1>0){
                this.pages.push({k:"首页",v:1});
                this.pages.push({k:"上一页",v:this.page-1});
            }
            for(let i=page-2;i<page+2;i++){
                if(i>0&&i<this.totalPage){
                    this.pages.push({k:i,v:i});
                }
            }
            if(page+1<this.totalPage){
                this.pages.push({k:"下一页",v:this.page+1});
                this.pages.push({k:"尾页",v:this.totalPage});
            }
        }
    },
    template:`
    <section class="pager">
        <span class="page">首页</span>
        <span class="page">上一页</span>
        <span class="page">1</span>
        <span class="page">2</span>
        <span class="page">3</span>
        <span class="page">4</span>
        <span class="page">5</span>
        <span class="page">下一页</span>
        <span class="page">尾页</span>
    </section>
    `,
    methods:{

    }
})