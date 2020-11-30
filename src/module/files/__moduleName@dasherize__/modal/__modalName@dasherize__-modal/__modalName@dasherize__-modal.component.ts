import { Component, OnInit, Inject } from '@angular/core';<% if(hasModalUrl) { %>
import { Router } from '@angular/router';<% } %>
import { <% if(!hasModalUrl) { %>MatDialogRef, <% } %>MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';

import { <%= classify(moduleName) %>DataInterface } from '../../<%= dasherize(moduleName) %>-datainterface.service';

import { Info } from 'src/app/shared/model/info.model';
import { SchemTestEntity } from 'src/app/store/model/schem-test-entity.model';

@Component({
  selector: 'app-<%= dasherize(modalName) %>-modal',
  templateUrl: './<%= dasherize(modalName) %>-modal.component.html',
  styleUrls: ['./<%= dasherize(modalName) %>-modal.component.scss']
})
export class <%= classify(modalName) %>ModalComponent implements OnInit {

  subscriptions: Subscription[] = [];

  modalData: Info<SchemTestEntity>;
  modalDataLoading$: Observable<boolean>;
  modalDataError$: Observable<boolean | null>;

  constructor(
    private <%= camelize(moduleName) %>DataInterface: <%= classify(moduleName) %>DataInterface,<% if(hasModalUrl) { %>
    private router: Router,<% } else { %>
    public dialogRef: MatDialogRef <<%= classify(modalName) %>ModalComponent>,<% } %>
    @Inject(MAT_DIALOG_DATA) public passedData: string
  ) { }

  ngOnInit() {
    if (this.passedData !== '') {
      this.loadData();
    }
  }

  loadData() {
    this.subscriptions.push(this.<%= camelize(moduleName) %>DataInterface.getSchemTest(this.passedData).subscribe(
      data => {
        if (data !== undefined) {
          this.modalData = data;
        }
      }
    ));

    this.modalDataLoading$ = this.<%= camelize(moduleName) %>DataInterface.getSchemTestsLoading();
    this.modalDataError$ = this.<%= camelize(moduleName) %>DataInterface.getSchemTestsError();
  }

  closeModal() {<% if(hasModalUrl) { %>
    this.router.navigate(['<%= moduleUrl %>'], { queryParams: { <%= underscore(moduleName) %>: null }, queryParamsHandling: 'merge' });<% } else { %>
    this.dialogRef.close();<% } %>
  }

}
