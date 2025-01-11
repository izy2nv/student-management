import { Component, OnChanges, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-table',
  imports: [CommonModule, TableModule, InputIconModule, IconFieldModule, ButtonModule, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges {
  @Input() cols: Array<object> | undefined;
  @Input() vals: any;
  @Input() filterFields: Array<string> | undefined;
  @ViewChild('dt') table: Table | undefined;
  @Output() action = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(): void {
    this.vals = this.vals.map((val: any) => { return { ...val, name: val.fName + ' ' + val.lName } });
  }

  applyGlobalFilter(event: any) {
    this.table?.filterGlobal(event.target.value, 'contains');
  }

  callFn(method: string, obj: any) {
    this.action.emit({ method: method, obj });
  }
}


