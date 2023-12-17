import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectResponse, SubjectService} from "../../../service/subject.service";
import {Subject, SubjectUpdate, SubjectUpdateRequest} from "../../../domain/subject";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserHelper} from "../../../helper/user-helper";

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent {
  userLogin: string;
  subjectId: string | null = null
  subject?: Subject;
  subjectForUpdate?: Subject;
  subjectUpdateForm: FormGroup = new FormGroup({
    subjectGroup: new FormControl({value: '', disabled: true}, [
      Validators.required
    ]),
    subjectTrainingSys: new FormControl({value: '', disabled: true}, [
      Validators.required
    ]),
    subjectType: new FormControl({value: '', disabled: true}, [
      Validators.required
    ]),
    subjectCode: new FormControl({value: '', disabled: true}, [
      Validators.required
    ]),
    subjectName: new FormControl('', [
      Validators.required
    ]),
    numberLessons: new FormControl<number | null>(null, [
      Validators.required
    ]),
  });

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private subjectService: SubjectService, private userHelper: UserHelper) {
    this.userLogin = userHelper.getUserLogin()
    this.subjectId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.subjectId != null) {
      this.subjectService.getSubjectById(this.subjectId).subscribe({
        next: (data: SubjectResponse) => {
          this.subject = data.results.subjects[0];
          this.subjectForUpdate = this.subject
          this.initData()
        },
        error: (error) => {
          console.log(error)
        }
      });
    } else {
      this.router.navigate([]).then(() => window.location.reload());
    }
  }

  initData() {
    this.subjectUpdateForm.patchValue({
      subjectGroup: this.subjectForUpdate?.subjectGroup.tenNhom,
      subjectTrainingSys: this.subjectForUpdate?.phanHe,
      subjectType: this.subjectForUpdate?.phanLoai,
      subjectCode: this.subjectForUpdate?.maMon,
      subjectName: this.subjectForUpdate?.tenMon.replace(/^\[.*?\]\s*/, ''),
      numberLessons: this.subjectForUpdate?.soTiet,
    })
  }

  onSubmit() {
    const request: SubjectUpdateRequest = this.genSubjectUpdateRequest(this.subjectUpdateForm.value, this.userLogin)
    request.subjectId = this.subjectId ?? ''
    this.subjectService.updateSubject(request).subscribe({
      next: () => {
        this.router.navigate([]).then(() => window.location.reload());
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  genSubjectUpdateRequest(subjectUpdateForm: any, updateBy: string): SubjectUpdateRequest {
    const subjectUpdate: SubjectUpdate = {
      soTiet: subjectUpdateForm.numberLessons,
      tenMon: subjectUpdateForm.subjectName,
    }
    return {
      subjectUpdate: subjectUpdate,
      updateBy: updateBy
    }
  }

  onCancel() {
    this.subjectForUpdate = this.subject
    this.initData()
  }
}
