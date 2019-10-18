import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { <%= classify(moduleName) %>Component } from './<%= dasherize(moduleName) %>.component';

const routes: Routes = [
    { path: '', component: <%= classify(moduleName) %>Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class <%= classify(moduleName) %>RoutingModule {}
