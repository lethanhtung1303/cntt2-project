import {Component} from '@angular/core';
import {ExtraLectureHours} from "../../../domain/lecturer";
import {SelectItemGroup} from "primeng/api";
import {Table} from "primeng/table";
import {saveAsExcelFile} from "../../../helper/excel-helper";
import {SemesterResponse, SemesterService} from "../../../service/semester.service";
import {ExtraLectureHoursResponse, ExtraLectureHoursService} from "../../../service/extra-lecture-hours.service";
import {convertAmount} from "../../../helper/amout";

@Component({
  selector: 'app-contractual-lecturer',
  templateUrl: './contractual-lecturer.component.html',
  styleUrls: ['./contractual-lecturer.component.css']
})
export class ContractualLecturerComponent {
  loading: boolean = false;
  lectureData: ExtraLectureHours[] = [];
  selectedSemester: number | undefined;
  groupedSemesters: SelectItemGroup[] = [];
  protected readonly convertAmount = convertAmount;

  constructor(private semesterService: SemesterService, private extraLectureHoursService: ExtraLectureHoursService) {
    this.semesterService.getAllSemester().subscribe({
      next: (data: SemesterResponse) => {
        this.groupedSemesters = data.results.semesters;
        this.selectedSemester = this.getSelectedSemester(this.groupedSemesters)?.items[0].value
        if (this.selectedSemester) {
          this.getExtraLectureHours(this.selectedSemester)
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  onChangeSemester() {
    if (this.selectedSemester) {
      this.getExtraLectureHours(this.selectedSemester)
    }
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

  getExtraLectureHours(semester: number) {
    this.extraLectureHoursService.getExtraHoursForContractual(semester).subscribe({
      next: (data: ExtraLectureHoursResponse) => {
        console.log(data.results.extraLectureHours);
        this.lectureData = data.results.extraLectureHours;
        console.log(this.lectureData)
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
}
