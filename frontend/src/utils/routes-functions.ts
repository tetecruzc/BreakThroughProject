export function getRoutes(routes: any, router: any){
    //let { routes } = this.$router.options;
    let id = ''
    for (var i=0;i<routes.length;i++){
        var component = getViewComponent(routes[i].component);
        if (routes[i].submenu) id = '/:id' 
        else id=''
        let object = { path: '/'+routes[i].url_route + id, component: component, name: routes[i].name_route }
        router.addRoute(object)         
    }
}

function getViewComponent(nameComponent : string) : any{
    return () => import('@/views/'+nameComponent);
}