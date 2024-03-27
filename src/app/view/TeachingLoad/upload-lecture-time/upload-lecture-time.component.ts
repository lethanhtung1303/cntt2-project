import { Component, ElementRef, ViewChild } from '@angular/core';
import { Lecturer, TrainingSys } from '../../../domain/lecturer';
import {
  LecturerResponse,
  LecturerService,
} from '../../../service/lecturer.service';
import { Subject } from '../../../domain/subject';
import {
  SubjectResponse,
  SubjectService,
} from '../../../service/subject.service';
import * as XLSX from 'xlsx';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  SelectItemGroup,
} from 'primeng/api';
import {
  SemesterResponse,
  SemesterService,
} from '../../../service/semester.service';
import { getCurrentSemester } from '../../../helper/semesters';
import { Table } from 'primeng/table';
import { Const } from '../../../constant/Const';
import { UserHelper } from '../../../helper/user-helper';
import {
  Assignment,
  UploadAssignmentRequest,
} from '../../../domain/teaching-assignment';
import { SelectItem } from 'primeng/api/selectitem';
import { AssignmentService } from '../../../service/assignment.service';

interface DataObjects {
  SubjectId?: string;
  SubjectName?: string;
  TotalShift?: string;
  SystemId?: string;
  SubSystem?: string;
  LecturerId?: number;
  FullName?: string;
  LecturerType?: string;
  EmailTDTU?: string;
  Phone?: string;
  isValid?: boolean;
}

