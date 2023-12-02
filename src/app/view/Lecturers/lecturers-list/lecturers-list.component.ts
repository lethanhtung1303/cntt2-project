import {Component} from '@angular/core';
import {LecturerResponse, LecturerService} from '../../../service/lecturer.service';
import {Lecturer, LecturerCreate, LecturerCreateRequest, TrainingProcess} from '../../../domain/lecturer';
import {Table} from 'primeng/table';
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserHelper} from "../../../helper/user-helper";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorResponse, GlobalErrorService} from "../../../service/global-error.service";
import {helperExportExcel} from "../../../helper/excel-helper";

@Component({
  selector: 'app-lecturers-list',
  templateUrl: './lecturers-list.component.html',
  styleUrls: ['./lecturers-list.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class LecturersListComponent {
  err: ErrorResponse = {errMessage: null, errorCode: null}
  lecturers!: Lecturer[];
  selectedLecturers: Lecturer[] | null = null;
  loading: boolean = true;
  userLogin: string;

  visible: boolean = false;
  lecturerCreateForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    fullName: new FormControl('', [
      Validators.required
    ]),
    classification: new FormControl<boolean | null>(null, [
      Validators.required
    ]),
    mainPosition: new FormControl('', [
      Validators.required
    ]),
    secondaryPosition: new FormControl('', []),
    birthday: new FormControl('', [
      Validators.required
    ]),
    gender: new FormControl<number | null>(null, [
      Validators.required
    ]),
    placeOfBirth: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    addressTmp: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/i)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([.\-]?\w+)*@\w+([.\-]?\w+)*(\.\w{2,3})+$/i)
    ]),
    emailTdtu: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([.\-]?\w+)*@tdtu\.edu\.vn$/i)
    ]),
    workplace: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private router: Router, private lecturerService: LecturerService, private confirmationService: ConfirmationService, private messageService: MessageService, private userHelper: UserHelper, public globalErrorService: GlobalErrorService) {
    this.userLogin = userHelper.getUserLogin()

    this.lecturerService.getAllLecturer().subscribe({
      next: (data: LecturerResponse) => {
        this.lecturers = data.results.lecturers;
        this.loading = false;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  get images() {
    return this.lecturerCreateForm.get('images');
  }

  get firstName() {
    return this.lecturerCreateForm.get('firstName');
  }

  get fullName() {
    return this.lecturerCreateForm.get('fullName');
  }

  get classification() {
    return this.lecturerCreateForm.get('classification');
  }

  get mainPosition() {
    return this.lecturerCreateForm.get('mainPosition');
  }

  get secondaryPosition() {
    return this.lecturerCreateForm.get('secondaryPosition');
  }

  get birthday() {
    return this.lecturerCreateForm.get('birthday');
  }

  get gender() {
    return this.lecturerCreateForm.get('gender');
  }

  get placeOfBirth() {
    return this.lecturerCreateForm.get('placeOfBirth');
  }

  get address() {
    return this.lecturerCreateForm.get('address');
  }

  get addressTmp() {
    return this.lecturerCreateForm.get('addressTmp');
  }

  get phone() {
    return this.lecturerCreateForm.get('phone');
  }

  get email() {
    return this.lecturerCreateForm.get('email');
  }

  get emailTdtu() {
    return this.lecturerCreateForm.get('emailTdtu');
  }

  get workplace() {
    return this.lecturerCreateForm.get('workplace');
  }

  generateLevel(trainingProcess: TrainingProcess[]): string {
    const uniqueTrainingProcess = Array.from(new Map(trainingProcess.map(tp => [tp.level.id, tp])).values());
    const sortedTrainingProcess = uniqueTrainingProcess.sort((a, b) => a.level.displayOrder - b.level.displayOrder);
    const top2TrainingProcess = sortedTrainingProcess.slice(0, 2);
    return top2TrainingProcess.map((tp) => tp.level.kyHieu).join('.');
  }

  clear(table: Table) {
    table.clear();
  }

  exportExcel() {
    type LecturerWithoutDetails = Omit<Lecturer, 'classificationLecturers' | 'certificate' | 'trainingProcess' | 'satisfactionScore'>;

    const lecturersWithoutDetails: LecturerWithoutDetails[] = this.lecturers.map(({
                                                                                    classificationLecturers,
                                                                                    certificate,
                                                                                    trainingProcess,
                                                                                    satisfactionScore,
                                                                                    ...lecturerWithoutDetails
                                                                                  }) => lecturerWithoutDetails);

    helperExportExcel(lecturersWithoutDetails, 'Lecturers')
  }

  confirmDelete(idLecturer: number) {
    this.confirmationService.confirm({
      key: idLecturer.toString(),
      accept: () => {
        this.lecturerService.deleteLecturer({
          lecturerIds: idLecturer.toString(),
          deleteBy: this.userLogin
        }).subscribe({
          next: () => {
            this.messageService.add({
              key: idLecturer.toString(),
              severity: 'error',
              summary: 'Đã xoá',
              detail: `Bạn đã xoá giảng viên: ${idLecturer}`
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
              key: idLecturer.toString(),
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              key: idLecturer.toString(),
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
        }
      }
    });
  }

  deleteSelectedLecturers() {
    this.confirmationService.confirm({
      key: 'deleteSelectedLecturers',
      accept: () => {
        let concatenatedIds: string = ''
        if (this.selectedLecturers) {
          concatenatedIds = this.selectedLecturers.map(lecturer => lecturer.id).join(',');
        }
        this.lecturerService.deleteLecturer({
          lecturerIds: concatenatedIds,
          deleteBy: this.userLogin
        }).subscribe({
          next: () => {
            this.messageService.add({
              key: 'deleteSelectedLecturers',
              severity: 'error',
              summary: 'Đã xoá',
              detail: 'Bạn đã xoá TẤT CẢ Giảng viên đã chọn'
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
              key: 'deleteSelectedLecturers',
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              key: 'deleteSelectedLecturers',
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
        }
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  onCancel() {
    this.visible = false;
    this.lecturerCreateForm.reset()
    this.globalErrorService.clearError()
  }

  onSubmit() {
    const request: LecturerCreateRequest = this.genLecturerCreateRequest(this.lecturerCreateForm.value, this.userLogin)
    this.lecturerService.createLecturer(request).subscribe({
      next: () => {
        this.router.navigate([]).then(() => window.location.reload());
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

  genLecturerCreateRequest(lecturerCreateForm: any, userLogin: string): LecturerCreateRequest {
    const lecturerCreate: LecturerCreate = {
      images: "https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg", // default avt
      firstName: lecturerCreateForm.firstName,
      fullName: lecturerCreateForm.fullName,
      classification: lecturerCreateForm.classification,
      mainPosition: lecturerCreateForm.mainPosition,
      secondaryPosition: lecturerCreateForm.secondaryPosition,
      birthday: lecturerCreateForm.birthday,
      gender: lecturerCreateForm.gender,
      placeOfBirth: lecturerCreateForm.placeOfBirth,
      address: lecturerCreateForm.address,
      addressTmp: lecturerCreateForm.addressTmp,
      phone: lecturerCreateForm.phone,
      email: lecturerCreateForm.email,
      emailTdtu: lecturerCreateForm.emailTdtu,
      workplace: lecturerCreateForm.workplace,
    }
    return {
      lecturerCreate: lecturerCreate,
      createBy: userLogin
    }
  }
}
