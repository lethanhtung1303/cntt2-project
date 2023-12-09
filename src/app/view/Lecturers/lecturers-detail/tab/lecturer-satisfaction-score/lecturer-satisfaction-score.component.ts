import {Component, Input, OnInit} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService, SelectItemGroup} from "primeng/api";
import {SemesterResponse, SemesterService} from "../../../../../service/semester.service";
import {SubjectResponse, SubjectService} from "../../../../../service/subject.service";
import {SatisfactionScore} from "../../../../../domain/lecturer";
import {SelectItem} from "primeng/api/selectitem";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserHelper} from "../../../../../helper/user-helper";
import {SatisfactionScoreService} from "../../../../../service/satisfaction-score.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SatisfactionScoreCreate, SatisfactionScoreCreateRequest} from "../../../../../domain/satisfaction-score";
import {Subject} from "../../../../../domain/subject";

@Component({
  selector: 'app-lecturer-satisfaction-score',
  templateUrl: './lecturer-satisfaction-score.component.html',
  styleUrls: ['./lecturer-satisfaction-score.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class LecturerSatisfactionScoreComponent implements OnInit {
  @Input() lecturerId?: number;
  @Input() satisfactionScore?: SatisfactionScore[];

  data: any;
  options: any;

  satisfactionScoreForSemester: SatisfactionScore[] = [];
  subjects!: Subject[];

  groupedSemester: SelectItemGroup[] = [];
  selectedGroupedSemesters: number;
  selectedSemester: SelectItem[] = [];
  visible: boolean = false;

  userLogin: string;

  satisfactionScoreForm: FormGroup = new FormGroup({
    selectedSubject: new FormControl('', [
      Validators.required
    ]),
    selectedSemester: new FormControl<number | null>(null, [
      Validators.required
    ]),
    satisfactionScore: new FormControl<number | null>(null, [
      Validators.required
    ]),
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService, private semesterService: SemesterService, private subjectService: SubjectService, private userHelper: UserHelper, private satisfactionScoreService: SatisfactionScoreService) {
    this.userLogin = userHelper.getUserLogin()
    this.selectedGroupedSemesters = new Date().getFullYear();
    this.semesterService.getAllSemester().subscribe({
      next: (data: SemesterResponse) => {
        this.groupedSemester = data.results.semesters;
        this.initSatisfactionScore()
        this.initData()
      },
      error: (error) => {
        console.log(error)
      }
    });

    this.subjectService.getAllSubject().subscribe({
      next: (data: SubjectResponse) => {
        this.subjects = data.results.subjects;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  ngOnInit() {
    this.initSatisfactionScore()
    this.initData()
    this.initOptions()
  }

  onChangeSemester() {
    this.initSatisfactionScore()
    this.initData()
    this.initOptions()
  }

  getSchoolYearFormSemester(selectedGroupedSemester: number, groupedSemesters: SelectItemGroup[]): SelectItemGroup | null {
    const year: number = parseInt(selectedGroupedSemester.toString().slice(0, 4));
    return groupedSemesters.find(item => item.value === year) ?? null;
  }

  initData() {
    const selectedSchoolYear: SelectItemGroup | null = this.getSchoolYearFormSemester(this.selectedGroupedSemesters, this.groupedSemester)
    if (!selectedSchoolYear) {
      return;
    }
    this.selectedSemester = selectedSchoolYear.items
    this.data = {
      labels: [selectedSchoolYear.label],
      datasets: [
        {
          label: selectedSchoolYear.items[2].label,
          backgroundColor: ['rgba(255, 159, 64, 0.2)'],
          borderColor: ['rgb(255, 159, 64)'],
          borderWidth: 1,
          data: [0]
        },
        {
          label: selectedSchoolYear.items[1].label,
          backgroundColor: ['rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgb(75, 192, 192)'],
          borderWidth: 1,
          data: [0]
        },
        {
          label: selectedSchoolYear.items[0].label,
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: ['rgb(54, 162, 235)'],
          borderWidth: 1,
          data: [0]
        },
        {
          label: selectedSchoolYear.label,
          backgroundColor: ['rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(153, 102, 255)'],
          borderWidth: 1,
          data: [0]
        }
      ]
    };
    this.setupValue()
  }

  setupValue() {
    const hocKyStats = new Map<string, {
      total: number;
      count: number
    }>();

    this.satisfactionScoreForSemester.forEach((item) => {
      const hocKy = String(item.hocKy).slice(-2);
      const diemHaiLong = item.diemHaiLong;

      if (!hocKyStats.has(hocKy)) {
        hocKyStats.set(hocKy, {total: 0, count: 0});
      }

      hocKyStats.get(hocKy)!.total += diemHaiLong;
      hocKyStats.get(hocKy)!.count += 1;
    });

    hocKyStats.forEach((stats, hocKy) => {
      const average = stats.total / stats.count;
      const index = parseInt(hocKy) - 1;
      this.data.datasets[index].data[0] = average;
    });

    const totalDiemHaiLong = this.satisfactionScoreForSemester.reduce((total, item) => total + item.diemHaiLong, 0);
    this.data.datasets[3].data[0] = totalDiemHaiLong / this.satisfactionScoreForSemester.length;
  }

  initOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.75,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          min: 0,
          max: 10,
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            },
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      },
    };
  }

  initSatisfactionScore() {
    this.satisfactionScoreForSemester = this.satisfactionScore?.filter(score => {
      return score.hocKy.toString().includes(this.selectedGroupedSemesters.toString());
    }).sort((a, b) => b.hocKy - a.hocKy) ?? [];
  }

  genSemesterLabel(semester: number): string {
    return this.groupedSemester.flatMap(group => group.items)
      .find(item => item.value === semester)?.label ?? '';
  }

  showDialog() {
    this.visible = true;
  }

  onCancel() {
    this.visible = false;
    this.satisfactionScoreForm.reset()
  }

  onSubmit() {
    const request: SatisfactionScoreCreateRequest = this.genSatisfactionScoreCreateRequest(this.satisfactionScoreForm.value, this.userLogin, this.lecturerId)
    this.satisfactionScoreService.createSatisfactionScore(request).subscribe({
      next: () => {
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {tab: 'satisfaction-score'},
          queryParamsHandling: 'merge',
        }).then(() => window.location.reload());
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  confirmDelete(satisfactionScoreId: number) {
    this.confirmationService.confirm({
      key: satisfactionScoreId.toString(),
      accept: () => {
        this.satisfactionScoreService.deleteSatisfactionScore({
          satisfactionScoreId: satisfactionScoreId.toString(),
          deleteBy: this.userLogin
        }).subscribe({
          next: () => {
            this.messageService.add({
              key: satisfactionScoreId.toString(),
              severity: 'error',
              summary: 'Đã xoá',
              detail: `Bạn đã xoá Điểm hài lòng: ${satisfactionScoreId}`
            });
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: {tab: 'satisfaction-score'},
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
              key: satisfactionScoreId.toString(),
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              key: satisfactionScoreId.toString(),
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled'
            });
            break;
        }
      }
    });
  }

  genSatisfactionScoreCreateRequest(satisfactionScoreForm: any, createBy: string, lecturerId?: number,): SatisfactionScoreCreateRequest {
    const satisfactionScoreCreate: SatisfactionScoreCreate = {
      diemHaiLong: satisfactionScoreForm.satisfactionScore,
      hocKy: satisfactionScoreForm.selectedSemester,
      maMon: satisfactionScoreForm.selectedSubject
    }
    return {
      lecturerId: lecturerId,
      satisfactionScoreCreate: satisfactionScoreCreate,
      createBy: createBy
    }
  }
}
