import {Component, Input, OnChanges} from '@angular/core';
import {Lecturer, LecturerUpdate, LecturerUpdateRequest} from "../../../../../domain/lecturer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserHelper,} from "../../../../../helper/user-helper";
import {ActivatedRoute, Router} from "@angular/router";
import {LecturerService} from "../../../../../service/lecturer.service";

@Component({
    selector: 'app-lecturer-info',
    templateUrl: './lecturer-info.component.html',
    styleUrls: ['./lecturer-info.component.css']
})
export class LecturerInfoComponent implements OnChanges {
    @Input() lecturerInfo?: Lecturer;
    lecturerForUpdate?: Lecturer;
    userLogin: string;
    lecturerId?: number;

    lecturerUpdateForm: FormGroup = new FormGroup({
        lecturerId: new FormControl({value: '', disabled: true}, [
            Validators.required
        ]),
        images: new FormControl('', [
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
        mainPosition: new FormControl('', []),
        secondaryPosition: new FormControl('', []),
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

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private lecturerService: LecturerService, private userHelper: UserHelper) {
        this.userLogin = userHelper.getUserLogin()
    }

    get images() {
        return this.lecturerUpdateForm.get('images');
    }

    get firstName() {
        return this.lecturerUpdateForm.get('firstName');
    }

    get fullName() {
        return this.lecturerUpdateForm.get('fullName');
    }

    get mainPosition() {
        return this.lecturerUpdateForm.get('mainPosition');
    }

    get secondaryPosition() {
        return this.lecturerUpdateForm.get('secondaryPosition');
    }

    get placeOfBirth() {
        return this.lecturerUpdateForm.get('placeOfBirth');
    }

    get address() {
        return this.lecturerUpdateForm.get('address');
    }

    get addressTmp() {
        return this.lecturerUpdateForm.get('addressTmp');
    }

    get phone() {
        return this.lecturerUpdateForm.get('phone');
    }

    get email() {
        return this.lecturerUpdateForm.get('email');
    }

    get emailTdtu() {
        return this.lecturerUpdateForm.get('emailTdtu');
    }

    get workplace() {
        return this.lecturerUpdateForm.get('workplace');
    }

    ngOnChanges(): void {
        this.lecturerForUpdate = this.lecturerInfo
        this.initData()
    }

    initData() {
        this.lecturerId = this.lecturerForUpdate?.id
        this.lecturerUpdateForm.patchValue({
            lecturerId: this.lecturerForUpdate?.id,
            images: this.lecturerForUpdate?.images,
            firstName: this.lecturerForUpdate?.firstName,
            fullName: this.lecturerForUpdate?.fullName,
            classification: this.lecturerForUpdate?.classificationLecturers.maLoai,
            mainPosition: this.lecturerForUpdate?.mainPosition,
            secondaryPosition: this.lecturerForUpdate?.secondaryPosition,
            birthday: this.lecturerForUpdate?.birthday,
            gender: this.lecturerForUpdate?.gender,
            placeOfBirth: this.lecturerForUpdate?.placeOfBirth,
            address: this.lecturerForUpdate?.address,
            addressTmp: this.lecturerForUpdate?.addressTmp,
            phone: this.lecturerForUpdate?.phone,
            email: this.lecturerForUpdate?.email,
            emailTdtu: this.lecturerForUpdate?.emailTdtu,
            workplace: this.lecturerForUpdate?.workplace,
        })
    }

    onSubmit() {
        const request: LecturerUpdateRequest = this.genLecturerUpdateRequest(this.lecturerUpdateForm.value, this.userLogin)
        request.lecturerId = this.lecturerId
        this.lecturerService.updateLecturer(request).subscribe({
            next: () => {
                this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams: {tab: 'info'},
                    queryParamsHandling: 'merge',
                }).then(() => window.location.reload());
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

    onCancel() {
        this.lecturerForUpdate = this.lecturerInfo
        this.initData()
    }

    genLecturerUpdateRequest(lecturerUpdateForm: any, updateBy: string): LecturerUpdateRequest {
        const lecturerUpdate: LecturerUpdate = {
            images: lecturerUpdateForm.images,
            firstName: lecturerUpdateForm.firstName,
            fullName: lecturerUpdateForm.fullName,
            classification: lecturerUpdateForm.classification,
            mainPosition: lecturerUpdateForm.mainPosition,
            secondaryPosition: lecturerUpdateForm.secondaryPosition,
            birthday: lecturerUpdateForm.birthday,
            gender: lecturerUpdateForm.gender,
            placeOfBirth: lecturerUpdateForm.placeOfBirth,
            address: lecturerUpdateForm.address,
            addressTmp: lecturerUpdateForm.addressTmp,
            phone: lecturerUpdateForm.phone,
            email: lecturerUpdateForm.email,
            emailTdtu: lecturerUpdateForm.emailTdtu,
            workplace: lecturerUpdateForm.workplace,
        }
        return {
            lecturerUpdate: lecturerUpdate,
            updateBy: updateBy
        }
    }
}
