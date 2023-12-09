import {Component} from '@angular/core';
import {Table} from "primeng/table";
import {SelectItemGroup} from 'primeng/api';
import {SemesterResponse, SemesterService} from "../../../../service/semester.service";
import {saveAsExcelFile} from "../../../../helper/excel-helper";
import {UniversityStandard} from "../../../../domain/lecturer";
import {LecturerStandardService, UniversityStandardsResponse} from "../../../../service/lecturer-standards.service";


@Component({
  selector: 'app-university-lecturer-list',
  templateUrl: './university-lecturer-list.component.html',
  styleUrls: ['./university-lecturer-list.component.css']
})
export class UniversityLecturerListComponent {

  lecturers: UniversityStandard[] = [];
  loading: boolean = true;

  groupedSemesters: SelectItemGroup[] = [];

  selectedSemester: number | undefined;

  constructor(private semesterService: SemesterService, private lecturerStandardService: LecturerStandardService) {
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

  getLecturerStandards(semester: number) {
    this.lecturerStandardService.getUniversityStandards(semester).subscribe({
      next: (data: UniversityStandardsResponse) => {
        this.lecturers = data.results.universityStandards;
        this.loading = false;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  getSelectedSemester(groupedSemesters: SelectItemGroup[]): SelectItemGroup | null {
    return groupedSemesters.find(item => item.value === new Date().getFullYear()) ?? null;
  }

  clear(table: Table) {
    table.clear();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.lecturers);
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
}
