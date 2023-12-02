import {Component} from '@angular/core';
import {Table} from "primeng/table";
import {SelectItemGroup} from 'primeng/api';
import * as FileSaver from "file-saver";
import {SemesterResponse, SemesterService} from "../../../../service/semester.service";


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
export class UniversityLecturerListComponent {

    lecturers: Lecturer[] = [];
    loading: boolean = true;

    groupedSemesters: SelectItemGroup[] = [];

    selectedSemester: number | undefined;

    constructor(private semesterService: SemesterService) {
        this.semesterService.getAllSemester().subscribe({
            next: (data: SemesterResponse) => {
                this.groupedSemesters = data.results.semesters;
            },
            error: (error) => {
                console.log(error)
            }
        });
        this.selectedSemester = 202301

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
