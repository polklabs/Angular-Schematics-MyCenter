import { Component, OnInit } from '@angular/core';<% if(hasModalUrl) { %>
import { <%= classify(moduleName) %>ModalContainerService } from './modal/<%= dasherize(moduleName) %>-modal-container.service';<% } %>

@Component({
  selector: 'app-<%= dasherize(moduleName) %>',
  templateUrl: './<%= dasherize(moduleName) %>.component.html',
  styleUrls: ['./<%= dasherize(moduleName) %>.component.scss']
})
export class <%= classify(moduleName) %>Component implements OnInit {

  description = 'Placeholder description text';

  constructor(<% if(hasModalUrl) { %>
    private <%= camelize(moduleName) %>ModalContainerService: <%= classify(moduleName) %>ModalContainerService // DON'T REMOVE - IT IS ACTUALLY BEING USED
  <% } %>) { }

  ngOnInit() {
  }

}
