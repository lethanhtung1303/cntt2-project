import { Component, Input, OnChanges } from '@angular/core';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  SelectItemGroup,
} from 'primeng/api';
import {
  SemesterResponse,
  SemesterService,
} from '../../../../../service/semester.service';
import { LecturerTeachingHistory } from '../../../../../domain/lecturer';
import { saveAsExcelFile } from '../../../../../helper/excel-helper';
import { Table } from 'primeng/table';
import {
  LecturerTeachingHistoryService,
  TeachingHistoryResponse,
} from '../../../../../service/lecturer-teaching-history.service';
import { getCurrentSemester } from '../../../../../helper/semesters';
import { ActivatedRoute, Router } from '@angular/router';
import { UserHelper } from '../../../../../helper/user-helper';
import { PreviousRouteService } from '../../../../../helper/previous-route.service';

@Component({
  selector: 'app-lecturer-teaching-history',
  templateUrl: './lecturer-teaching-history.component.html',
  styleUrls: ['./lecturer-teaching-history.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class LecturerTeachingHistoryComponent implements OnChanges {
  @Input() lecturerId?: number;
  loading: boolean = false;
  selectedSemester: number | undefined;
  groupedSemesters: SelectItemGroup[] = [];

  teachingHistory: LecturerTeachingHistory[] = [];

  userLogin: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private semesterService: SemesterService,
    private lecturerTeachingHistoryService: LecturerTeachingHistoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userHelper: UserHelper,
    private previousRouteService: PreviousRouteService,
  ) {
    this.previousRouteService.setPreviousUrl(this.router.url);

    this.userLogin = userHelper.getUserLogin();

    this.semesterService.getAllSemester().subscribe({
      next: (data: SemesterResponse) => {
        this.groupedSemesters = data.results.semesters;
        this.selectedSemester = getCurrentSemester(
          this.groupedSemesters,
        )?.value;
        if (this.selectedSemester && this.lecturerId) {
          this.getLecturerTeachingHistory(
            this.selectedSemester,
            this.lecturerId,
          );
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnChanges(): void {
    if (this.selectedSemester && this.lecturerId) {
      this.getLecturerTeachingHistory(this.selectedSemester, this.lecturerId);
    }
  }

  onChangeSemester() {
    if (this.selectedSemester && this.lecturerId) {
      this.getLecturerTeachingHistory(this.selectedSemester, this.lecturerId);
    }
  }

  getLecturerTeachingHistory(semester: number, lecturerId: number) {
    this.lecturerTeachingHistoryService
      .getTeachingHistory({
        semester,
        lecturerId,
      })
      .subscribe({
        next: (data: TeachingHistoryResponse) => {
          this.teachingHistory = data.results.teachingHistory;
          this.loading = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  confirmDelete(historyId: number) {
    this.confirmationService.confirm({
      key: historyId.toString(),
      accept: () => {
        this.lecturerTeachingHistoryService
          .deleteHistory({
            historyId: historyId.toString(),
            deleteBy: this.userLogin,
          })
          .subscribe({
            next: () => {
              this.messageService.add({
                key: historyId.toString(),
                severity: 'error',
                summary: 'Đã xoá',
                detail: `Bạn đã xoá Lịch sử Giảng dạy: ${historyId}`,
              });
              this.router
                .navigate([`/lecturers/${this.lecturerId}`], {
                  relativeTo: this.activatedRoute,
                  queryParams: { tab: 'teaching-history' },
                  queryParamsHandling: 'merge',
                })
                .then(() => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                });
            },
            error: (error) => {
              console.log(error);
            },
          });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              key: historyId.toString(),
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              key: historyId.toString(),
              severity: 'info',
              summary: 'Đã huỷ',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  clear(table: Table) {
    table.clear();
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.teachingHistory);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      saveAsExcelFile(excelBuffer, 'employees');
    });
  }
}
