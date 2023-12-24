import {Component, Input, OnChanges} from '@angular/core';
import {SelectItemGroup} from "primeng/api";
import {SemesterResponse, SemesterService} from "../../../../../service/semester.service";
import {LecturerTeachingHistory} from "../../../../../domain/lecturer";
import {saveAsExcelFile} from "../../../../../helper/excel-helper";
import {Table} from "primeng/table";
import {
  LecturerTeachingHistoryService,
  TeachingHistoryResponse
} from "../../../../../service/lecturer-teaching-history.service";
import {getCurrentSemester} from "../../../../../helper/semesters";

@Component({
  selector: 'app-lecturer-teaching-history',
  templateUrl: './lecturer-teaching-history.component.html',
  styleUrls: ['./lecturer-teaching-history.component.css']
})
export class LecturerTeachingHistoryComponent implements OnChanges {
  @Input() lecturerId?: number;
  loading: boolean = false;
  selectedSemester: number | undefined;
  groupedSemesters: SelectItemGroup[] = [];

  teachingHistory: LecturerTeachingHistory[] = [];

  constructor(private semesterService: SemesterService, private lecturerTeachingHistoryService: LecturerTeachingHistoryService) {
    this.semesterService.getAllSemester().subscribe({
      next: (data: SemesterResponse) => {
        this.groupedSemesters = data.results.semesters;
        this.selectedSemester = getCurrentSemester(this.groupedSemesters)?.value
        if (this.selectedSemester && this.lecturerId) {
          this.getLecturerTeachingHistory(this.selectedSemester, this.lecturerId)
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  ngOnChanges(): void {
    if (this.selectedSemester && this.lecturerId) {
      this.getLecturerTeachingHistory(this.selectedSemester, this.lecturerId)
    }
  }

  onChangeSemester() {
    if (this.selectedSemester && this.lecturerId) {
      this.getLecturerTeachingHistory(this.selectedSemester, this.lecturerId)
    }
  }

  getLecturerTeachingHistory(semester: number, lecturerId: number) {
    this.lecturerTeachingHistoryService.getTeachingHistory({
      semester,
      lecturerId
    }).subscribe({
      next: (data: TeachingHistoryResponse) => {
        this.teachingHistory = data.results.teachingHistory;
        this.loading = false;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.teachingHistory);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      saveAsExcelFile(excelBuffer, 'employees');
    });
  }
}
