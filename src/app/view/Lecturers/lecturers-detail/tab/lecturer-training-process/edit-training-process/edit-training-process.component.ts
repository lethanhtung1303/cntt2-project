import {Component, Input, OnChanges} from '@angular/core';
import {GraduationType, Language, Level, TrainingProcess} from "../../../../../../domain/lecturer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Const} from "../../../../../../constant/Const";
import {UserHelper} from "../../../../../../helper/user-helper";
import {TrainingProcessCreate, TrainingProcessUpdateRequest} from "../../../../../../domain/training-process";
import {TrainingProcessService} from "../../../../../../service/training-process.service";

@Component({
    selector: 'app-edit-training-process',
    templateUrl: './edit-training-process.component.html',
    styleUrls: ['./edit-training-process.component.css']
})
export class EditTrainingProcessComponent implements OnChanges {
    @Input() lecturerId?: number;
    @Input() trainingProcess?: TrainingProcess;
    processForUpdate?: TrainingProcess;
    processId?: number;

    userLogin: string;

    levelList: Level[] = Const.level;
    languageList: Language[] = Const.language;
    selectedLanguages: string[] = []
    graduationList: GraduationType[] = Const.graduationType;

    processUpdateForm: FormGroup = new FormGroup({
        level: new FormControl<number | null>(null, [
            Validators.required
        ]),
        languageIds: new FormControl('', [
            Validators.required
        ]),
        truong: new FormControl('', [
            Validators.required
        ]),
        nganh: new FormControl('', [
            Validators.required
        ]),
        deTaiTotNghiep: new FormControl('', []),
        nguoiHuongDan: new FormControl('', []),
        loaiTotNghiep: new FormControl<number | null>(null, [
            Validators.required
        ]),
        namTotNghiep: new FormControl<number | null>(null, [
            Validators.required
        ]),
    });

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private userHelper: UserHelper, private trainingProcessService: TrainingProcessService) {
        this.userLogin = userHelper.getUserLogin()
    }

    get level() {
        return this.processUpdateForm.get('level');
    }

    get languageIds() {
        return this.processUpdateForm.get('languageIds');
    }

    get truong() {
        return this.processUpdateForm.get('truong');
    }

    get nganh() {
        return this.processUpdateForm.get('nganh');
    }

    get deTaiTotNghiep() {
        return this.processUpdateForm.get('deTaiTotNghiep');
    }

    get nguoiHuongDan() {
        return this.processUpdateForm.get('nguoiHuongDan');
    }

    get loaiTotNghiep() {
        return this.processUpdateForm.get('loaiTotNghiep');
    }

    get namTotNghiep() {
        return this.processUpdateForm.get('namTotNghiep');
    }

    ngOnChanges(): void {
        this.processForUpdate = this.trainingProcess
        this.initData()
    }

    initData() {
        this.processId = this.processForUpdate?.id
        this.selectedLanguages = this.processForUpdate?.language.map(language => language.id.toString()) ?? [];
        this.processUpdateForm.patchValue({
            level: this.processForUpdate?.level.id,
            languageIds: this.selectedLanguages.map(languageId => languageId).join(','),
            truong: this.processForUpdate?.truong,
            nganh: this.processForUpdate?.nganh,
            deTaiTotNghiep: this.processForUpdate?.deTaiTotNghiep,
            nguoiHuongDan: this.processForUpdate?.nguoiHuongDan,
            loaiTotNghiep: this.processForUpdate?.graduationType.id,
            namTotNghiep: this.processForUpdate?.namTotNghiep,
        })
    }

    onCancel() {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {tab: 'training-process'},
            queryParamsHandling: 'merge',
        }).then(() => window.location.reload());
    }

    onSubmit() {
        const request: TrainingProcessUpdateRequest = this.genTrainingProcessUpdateRequest(this.processUpdateForm.value, this.userLogin, this.trainingProcess?.id)
        this.trainingProcessService.updateProcess(request).subscribe({
            next: () => {
                this.router.navigate([], {
                    relativeTo: this.activatedRoute,
                    queryParams: {tab: 'training-process'},
                    queryParamsHandling: 'merge',
                }).then(() => window.location.reload());
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

    onSelectedLanguages(e: any) {
        if (e.target.checked) {
            this.selectedLanguages.push(e.target.value);
            this.processUpdateForm.patchValue({
                languageIds: this.selectedLanguages.map(id => id).join(',')
            })
        } else {
            this.selectedLanguages = this.selectedLanguages.filter(id => id !== e.target.value);
            this.processUpdateForm.patchValue({
                languageIds: this.selectedLanguages.map(id => id).join(',')
            })
        }
    }

    isSelectedLanguages(id: number) {
        return this.processForUpdate?.language.some(language => language.id === id);
    }

    genTrainingProcessUpdateRequest(processUpdateForm: any, updateBy: string, processId?: number,): TrainingProcessUpdateRequest {
        const processUpdate: TrainingProcessCreate = {
            deTaiTotNghiep: processUpdateForm.deTaiTotNghiep,
            languageIds: processUpdateForm.languageIds,
            level: processUpdateForm.level,
            loaiTotNghiep: processUpdateForm.loaiTotNghiep,
            namTotNghiep: processUpdateForm.namTotNghiep,
            nganh: processUpdateForm.nganh,
            nguoiHuongDan: processUpdateForm.nguoiHuongDan,
            truong: processUpdateForm.truong
        }
        return {
            processId: processId,
            trainingProcessUpdate: processUpdate,
            updateBy: updateBy
        }
    }
}
