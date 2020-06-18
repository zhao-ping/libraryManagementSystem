Vue.component('pager',{
    props:['pageCount','page'],
    data(){
        return {
            pages:[]
        }
    },
    watch:{
        page(){
           this.resetPager(); 
        }
    },
    template:`
    <section class="pager">
        <span v-for="item in pages" @click="toPage(item.v)" class="page" :class="{'bg-purple-1':page==item.v}" v-text="item.k"></span>
    </section>
    `,
    methods:{
        toPage(page){
            this.$emit("change", page);
        },
        resetPager(){
            this.pages=[];
            if(this.page-1>0){
                this.pages.push({k:"首页",v:1});
                this.pages.push({k:"上一页",v:this.page-1});
            }
            for(let i=this.page-2;i<=this.page+2;i++){
                if(i>0&&i<=this.pageCount){
                    this.pages.push({k:i,v:i});
                }
            }
            if(this.page+1<=this.pageCount){
                this.pages.push({k:"下一页",v:this.page+1});
                this.pages.push({k:"尾页",v:this.pageCount});
            }
        }
    },
    created(){
        this.resetPager();
    }
})
Vue.component("popup",{
    props:[],
    data(){
        return {
            isShow:false,
        }
    },
    template:`
    <div v-show="isShow" class="modal">
        <div @click="hide" class="bg"></div>
        <div class="contianer bg-white br-5">
            <slot></slot>
        </div>
    </div>
    `,
    methods:{
        show(){
            this.isShow=true;
        },
        hide(){
            this.isShow=false;
        }
    }
})