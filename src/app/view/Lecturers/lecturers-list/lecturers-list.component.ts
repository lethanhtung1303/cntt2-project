import {Component, OnInit} from '@angular/core';
import {LecturerResponse, LecturerService} from '../../../service/lecturer.service';
import {Lecturer, TrainingProcess} from '../../../domain/lecturer';
import {Table} from 'primeng/table';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-lecturers-list',
  templateUrl: './lecturers-list.component.html',
  styleUrls: ['./lecturers-list.component.css']
})
export class LecturersListComponent implements OnInit {
  lecturers!: Lecturer[];
  selectedLecturers!: Lecturer[] | null;
  loading: boolean = true;

  constructor(private employeeService: LecturerService) {
  }

  ngOnInit(): void {
    this.employeeService.getLecturer().subscribe({
      next: (data: LecturerResponse) => {
        this.lecturers = data.results.lecturers;
        this.loading = false;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  generateLevel(trainingProcess: TrainingProcess[]): string {
    const sortedTrainingProcess = trainingProcess.sort((a, b) => a.level.displayOrder - b.level.displayOrder);
    const top2TrainingProcess = sortedTrainingProcess.slice(0, 2);
    return top2TrainingProcess.map((tp) => tp.level.kyHieu).join('.');
  }

  clear(table: Table) {
    table.clear();
  }

  confirmDelete(idLecturer: number) {
    if (confirm('Bạn có muốn xóa dữ liệu ?')) {
      console.log('Lecturer Id: ', idLecturer);
    }
  }

  deleteSelectedLecturers() {
    if (confirm('Bạn có muốn xóa dữ liệu ?')) {
      console.log('selected Lecturers: ', this.selectedLecturers);
    }
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.lecturers);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['lecturers']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'lecturers');
    }).catch((error) => {
      console.log(error)
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
