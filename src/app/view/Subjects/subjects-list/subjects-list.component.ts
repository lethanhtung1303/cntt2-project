import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {UserHelper} from "../../../helper/user-helper";
import {ErrorResponse, GlobalErrorService} from "../../../service/global-error.service";
import {SubjectGroupResponse, SubjectResponse, SubjectService} from "../../../service/subject.service";
import {Subject, SubjectCreate, SubjectCreateRequest, SubjectGroup} from "../../../domain/subject";
import {Table} from "primeng/table";
import {saveAsExcelFile} from "../../../helper/excel-helper";

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SubjectsListComponent {
  selectedSubjects: Subject[] | null = null;
  loading: boolean = true;
  subjects!: Subject[];


  visible: boolean = false;
  subjectCreateForm: FormGroup = new FormGroup({
    subjectGroup: new FormControl<number | null>(null, [
      Validators.required
    ]),
    subjectType: new FormControl<number | null>(null, [
      Validators.required
    ]),
    subjectCode: new FormControl('', [
      Validators.required
    ]),
    subjectName: new FormControl('', [
      Validators.required
    ]),
    numberLessons: new FormControl<number | null>(null, [
      Validators.required
    ]),
  });

  userLogin: string;
  subjectGroups: SubjectGroup[] = [];

  err: ErrorResponse = {errMessage: null, errorCode: null}

  constructor(private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private userHelper: UserHelper, protected globalErrorService: GlobalErrorService, private subjectService: SubjectService) {
    this.userLogin = userHelper.getUserLogin()

    this.subjectService.getAllSubjectGroup().subscribe({
      next: (data: SubjectGroupResponse) => {
        this.subjectGroups = data.results.subjectGroups;
      },
      error: (error) => {
        console.log(error)
      }
    });


    this.subjectService.getAllSubject().subscribe({
      next: (data: SubjectResponse) => {
        this.subjects = data.results.subjects;
        this.loading = false;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  onCancel() {
    this.visible = false;
    this.subjectCreateForm.reset()
    this.globalErrorService.clearError()
  }

  onSubmit() {
    const request: SubjectCreateRequest = this.genSubjectCreateRequest(this.subjectCreateForm.value, this.userLogin)
    this.subjectService.createSubject(request).subscribe({
      next: () => {
        this.router.navigate(['/subject']).then(() => window.location.reload());
      },
      error: (error) => {
        if (error.status === 400) {
          this.err = {
            errMessage: error.error.results[0].message,
            errorCode: error.error.results[0].errorCd
          }
          this.globalErrorService.setGlobalError(this.err)
        } else {
          this.err = {
            errMessage: "Something went wrong here.",
            errorCode: error.error.results[0].errorCd
          }
          this.globalErrorService.setGlobalError(this.err)
        }
      }
    });
  }

  genSubjectCreateRequest(subjectCreateForm: any, userLogin: string): SubjectCreateRequest {
    const subjectCreate: SubjectCreate = {
      maNhom: subjectCreateForm.subjectGroup,
      maLoai: subjectCreateForm.subjectType,
      maMon: subjectCreateForm.subjectCode,
      tenMon: subjectCreateForm.subjectName.replace(/^\[.*?\]\s*/, ''),
      soTiet: subjectCreateForm.numberLessons
    }
    return {
      subjectCreate: subjectCreate,
      createBy: userLogin
    }
  }

  clear(table: Table) {
    table.clear();
  }

  deleteSelectedSubjects() {
    this.confirmationService.confirm({
      key: 'deleteSelectedSubjects',
      accept: () => {
        let concatenatedIds: string = ''
        if (this.selectedSubjects) {
          concatenatedIds = this.selectedSubjects.map(subject => subject.maMon).join(',');
        }
        this.subjectService.deleteSubject({
          subjectIds: concatenatedIds,
          deleteBy: this.userLogin
        }).subscribe({
          next: () => {
            this.messageService.add({
              key: 'deleteSelectedSubjects',
              severity: 'error',
              summary: 'Đã xoá',
              detail: 'Bạn đã xoá TẤT CẢ Môn học đã chọn!'
            });
            this.router.navigate([]).then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 1000);
            });
          },
          error: (error) => {
            console.log(error)
          },
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              key: 'deleteSelectedSubjects',
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled!'
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              key: 'deleteSelectedSubjects',
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled!'
            });
            break;
        }
      }
    });
  }

  exportExcel() {
    const exportData: {
      maMon: string,
      phanLoai: string,
      tenMon: string,
      soTiet: number,
      tenNhom: string
    }[] = this.subjects.map(subject => {
      return {
        maMon: subject.maMon,
        phanLoai: subject.phanLoai,
        tenMon: subject.tenMon,
        soTiet: subject.soTiet,
        tenNhom: subject.subjectGroup.tenNhom
      };
    });

    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(exportData);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      saveAsExcelFile(excelBuffer, 'Subjects');
    });
  }

  confirmDelete(subjectId: string) {
    this.confirmationService.confirm({
      key: subjectId,
      accept: () => {
        this.subjectService.deleteSubject({
          subjectIds: subjectId,
          deleteBy: this.userLogin
        }).subscribe({
          next: () => {
            this.messageService.add({
              key: subjectId,
              severity: 'error',
              summary: 'Đã xoá',
              detail: `Bạn đã xoá môn học: ${subjectId}`
            });
            this.router.navigate([]).then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 750);
            });
          },
          error: (error) => {
            console.log(error)
          },
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              key: subjectId,
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              key: subjectId,
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
        }
      }
    });
  }
}
