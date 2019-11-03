//声明 ：vue插件实现一个install 方法
let Vue ;//保存Vue构造函数的引用
class KVueRouter{
    
    constructor(options){
        this.$options = options;

        this.routeMap = {}//

        //当前url需要时响应式的
        this.app=new Vue({
            data:{current:"/"}
        })
    }

    init(){
        //解析routes
        //监听事件
        //声明组件
        this.bindEvents()
        this.createRouteMap();
        this.initComponent()
    }

    bindEvent(){
        window.addEventListener('hashChange',this.onHashChange.bind(this))
    }
    onHashChange(){
        this.app.current = window.location.hash.slice(1)||'/'
        console.log(this.app.current)
    }
    createRouteMap(){
        //遍历用户配置路由的数组
        this.$options.route.forEach(route=>{
            this.routeMap[route.path] = route
        })
    }
    initComponent(){
        Vue.component('routerLink',{
            props:{
                to:String
            },
            render(){
                // return h('a',
                //     {attrs:
                //         {href:"#"+this.to}
                //     },[this.$slots.default])
                return <a href={"#"+this.to}>{this.$slot.default}</a>
            }
        }) 
        Vue.component('routerView',{
            render:(h)=>{
                const Component = this.routeMap[this.app.current].component;

                return h(Component)
            }
        })
    }
   

}
//参数是vue的构造函数
KVueRouter.install = function(_Vue){
    Vue= _Vue;
    //实现一个混入
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){
                //根组件before
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
            //获取kVuerouter实例 并挂载到Vue原型上
        },
    })
}

export default KVueRouter;