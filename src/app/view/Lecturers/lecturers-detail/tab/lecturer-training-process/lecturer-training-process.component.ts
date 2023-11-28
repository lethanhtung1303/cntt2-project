import {Component, Input, OnChanges} from '@angular/core';
import {GraduationType, Language, Level, TrainingProcess} from "../../../../../domain/lecturer";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Const} from "../../../../../constant/Const";
import {UserHelper} from "../../../../../helper/user-helper";
import {TrainingProcessCreate, TrainingProcessCreateRequest} from "../../../../../domain/training-process";
import {TrainingProcessService} from "../../../../../service/training-process.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-lecturer-training-process',
    templateUrl: './lecturer-training-process.component.html',
    styleUrls: ['./lecturer-training-process.component.css'],
    providers: [MessageService]
})
export class LecturerTrainingProcessComponent implements OnChanges {
    @Input() lecturerId?: number;
    @Input() trainingProcess?: TrainingProcess[];
    isEdit: boolean = false;
    selectedProcess: TrainingProcess | null = null;
    visible: boolean = false;
    userLogin: string;

    levelList: Level[] = Const.level;
    languageList: Language[] = Const.language;
    selectedLanguages: string[] = []
    graduationList: GraduationType[] = Const.graduationType;

    processCreateForm: FormGroup = new FormGroup({
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

    ngOnChanges(): void {
        this.trainingProcess?.sort((a, b) => a.level.id - b.level.id)
    }

    genBgIcoin(displayOrder: number): string {
        switch (displayOrder) {
            case 1:
                return 'bg-danger-light';
            case 2:
                return 'bg-warning';
            case 3:
                return 'bg-primary';
            case 4:
                return 'bg-success';
            case 5:
                return 'bg-info';
            case 6:
                return 'bg-secondary-light';
            case 7:
                return 'bg-secondary-light';
            default:
                return 'bg-secondary-light';
        }
    }

    generateLanguage(languages: Language[]): string {
        return languages.sort((a, b) => a.id - b.id).map(language => language.tenNgonNgu).join(' - ');
    }

    goRemove() {
    }

    goEdit(process: TrainingProcess) {
        this.selectedProcess = process
        this.isEdit = true
    }

    onSubmit() {
        const request: TrainingProcessCreateRequest = this.genTrainingProcessCreateRequest(this.processCreateForm.value, this.userLogin, this.lecturerId)
        this.trainingProcessService.createProcess(request).subscribe({
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

    onCancel() {
        this.visible = false;
        this.processCreateForm.reset()
    }

    showDialog() {
        this.visible = true;
    }

    onSelectedLanguages(e: any) {
        if (e.target.checked) {
            this.selectedLanguages.push(e.target.value);
            this.processCreateForm.patchValue({
                languageIds: this.selectedLanguages.map(id => id).join(',')
            })
        } else {
            this.selectedLanguages = this.selectedLanguages.filter(id => id !== e.target.value);
            this.processCreateForm.patchValue({
                languageIds: this.selectedLanguages.map(id => id).join(',')
            })
        }
    }

    genTrainingProcessCreateRequest(processCreateForm: any, createBy: string, lecturerId?: number,): TrainingProcessCreateRequest {
        const processCreate: TrainingProcessCreate = {
            deTaiTotNghiep: processCreateForm.deTaiTotNghiep,
            languageIds: processCreateForm.languageIds,
            level: processCreateForm.level,
            loaiTotNghiep: processCreateForm.loaiTotNghiep,
            namTotNghiep: processCreateForm.namTotNghiep,
            nganh: processCreateForm.nganh,
            nguoiHuongDan: processCreateForm.nguoiHuongDan,
            truong: processCreateForm.truong
        }
        return {
            lecturerId: lecturerId,
            trainingProcessCreate: processCreate,
            createBy: createBy
        }
    }
}
