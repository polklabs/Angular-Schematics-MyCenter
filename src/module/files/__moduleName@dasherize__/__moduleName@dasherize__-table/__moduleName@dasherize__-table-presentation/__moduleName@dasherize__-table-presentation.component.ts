import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Info } from 'src/app/shared/model/info.model';
import { SchemTestEntity } from 'src/app/store/model/schem-test-entity.model';

@Component({
  selector: 'app-<%= dasherize(moduleName) %>-table-presentation',
  templateUrl: './<%= dasherize(moduleName) %>-table-presentation.component.html',
  styleUrls: ['./<%= dasherize(moduleName) %>-table-presentation.component.scss']
})
export class <%= classify(moduleName) %>TablePresentationComponent implements OnInit, OnDestroy {

  @Input() tableData$: Observable<Info<SchemTestEntity>[]>;
  @Input() tableDataLoading$: Observable<boolean>;
  @Input() tableDataError$: Observable<boolean>;

  @Output() tableRowClicked = new EventEmitter<string>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSubscriptions: Subscription[] = [];

  dataSource = new MatTableDataSource<SchemTestEntity>([]);
  displayedColumns = [
    'Row',
    'Data'
  ];

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;

    this.loadTableData();
  }

  ngOnDestroy() {
    for (const sub of this.dataSubscriptions) {
      sub.unsubscribe();
    }
  }

  loadTableData() {
    this.dataSubscriptions.push(this.tableData$.subscribe(
      data => {
        this.dataSource.data = data.map(x => x.entity);
      }
    ));
  }

}
