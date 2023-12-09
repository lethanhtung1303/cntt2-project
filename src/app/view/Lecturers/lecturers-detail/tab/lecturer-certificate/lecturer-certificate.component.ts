import {Component, Input, OnChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {UserHelper} from "../../../../../helper/user-helper";
import {CertificateService, CertificateTypeResponse} from "../../../../../service/certificate.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/api/selectitem";
import {Certificate, CertificateCreate, CertificateCreateRequest} from "../../../../../domain/certificate";

@Component({
  selector: 'app-lecturer-certificate',
  templateUrl: './lecturer-certificate.component.html',
  styleUrls: ['./lecturer-certificate.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class LecturerCertificateComponent implements OnChanges {
  @Input() lecturerId?: number;
  @Input() certificates?: Certificate[];

  certificateList: Certificate[] = [];

  userLogin: string;
  visible: boolean = false;
  certificateForm: FormGroup = new FormGroup({
    certificateType: new FormControl<number | null>(null, [
      Validators.required
    ]),
    certificateScore: new FormControl('', [
      Validators.required
    ]),
  });
  subjects: SelectItem[] = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService, private userHelper: UserHelper, private certificateService: CertificateService) {
    this.userLogin = userHelper.getUserLogin()
    this.certificateService.getAllCertificateType().subscribe({
      next: (data: CertificateTypeResponse) => {
        this.subjects = data.results.certificateType;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  ngOnChanges(): void {
    this.certificateList = this.certificates ?? [];
  }

  confirmDelete(certificateId: number) {
    this.confirmationService.confirm({
      key: certificateId.toString(),
      accept: () => {
        this.certificateService.deleteCertificate({
          certificateId: certificateId.toString(),
          deleteBy: this.userLogin
        }).subscribe({
          next: () => {
            this.messageService.add({
              key: certificateId.toString(),
              severity: 'error',
              summary: 'Đã xoá',
              detail: `Bạn đã xoá Chứng chỉ: ${certificateId}`
            });
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: {tab: 'certificate'},
              queryParamsHandling: 'merge',
            }).then(() => {
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
              key: certificateId.toString(),
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              key: certificateId.toString(),
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
    this.certificateForm.reset()
  }

  onSubmit() {
    const request: CertificateCreateRequest = this.genCertificateCreateRequest(this.certificateForm.value, this.userLogin, this.lecturerId)
    this.certificateService.createCertificate(request).subscribe({
      next: () => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {tab: 'certificate'},
          queryParamsHandling: 'merge',
        }).then(() => window.location.reload());
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  genCertificateCreateRequest(certificateForm: any, createBy: string, lecturerId?: number,): CertificateCreateRequest {
    const certificateCreate: CertificateCreate = {
      diem: certificateForm.certificateScore,
      maLoai: certificateForm.certificateType
    }
    return {
      lecturerId: lecturerId,
      certificateCreate: certificateCreate,
      createBy: createBy
    }
  }
}
