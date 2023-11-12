import {Component, OnInit} from '@angular/core';
import {Table} from "primeng/table";
import {SelectItemGroup} from 'primeng/api';
import * as FileSaver from "file-saver";


export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
}

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
export class UniversityLecturerListComponent implements OnInit {

  lecturers: Lecturer[] = [];
  loading: boolean = true;

  groupedSemesters: SelectItemGroup[];

  selectedSemester: string | undefined;

  constructor() {
    this.groupedSemesters = [
      {
        label: '2023-2024',
        value: 'de',
        items: [
          {label: 'Học kỳ 1/ 2023-2024', value: 'Berlin'}
        ]
      },
      {
        label: '2022-2023',
        value: 'us',
        items: [
          {label: 'Học kỳ hè/ 2022-2023', value: 'Chicago'},
          {label: 'Học kỳ 2/ 2022-2023', value: 'Los Angeles'},
          {label: 'Học kỳ 1/ 2022-2023', value: 'New York'}
        ]
      },
      {
        label: '2021-2022',
        value: 'jp',
        items: [
          {label: 'Học kỳ 2/ 2021-2022', value: 'Kyoto'},
          {label: 'Học kỳ 1/ 2021-2022', value: 'Osaka'},
          {label: 'Học kỳ hè/ 2020-2021', value: 'Tokyo'}
        ]
      }
    ];
  }

  ngOnInit() {
    this.loading = false;
    this.selectedSemester = 'Berlin'
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

    console.log(this.lecturers);


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
