Application Routing Module Path

{
    path: '<%= moduleUrl %>',
    loadChildren: './<%= dasherize(moduleName) %>/<%= dasherize(moduleName) %>.module#<%= classify(moduleName) %>Module',
    data: {title: 'MyCenter - <%= classify(moduleName) %>'}
},