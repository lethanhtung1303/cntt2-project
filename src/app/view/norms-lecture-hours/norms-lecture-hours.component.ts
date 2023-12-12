import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {saveAsExcelFile} from "../../helper/excel-helper";
import {SelectItemGroup} from "primeng/api";
import {SemesterResponse, SemesterService} from "../../service/semester.service";
import {NormsLectureHours} from "../../domain/lecturer";
import {NormsLectureHoursResponse, NormsLectureHoursService} from "../../service/norms-lecture-hours.service";

@Component({
  selector: 'app-norms-lecture-hours',
  templateUrl: './norms-lecture-hours.component.html',
  styleUrls: ['./norms-lecture-hours.component.css']
})
export class NormsLectureHoursComponent implements OnInit {
  lectureData: NormsLectureHours[] = [];

  selectedSemester: number | undefined;
  groupedSemesters: SelectItemGroup[] = [];
  loading: boolean = true;

  constructor(private semesterService: SemesterService, private normsLectureHoursService: NormsLectureHoursService) {
    this.semesterService.getAllSemester().subscribe({
      next: (data: SemesterResponse) => {
        this.groupedSemesters = data.results.semesters;
        this.selectedSemester = this.getSelectedSemester(this.groupedSemesters)?.items[0].value
        if (this.selectedSemester) {
          this.getLecturerStandards(this.selectedSemester)
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  getSelectedSemester(groupedSemesters: SelectItemGroup[]): SelectItemGroup | null {
    return groupedSemesters.find(item => item.value === new Date().getFullYear()) ?? null;
  }

  ngOnInit() {
  }

  clear(table: Table) {
    table.clear();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.lectureData);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      saveAsExcelFile(excelBuffer, 'employees');
    });
  }

  onChangeSemester() {
    if (this.selectedSemester) {
      this.getLecturerStandards(this.selectedSemester)
    }
  }

  getLecturerStandards(semester: number) {
    this.normsLectureHoursService.getNormsLectureHours(semester).subscribe({
      next: (data: NormsLectureHoursResponse) => {
        this.lectureData = data.results.normsLectureHours;
        this.loading = false;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  getSeverity(status: number): string {
    switch (status) {
      case 1:
        return 'danger';
      case 2:
        return 'success';
      case 0:
        return 'warning';
      default:
        return 'secondary';
    }
  }

  getStatus(status: number): string {
    switch (status) {
      case 1:
        return 'Vượt mức';
      case 2:
        return 'Bình thường';
      case 0:
        return 'Cảnh báo';
      default:
        return 'Chưa giảng dạy';
    }
  }
}
