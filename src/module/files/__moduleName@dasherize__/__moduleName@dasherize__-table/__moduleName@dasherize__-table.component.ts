import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';<% if(hasModalUrl) { %>
import { Router } from '@angular/router';<% } else { %>
import { MatDialog } from '@angular/material/dialog';<% } %>

import { <%= classify(moduleName) %>DataInterface } from '../<%= dasherize(moduleName) %>-datainterface.service';<% if(!hasModalUrl) { %>
import { <%= classify(modalName) %>ModalComponent } from '../modal/<%= dasherize(modalName) %>-modal/<%= dasherize(modalName) %>-modal.component';<% } %>

import { Info } from 'src/app/shared/model/info.model';
import { SchemTestEntity } from 'src/app/store/model/schem-test-entity.model';

@Component({
  selector: 'app-<%= dasherize(moduleName) %>-table',
  templateUrl: './<%= dasherize(moduleName) %>-table.component.html',
  styleUrls: ['./<%= dasherize(moduleName) %>-table.component.scss']
})
export class <%= classify(moduleName) %>TableComponent implements OnInit {

  constructor(
    private <%= camelize(moduleName) %>DataInterface: <%= classify(moduleName) %>DataInterface,<% if(hasModalUrl) { %>
    private router: Router<% } else { %>
    private dialog: MatDialog<% } %>
  ) { }

  tableData$: Observable<Info<SchemTestEntity>[]>;
  tableDataLoading$: Observable<boolean>;
  tableDataError$: Observable<boolean | null>;

  ngOnInit() {
    this.tableData$ = this.<%= camelize(moduleName) %>DataInterface.getSchemTests();
    this.tableDataLoading$ = this.<%= camelize(moduleName) %>DataInterface.getSchemTestsLoading();
    this.tableDataError$ = this.<%= camelize(moduleName) %>DataInterface.getSchemTestsError();
  }
<% if(hasModalUrl) { %>
  open<%= classify(modalName) %>Modal(id: string): void {
    this.router.navigate(['<%= moduleUrl %>'], { queryParams: { <%= underscore(moduleName) %>: id}, queryParamsHandling: 'merge' });
  }
<% } else { %>
  open<%= classify(modalName) %>Modal(id: string): void {
    const modalData = {
      height: 'auto',
      width: '800px',
      disableClose: true,
      data: id
    };
    this.dialog.open(<%= classify(modalName) %>ModalComponent, modalData);
  }
<% } %>
}
