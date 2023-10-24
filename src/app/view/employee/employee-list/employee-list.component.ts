import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../service/employee.service';
import {Employee} from '../../../domain/employee';
import {Table} from 'primeng/table';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];
  selectedEmployees!: Employee[] | null;
  loading: boolean = true;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employees = data.results.employees;
    });

    this.loading = false;
  }

  clear(table: Table) {
    table.clear();
  }

  confirmDelete(idEmployee: number) {
    if (confirm('Bạn có muốn xóa dữ liệu ?')) {
      console.log('this.selectedEmployees', idEmployee);
    }
  }

  deleteSelectedEmployees() {
    if (confirm('Bạn có muốn xóa dữ liệu ?')) {
      console.log(this.selectedEmployees);
    }
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.employees);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'employees');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName +
      '_' +
      new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[-T:]/g, '')
        .replace('.', '') +
      EXCEL_EXTENSION
    );
  }
}
