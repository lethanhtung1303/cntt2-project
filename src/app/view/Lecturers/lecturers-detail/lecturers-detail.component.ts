import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {LecturerResponse, LecturerService} from "../../../service/lecturer.service";
import {Lecturer, TrainingProcess} from "../../../domain/lecturer";

@Component({
  selector: 'app-lecturers-detail',
  templateUrl: './lecturers-detail.component.html',
  styleUrls: ['./lecturers-detail.component.css']
})
export class LecturersDetailComponent {
  currentTab: string = ''
  lecturerId: string | null = null
  lecturer?: Lecturer;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private lecturerService: LecturerService) {
    this.activatedRoute.queryParamMap.subscribe({
      next: (params: ParamMap) => {
        const tabValue: string | null = params.get('tab');
        if (tabValue) {
          const validTabs: string[] = ['info', 'training-process', 'certificate', 'satisfaction-score', 'teaching-history'];
          this.currentTab = validTabs.includes(tabValue) ? tabValue : 'info';

          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {tab: this.currentTab},
            queryParamsHandling: 'merge',
          }).then();
        } else {
          this.router.navigate(['/lecturers']).then(() => window.location.reload());
        }
      },
      error: (error) => {
        console.log(error)
      }
    });

    this.lecturerId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.lecturerId != null) {
      this.lecturerService.getLecturerById(this.lecturerId).subscribe({
        next: (data: LecturerResponse) => {
          this.lecturer = data.results.lecturers[0];
        },
        error: (error) => {
          console.log(error)
        }
      });
    }
  }

  goInfo() {
    this.router.navigate([], {
      queryParams: {tab: "info"},
    }).then(() => {
      this.currentTab = 'info'
    });
  }

  goTrainingProcess() {
    this.router.navigate([], {
      queryParams: {tab: "training-process"},
    }).then(() => {
      this.currentTab = 'training-process'
    });
  }

  goCertificate() {
    this.router.navigate([], {
      queryParams: {tab: "certificate"},
    }).then(() => {
      this.currentTab = 'certificate'
    });
  }

  goSatisfactionScore() {
    this.router.navigate([], {
      queryParams: {tab: "satisfaction-score"},
    }).then(() => {
      this.currentTab = 'satisfaction-score'
    });
  }

  goTeachingHistory() {
    this.router.navigate([], {
      queryParams: {tab: "teaching-history"},
    }).then(() => {
      this.currentTab = 'teaching-history'
    });
  }

  generateLevel(trainingProcess?: TrainingProcess[]): string {
    if (trainingProcess) {
      const uniqueTrainingProcess = Array.from(new Map(trainingProcess.map(tp => [tp.level.id, tp])).values());
      const sortedTrainingProcess = uniqueTrainingProcess.sort((a, b) => a.level.displayOrder - b.level.displayOrder);
      const top2TrainingProcess = sortedTrainingProcess.slice(0, 2);
      return top2TrainingProcess.map((tp) => tp.level.kyHieu).join('.');
    }
    return ''
  }
}
