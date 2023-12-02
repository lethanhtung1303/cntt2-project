import {Component} from '@angular/core';
import {Table} from "primeng/table";
import {SelectItemGroup} from 'primeng/api';
import {SemesterResponse, SemesterService} from "../../../../service/semester.service";
import {saveAsExcelFile} from "../../../../helper/excel-helper";

export interface TrainingSystem {
  id?: number;
  name?: string;
}

export interface Lecturer {
  id?: number;
  image?: string;
  name?: string;
  emailTdtu?: string;
  isTheory?: boolean;
  isPractice?: boolean;
  isTeachingVietnamese?: boolean;
  isTeachingEnglish?: boolean;
  trainingSystem?: TrainingSystem;
}

@Component({
  selector: 'app-university-lecturer-list',
  templateUrl: './university-lecturer-list.component.html',
  styleUrls: ['./university-lecturer-list.component.css']
})
export class UniversityLecturerListComponent {

  lecturers: Lecturer[] = [];
  loading: boolean = true;

  groupedSemesters: SelectItemGroup[] = [];

  selectedSemester: number | undefined;

  constructor(private semesterService: SemesterService) {
    this.semesterService.getAllSemester().subscribe({
      next: (data: SemesterResponse) => {
        this.groupedSemesters = data.results.semesters;
        this.selectedSemester = this.getSelectedSemester(this.groupedSemesters)?.items[0].value
      },
      error: (error) => {
        console.log(error)
      }
    });

    this.loading = false;
    const trainingSystems = [
      {id: 1, name: 'Hệ tiêu chuẩn'},
      {id: 2, name: 'Hệ chất lượng cao'},
      {id: 3, name: 'Hệ 100% tiếng Anh/Liên kết'},
    ];


    for (let i = 1; i <= 8; i++) {
      const lecturer: Lecturer = {
        id: i,
        image: `image_${i}.jpg`,
        name: `Lecturer ${i}`,
        emailTdtu: `lecturer${i}@tdtu.edu.vn`,
        isTheory: Math.random() < 0.5,
        isPractice: Math.random() < 0.5,
        isTeachingVietnamese: Math.random() < 0.5,
        isTeachingEnglish: Math.random() < 0.5,
        trainingSystem: this.getRandomItem(trainingSystems),
      };

      this.lecturers.push(lecturer);
    }
  }

  getSelectedSemester(groupedSemesters: SelectItemGroup[]): SelectItemGroup | null {
    return groupedSemesters.find(item => item.value === new Date().getFullYear()) ?? null;
  }

  getRandomItem(arr: any) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
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
}
