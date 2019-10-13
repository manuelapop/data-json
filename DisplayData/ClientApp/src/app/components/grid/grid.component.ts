import { Component } from '@angular/core';
import { FetchService } from './../../fetch.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent{
  columnDefs;
  rowData;
  defaultColDef;
  gridApi;
  gridColumnApi;
  results: [];
  selectOneVal: any;
  paginationPageSize;

  selections = [
    { id: 'posts', name: 'posts' },
    { id: 'comments', name: 'comments' },
    { id: 'albums', name: 'albums'},
    { id: 'photos', name: 'photos' },
    { id: 'todos', name: 'todos' }
  ];


  generateColumns(data: any[]) {
    let columnDefinitions = [];
    data.map(object => {

      Object
        .keys(object)
        .map(key => {
          let mappedColumn;
          if (key.toUpperCase() === 'ID') {
            mappedColumn = {
              headerName: key.toUpperCase(),
              field: key,
              filter: 'text',
              sort: 'desc'
            }
          }
          else {
            mappedColumn = {
              headerName: key.toUpperCase(),
              field: key,
              filter: 'text'
            }
          }
          columnDefinitions.push(mappedColumn);
        })
    })
    columnDefinitions = columnDefinitions.filter((column, index, self) =>
      index === self.findIndex((colAtIndex) => (
        colAtIndex.field === column.field
      ))
    )
    return columnDefinitions;
  }

  constructor(private fetchService: FetchService) {

    this.defaultColDef = {
      sortable: true,
      filter: true,
      resizable: true
    };
   this.paginationPageSize = 10;
  }

  onChange(newVal: any) {
    this.fetchService.getData(this.selectOneVal).subscribe((res) => {
      let rows = res.sort((a, b) => (a.id < b.id) ? 1 : -1);
      this.rowData = rows;
      this.gridApi.setRowData(this.rowData);
      if (this.rowData) {
        this.columnDefs = this.generateColumns(this.rowData);
        this.selectOneVal = this.selectOneVal;
        this.gridApi.redrawRows();
        this.gridApi.sizeColumnsToFit();
      }
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    var defaultSortModel = [
      {
        colId: "ID",
        sort: "desc"
      }
    ];

    params.api.setSortModel(defaultSortModel);

    this.fetchService.getData('posts').subscribe((res) => {
      let rows = res.sort((a, b) => (a.id < b.id) ? 1 : -1);
      this.rowData = rows;
      if (this.rowData) {
        this.columnDefs = this.generateColumns(this.rowData);
        this.selectOneVal = 'posts';
        params.api.sizeColumnsToFit();
      }
    });

    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }

}