@Component({
  selector: 'app-upload-lecture-time',
  templateUrl: './upload-lecture-time.component.html',
  styleUrls: ['./upload-lecture-time.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class UploadLectureTimeComponent {
  lecturers!: Lecturer[];
  subjects!: Subject[];
  trainingSys: TrainingSys[] = Const.trainingSys;
  dataObjects: DataObjects[] = [];
  selectedSemester: number | undefined;
  semesterForAssign: number | undefined;
  groupedSemesters: SelectItemGroup[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private lecturerService: LecturerService,
    private subjectService: SubjectService,
    private semesterService: SemesterService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userHelper: UserHelper,
    private assignmentService: AssignmentService,
  ) {
    this.semesterService.getAllSemester().subscribe({
      next: (data: SemesterResponse) => {
        this.groupedSemesters = data.results.semesters;
        this.selectedSemester = getCurrentSemester(
          this.groupedSemesters,
        )?.value;
        if (this.selectedSemester) {
          this.semesterForAssign = this.selectedSemester;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.lecturerService.getAllLecturer().subscribe({
      next: (data: LecturerResponse) => {
        this.lecturers = data.results.lecturers;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.subjectService.getAllSubject().subscribe({
      next: (data: SubjectResponse) => {
        this.subjects = data.results.subjects;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onFileChange(event: any): void {
    this.dataObjects = [];
    const file = event.target.files[0];

    if (file) {
      this.readExcel(file);
    }
  }

  readExcel(file: File): void {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, {
        type: 'binary',
      });

      // Lấy giá trị từ dòng đầu của các cột A, B, R, E, F, V, W, X, AA, AB
      const sheetName = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      const headers = [
        'A1',
        'B1',
        'R1',
        'E1',
        'F1',
        'V1',
        'W1',
        'X1',
        'AA1',
        'AB1',
      ];

      // Lấy giá trị từ các cột
      const columnValues: { [key: string]: string[] } = {};
      headers.forEach((header) => {
        const columnName = header.replace(/[0-9]/g, ''); // Loại bỏ số từ tên cột
        columnValues[columnName] = this.getColumnValues(worksheet, columnName);
      });

      // Tạo danh sách đối tượng từ các giá trị
      const rowCount = Math.max(
        ...Object.values(columnValues).map((values) => values.length),
      );
      for (let i = 1; i < rowCount; i++) {
        const dataObject: { [key: string]: string } = {};
        for (const header of headers) {
          const columnName = header.replace(/[0-9]/g, ''); // Loại bỏ số từ tên cột
          const property = this.mapHeaderToProperty(columnName);
          dataObject[property] = columnValues[columnName][i];
        }
        this.dataObjects.push(dataObject);
      }

      const uniqueObjects = new Set(); // Sử dụng Set để kiểm tra sự trùng lặp

      this.dataObjects.forEach((obj) => {
        const subjectExists = this.subjects.some(
          (subject) => subject.maMon === obj.SubjectId,
        );
        const lecturerExists = this.lecturers.some(
          (lecturer) => lecturer.id === obj.LecturerId,
        );
        const sysExists = this.trainingSys.some(
          (sys) => sys.trainingSysCode === obj.SystemId,
        );

        // Kiểm tra trùng lặp dựa trên JSON.stringify
        const isDuplicate = uniqueObjects.has(
          JSON.stringify({
            SubjectId: obj.SubjectId,
            LecturerId: obj.LecturerId,
            SystemId: obj.SystemId,
          }),
        );

        obj.isValid =
          subjectExists && lecturerExists && sysExists && !isDuplicate;

        // Thêm đối tượng vào Set để kiểm tra trùng lặp
        uniqueObjects.add(
          JSON.stringify({
            SubjectId: obj.SubjectId,
            LecturerId: obj.LecturerId,
            SystemId: obj.SystemId,
          }),
        );
      });
    };

    this.dataObjects = Array.from(
      new Set(this.dataObjects.map((item) => JSON.stringify(item))),
    ).map((item) => JSON.parse(item) as DataObjects);

    reader.readAsBinaryString(file);
  }

  getColumnValues(worksheet: XLSX.WorkSheet, column: string): string[] {
    const columnValues: string[] = [];
    const columnRegex = new RegExp(`^${column}[0-9]+$`);

    for (const cell in worksheet) {
      if (worksheet.hasOwnProperty(cell) && columnRegex.test(cell)) {
        columnValues.push(worksheet[cell].v);
      }
    }

    return columnValues;
  }

  mapHeaderToProperty(header: string): string {
    const mapping: { [key: string]: string } = {
      A: 'SubjectId',
      B: 'SubjectName',
      R: 'TotalShift',
      E: 'SystemId',
      F: 'SubSystem',
      V: 'LecturerId',
      W: 'FullName',
      X: 'LecturerType',
      AA: 'EmailTDTU',
      AB: 'Phone',
    };

    return mapping[header] || header;
  }

  onChangeSemester() {
    if (this.selectedSemester) {
      this.semesterForAssign = this.selectedSemester;
    }
  }

  checkValidSemester(): boolean {
    if (this.semesterForAssign === undefined || isNaN(this.semesterForAssign)) {
      return false;
    }

    const currentYear = new Date().getFullYear();
    const semesterYear = Math.floor(this.semesterForAssign / 100);

    return semesterYear > currentYear + 1 || semesterYear < currentYear - 1;
  }

  onSubmit() {
    const assignment: Assignment[] = this.genAssignmentRequest();
    this.confirmationService.confirm({
      message: `
Bạn có chắc chắn muốn tiếp tục không?
<br>Học kỳ phân công: ${this.getSemester(this.semesterForAssign)?.label}
<br>Tổng số dữ liệu hợp lệ: ${assignment.length}
`,
      header: 'Thêm mới Giờ giảng',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        const uniqueAssignment = Array.from(
          new Set(assignment.map((item) => JSON.stringify(item))),
        ).map((item) => JSON.parse(item) as Assignment);

        const request: UploadAssignmentRequest = {
          assignments: uniqueAssignment,
          createBy: this.userHelper.getUserLogin(),
        };

        this.assignmentService.uploadLectureTime(request).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Thành công',
              detail: `Đã lưu ${request.assignments.length} Giờ giảng vào hệ thống!`,
            });
            setTimeout(() => {
              this.onClear();
              window.location.reload();
            }, 1000);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Huỷ bỏ',
              detail: 'Thao tác được huỷ bỏ',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Huỷ bỏ',
              detail: 'Thao tác được huỷ bỏ',
            });
            break;
        }
      },
    });
  }

  onClear() {
    this.dataObjects = [];
    this.fileInput.nativeElement.value = '';
  }

  checkValidSubmit() {
    return this.genAssignmentRequest().length <= 0;
  }

  clear(table: Table) {
    table.clear();
  }

  genAssignmentRequest() {
    return this.dataObjects
      .filter((obj) => obj.isValid === true)
      .map(
        (obj) =>
          ({
            giangVienId: obj.LecturerId,
            hocKy: this.semesterForAssign,
            maMon: obj.SubjectId,
            maHe: obj.SystemId,
          }) as Assignment,
      );
  }

  getSemester(semester: number | undefined) {
    const matchingSemesterItem = this.groupedSemesters.find(
      (group: SelectItemGroup) =>
        group.items.find((item: SelectItem) => item.value === semester),
    );
    if (matchingSemesterItem) {
      return matchingSemesterItem.items.find(
        (item: SelectItem) => item.value === semester,
      );
    } else {
      return undefined;
    }
  }
}
