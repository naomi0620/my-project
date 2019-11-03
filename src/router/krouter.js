let vue;

export default class VueRouter{
//解析routes
//声明组件
    constructor(options){
        this.$options = options;
        this.routeMap ={};
        this.app = new vue({
            data:{current:'/'}
        })
    
    }
    //监听事件
    //当前url是响应式的
    //初始化
    init(){
        this.bindEvents();
        this.createRouteMap();
        this.initComponent();
    }
    bindEvents(){
        window.addEventListener('hashchange',this.onhashchange.bind(this))
    }
    onhashchange(){
        console.log(window.location.hash.slice(1))
        this.app.current = window.location.hash.slice(1)||'/'
    }
    createRouteMap(){
        this.$options.routes.forEach(route=>{
            this.routeMap[route.path]=route
        });
    }
    initComponent(){
        vue.component('router-link',{
            props:{
                to:String,

            },
            render(){
                // return h('a',{
                //     attrs:{
                //         href:'#'+this.to
                //     }
                // },[this.$slots.default])

                //使用jsx
                return <a href={"#"+this.to}>{this.$slots.default}</a>
            }
        })
        vue.component('router-view',{
            render(h){
                return h()
            }
        })
    }
  
}
//install接收参数Vue构造函数
VueRouter.install=function(_Vue){
    vue=_Vue
    // 实现一个混入操作 为了拿到vue实例
    vue.mixin({
        beforeCreate() {
            //根组件只执行一次
            if(this.$options.router){
                vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        },
    })

}
