// IMPORTS
// Angular
import { NgModule } from '@angular/core';

// Shared and Core
import { CoreModule } from '../core/module/core.module';
import { SharedModule } from '../shared/module/shared.module';

// Components
import { <%= classify(moduleName) %>Component } from './<%= dasherize(moduleName) %>.component';
import { <%= classify(moduleName) %>TableComponent } from './<%= dasherize(moduleName) %>-table/<%= dasherize(moduleName) %>-table.component';
import { <%= classify(moduleName) %>TablePresentationComponent } from './<%= dasherize(moduleName) %>-table/<%= dasherize(moduleName) %>-table-presentation/<%= dasherize(moduleName) %>-table-presentation.component';

// Routing
import { <%= classify(moduleName) %>RoutingModule } from './<%= dasherize(moduleName) %>-routing.module';

// Modal
import { <%= classify(modalName) %>ModalComponent } from './modal/<%= dasherize(modalName) %>-modal/<%= dasherize(modalName) %>-modal.component';

// Services
import { <%= classify(moduleName) %>DataInterface } from './<%= dasherize(moduleName) %>-datainterface.service';<% if(hasModalUrl) { %>
import { <%= classify(moduleName) %>ModalContainerService } from './modal/<%= dasherize(moduleName) %>-modal-container.service';<% } %>

@NgModule({
  declarations: [
    <%= classify(moduleName) %>Component,
    <%= classify(moduleName) %>TableComponent,
    <%= classify(moduleName) %>TablePresentationComponent,
    <%= classify(modalName) %>ModalComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    <%= classify(moduleName) %>RoutingModule
  ],
  providers: [
    <%= classify(moduleName) %>DataInterface,<% if(hasModalUrl) { %>
    <%= classify(moduleName) %>ModalContainerService<% } %>
  ],
  entryComponents: [
    <%= classify(modalName) %>ModalComponent
  ]
})
export class <%= classify(moduleName) %>Module { }
