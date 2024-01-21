import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from '../../helper/previous-route.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TeachingDiaryResponse,
  TeachingDiaryService,
} from '../../service/teaching-history.service';
import {
  LecturerTeachingHistoryService,
  TeachingHistoryResponse,
} from '../../service/lecturer-teaching-history.service';
import {
  LecturerTeachingHistory,
  TeachingDiaryDetailResponse,
  TeachingDiaryUpdate,
  TeachingDiaryUpdateRequest,
} from '../../domain/lecturer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserHelper } from '../../helper/user-helper';

@Component({
  selector: 'app-teaching-diary',
  templateUrl: './teaching-diary.component.html',
  styleUrls: ['./teaching-diary.component.css'],
})
export class TeachingDiaryComponent implements OnInit {
  userLogin: string;
  lecturerId: string | null = null;
  historyId: string | null = null;
  teachingDiary: TeachingDiaryDetailResponse | null = null;
  teachingHistory: LecturerTeachingHistory | null = null;
  teachingDiaryUpdateForm: FormGroup = new FormGroup({
    absenceReport: new FormControl<number>(0, [Validators.required]),
    compensationReport: new FormControl<number>(0, [Validators.required]),
    incorrectGradingReport: new FormControl<number>(0, [Validators.required]),
    lateReport: new FormControl<number>(0, [Validators.required]),
    lateSubmissionScoresReport: new FormControl<number>(0, [
      Validators.required,
    ]),
    manyFailedReport: new FormControl<number>(0, [Validators.required]),
    manyPassingReports: new FormControl<number>(0, [Validators.required]),
    reminderReport: new FormControl<number>(0, [Validators.required]),
    reportBehavior: new FormControl<number>(0, [Validators.required]),
    returnEarlyReport: new FormControl<number>(0, [Validators.required]),
    reviewReport: new FormControl<number>(0, [Validators.required]),
  });

  constructor(
    private previousRouteService: PreviousRouteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teachingDiaryService: TeachingDiaryService,
    private lecturerTeachingHistoryService: LecturerTeachingHistoryService,
    private userHelper: UserHelper,
  ) {
    this.userLogin = userHelper.getUserLogin();
  }

  get absenceReport() {
    return this.teachingDiaryUpdateForm.get('absenceReport');
  }

  get compensationReport() {
    return this.teachingDiaryUpdateForm.get('compensationReport');
  }

  get incorrectGradingReport() {
    return this.teachingDiaryUpdateForm.get('incorrectGradingReport');
  }

  get lateReport() {
    return this.teachingDiaryUpdateForm.get('lateReport');
  }

  get lateSubmissionScoresReport() {
    return this.teachingDiaryUpdateForm.get('lateSubmissionScoresReport');
  }

  get manyFailedReport() {
    return this.teachingDiaryUpdateForm.get('manyFailedReport');
  }

  get manyPassingReports() {
    return this.teachingDiaryUpdateForm.get('manyPassingReports');
  }

  get reminderReport() {
    return this.teachingDiaryUpdateForm.get('reminderReport');
  }

  get reportBehavior() {
    return this.teachingDiaryUpdateForm.get('reportBehavior');
  }

  get returnEarlyReport() {
    return this.teachingDiaryUpdateForm.get('returnEarlyReport');
  }

  get reviewReport() {
    return this.teachingDiaryUpdateForm.get('reviewReport');
  }

  ngOnInit() {
    const previousUrl = this.previousRouteService.getPreviousUrl();
    const lecturerIdMatch = previousUrl.match(/\/lecturers\/(\d+)/);
    this.lecturerId = lecturerIdMatch ? lecturerIdMatch[1] : null;

    this.historyId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.historyId != null) {
      this.getTeachingHistoryDetail(this.historyId);
      this.getTeachingDiary(this.historyId);
    }
  }

  getTeachingDiary(historyId: string) {
    this.teachingDiaryService.getTeachingDiary(historyId).subscribe({
      next: (data: TeachingDiaryResponse) => {
        this.teachingDiary = data.results.teachingDiary[0];
        this.initData();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    const request: TeachingDiaryUpdateRequest =
      this.genTeachingDiaryUpdateRequest(
        this.teachingDiaryUpdateForm.value,
        this.userLogin,
      );
    this.teachingDiaryService.updateTeachingDiary(request).subscribe({
      next: () => {
        this.router
          .navigate([`/teaching-diary/${this.historyId}`])
          .then(() => window.location.reload());
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onCancel() {
    this.initData();
  }

  initData() {
    this.teachingDiaryUpdateForm.patchValue({
      absenceReport: this.teachingDiary?.absenceReport,
      compensationReport: this.teachingDiary?.compensationReport,
      incorrectGradingReport: this.teachingDiary?.incorrectGradingReport,
      lateReport: this.teachingDiary?.lateReport,
      lateSubmissionScoresReport:
        this.teachingDiary?.lateSubmissionScoresReport,
      manyFailedReport: this.teachingDiary?.manyFailedReport,
      manyPassingReports: this.teachingDiary?.manyPassingReports,
      reminderReport: this.teachingDiary?.reminderReport,
      reportBehavior: this.teachingDiary?.reportBehavior,
      returnEarlyReport: this.teachingDiary?.returnEarlyReport,
      reviewReport: this.teachingDiary?.reviewReport,
    });
  }

  getTeachingHistoryDetail(historyId: string) {
    this.lecturerTeachingHistoryService
      .getTeachingHistoryDetail(historyId)
      .subscribe({
        next: (data: TeachingHistoryResponse) => {
          this.teachingHistory = data.results.teachingHistory[0];
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  genTeachingDiaryUpdateRequest(
    teachingDiaryUpdateForm: any,
    updateBy: string,
  ): TeachingDiaryUpdateRequest {
    const teachingDiaryUpdate: TeachingDiaryUpdate = {
      absenceReport: teachingDiaryUpdateForm.absenceReport,
      compensationReport: teachingDiaryUpdateForm.compensationReport,
      incorrectGradingReport: teachingDiaryUpdateForm.incorrectGradingReport,
      lateReport: teachingDiaryUpdateForm.lateReport,
      lateSubmissionScoresReport:
        teachingDiaryUpdateForm.lateSubmissionScoresReport,
      manyFailedReport: teachingDiaryUpdateForm.manyFailedReport,
      manyPassingReports: teachingDiaryUpdateForm.manyPassingReports,
      reminderReport: teachingDiaryUpdateForm.reminderReport,
      reportBehavior: teachingDiaryUpdateForm.reportBehavior,
      returnEarlyReport: teachingDiaryUpdateForm.returnEarlyReport,
      reviewReport: teachingDiaryUpdateForm.reviewReport,
    };
    return {
      historyId: this.historyId ?? '',
      teachingDiaryUpdate: teachingDiaryUpdate,
      updateBy: updateBy,
    };
  }
}
