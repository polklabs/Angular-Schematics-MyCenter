Application Routing Module Path

{
    path: '<%= moduleUrl %>',
    loadChildren: () => import('./<%= dasherize(moduleName) %>/<%= dasherize(moduleName) %>.module').then(m => m.<%= classify(moduleName) %>Module),
    canActivate: [ ...oktaAuthGuard ],
    data: {title: '<%= classify(moduleName) %> | MyCenter'}
},