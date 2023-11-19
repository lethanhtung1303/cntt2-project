import {Component, Input, OnChanges} from '@angular/core';
import {Lecturer} from "../../../../../domain/lecturer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-lecturer-info',
  templateUrl: './lecturer-info.component.html',
  styleUrls: ['./lecturer-info.component.css']
})
export class LecturerInfoComponent implements OnChanges {
  @Input() lecturerInfo?: Lecturer;

  lecturerUpdateForm: FormGroup = new FormGroup({
    lecturerId: new FormControl({value: '', disabled: true}, [
      Validators.required
    ]),
    firstName: new FormControl('', [
      Validators.required
    ]),
    fullName: new FormControl('', [
      Validators.required
    ]),
    classification: new FormControl('', [
      Validators.required
    ]),
    mainPosition: new FormControl('', [
      Validators.required
    ]),
    secondaryPosition: new FormControl('', [
      Validators.required
    ]),
    birthday: new FormControl('', [
      Validators.required
    ]),
    gender: new FormControl('', [
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
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    emailTdtu: new FormControl('', [
      Validators.required
    ]),
    workplace: new FormControl('', [
      Validators.required
    ]),
  });

  constructor() {
  }

  ngOnChanges(): void {
    console.log(this.lecturerInfo)
    this.lecturerUpdateForm.setValue({
      lecturerId: this.lecturerInfo?.id,
      firstName: this.lecturerInfo?.firstName,
      fullName: this.lecturerInfo?.fullName,
      classification: this.lecturerInfo?.classificationLecturers.maLoai,
      mainPosition: this.lecturerInfo?.mainPosition,
      secondaryPosition: this.lecturerInfo?.secondaryPosition,
      birthday: this.lecturerInfo?.birthday,
      gender: this.lecturerInfo?.gender,
      placeOfBirth: this.lecturerInfo?.placeOfBirth,
      address: this.lecturerInfo?.address,
      addressTmp: this.lecturerInfo?.addressTmp,
      phone: this.lecturerInfo?.phone,
      email: this.lecturerInfo?.email,
      emailTdtu: this.lecturerInfo?.emailTdtu,
      workplace: this.lecturerInfo?.workplace,
    })
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.table(this.lecturerUpdateForm.value);
  }
}
