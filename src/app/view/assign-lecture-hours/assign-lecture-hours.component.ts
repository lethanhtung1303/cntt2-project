import {Component} from '@angular/core';
import {SelectItemGroup} from "primeng/api";
import {SemesterResponse, SemesterService} from "../../service/semester.service";
import {SubjectResponse, SubjectService} from "../../service/subject.service";
import {UserHelper} from "../../helper/user-helper";
import {getCurrentSemester} from "../../helper/semesters";
import {Subject} from "../../domain/subject";
import {Table} from "primeng/table";
import {MasterStandards, NormsLectureHours, TrainingSys, UniversityStandard} from "../../domain/lecturer";
import {NormsLectureHoursResponse, NormsLectureHoursService} from "../../service/norms-lecture-hours.service";
import {Const} from "../../constant/Const";
import {
  LecturerStandardService,
  MasterStandardsResponse,
  UniversityStandardsResponse
} from "../../service/lecturer-standards.service";
import {SelectItem} from "primeng/api/selectitem";
import {Assignment, AssignmentRequest} from "../../domain/teaching-assignment";
import {AssignmentService} from "../../service/assignment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorResponse, GlobalErrorService} from "../../service/global-error.service";

export interface LecturerAssign {
  id?: number;
  fullName?: string;
  classification?: string;
  status?: number;
}

@Component({
  selector: 'app-assign-lecture-hours',
  templateUrl: './assign-lecture-hours.component.html',
  styleUrls: ['./assign-lecture-hours.component.css']
})
export class AssignLectureHoursComponent {
  userLogin: string;
  selectedSemester: number | undefined;
  groupedSemesters: SelectItemGroup[] = [];

  loadingSubject: boolean = true;
  loadingLecturer: boolean = true;

  normsLecturers: NormsLectureHours[] = [];
  universityLecturers: UniversityStandard[] = [];
  masterLecturers: MasterStandards[] = [];

  trainingSys: TrainingSys[] = Const.trainingSys;
  subjects: Subject[] = [];
  lecturers: LecturerAssign[] = [];

  semesterForAssign: number | undefined
  trainingSysForAssign: number | undefined
  subjectForAssign: string | undefined
  lecturerForAssign: number | undefined
  err: ErrorResponse = {errMessage: null, errorCode: null}

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private semesterService: SemesterService,
              private subjectService: SubjectService,
              private userHelper: UserHelper,
              private normsLectureHoursService: NormsLectureHoursService,
              private lecturerStandardService: LecturerStandardService,
              private assignmentService: AssignmentService,
              protected globalErrorService: GlobalErrorService) {
    this.globalErrorService.clearError()
    this.userLogin = userHelper.getUserLogin()
    this.semesterService.getAllSemester().subscribe({
      next: (data: SemesterResponse) => {
        this.groupedSemesters = data.results.semesters;
        this.selectedSemester = getCurrentSemester(this.groupedSemesters)?.value
        if (this.selectedSemester) {
          this.getLecturer(this.selectedSemester)
          this.semesterForAssign = this.selectedSemester
        }
      },
      error: (error) => {
        console.log(error)
      }
    });

    this.subjectService.getAllSubject().subscribe({
      next: (data: SubjectResponse) => {
        this.subjects = data.results.subjects;
        this.loadingSubject = false;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  onChangeSemester() {
    if (this.selectedSemester) {
      this.semesterForAssign = this.selectedSemester
      this.onClear()
      this.getLecturer(this.selectedSemester)
    }
  }

  clear(table: Table) {
    table.clear();
  }

  getLecturer(semester: number) {
    this.lecturerStandardService.getMasterStandards().subscribe({
      next: (data: MasterStandardsResponse) => {
        this.masterLecturers = []
        this.masterLecturers = data.results.masterStandards;
      },
      error: (error) => {
        console.log(error)
      }
    });
    this.lecturerStandardService.getUniversityStandards(semester).subscribe({
      next: (data: UniversityStandardsResponse) => {
        this.universityLecturers = []
        this.universityLecturers = data.results.universityStandards;
      },
      error: (error) => {
        console.log(error)
      }
    });
    this.normsLectureHoursService.getNormsLectureHours(semester).subscribe({
      next: (data: NormsLectureHoursResponse) => {
        this.normsLecturers = []
        this.normsLecturers = data.results.normsLectureHours;
        this.loadingLecturer = false;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }

  getSeverity(status: number): string {
    switch (status) {
      case 1:
        return 'danger';
      case 2:
        return 'success';
      case 0:
        return 'warning';
      default:
        return 'secondary';
    }
  }

  getStatus(status: number): string {
    switch (status) {
      case 1:
        return 'Vượt mức';
      case 2:
        return 'Bình thường';
      case 0:
        return 'Cảnh báo';
      default:
        return 'Chưa giảng dạy';
    }
  }

  getLecturersByTrainingSys() {
    this.globalErrorService.clearError()
    this.lecturers = []
    this.lecturerForAssign = undefined
    if (this.trainingSysForAssign == 5) {
      this.lecturers = this.masterLecturers.map((masterLecturer) => ({
        id: masterLecturer.id,
        fullName: masterLecturer.fullName
      }));
    }

    if (this.trainingSysForAssign == 4) {
      this.lecturers = this.universityLecturers
        .filter((lecturer) => lecturer.isEnglishInternational)
        .map(({id, fullName}) => ({id, fullName}));
    }

    if (this.trainingSysForAssign == 3) {
      this.lecturers = this.universityLecturers
        .filter((lecturer) => lecturer.isTeachingEnglish)
        .map(({id, fullName}) => ({id, fullName}));
    }

    if (this.trainingSysForAssign == 2) {
      this.lecturers = this.universityLecturers
        .filter((lecturer) => lecturer.isTeachingVietnamese)
        .map(({id, fullName}) => ({id, fullName}));
    }

    if (this.trainingSysForAssign == 1) {
      this.lecturers = this.universityLecturers
        .filter((lecturer) => lecturer.isTeachingPractice || lecturer.isTeachingTheory)
        .map(({id, fullName}) => ({id, fullName}));
    }


    this.lecturers = this.lecturers.filter((lecturer) => {
      const matchingNormsLecturer = this.normsLecturers.find(
        (normsLecturer) => normsLecturer.id === lecturer.id
      );

      if (matchingNormsLecturer?.classificationLecturers === 'Giảng viên thỉnh giảng') {
        return !matchingNormsLecturer || matchingNormsLecturer.status !== 1;
      } else {
        return true;
      }
    })
      .map((lecturer) => {
        const matchingNormsLecturer = this.normsLecturers.find(
          (normsLecturer) => normsLecturer.id === lecturer.id
        );

        return {
          ...lecturer,
          classification: matchingNormsLecturer?.classificationLecturers,
          status: matchingNormsLecturer?.status
        };
      });
  }

  onTrainingSysChange() {
    this.getLecturersByTrainingSys()
    if (this.lecturers.length == 1) {
      this.lecturerForAssign = this.lecturers[0].id
    }
  }

  onSubjectChange() {
    this.getLecturersByTrainingSys()
    if (this.trainingSysForAssign == 1) {
      const subjectForAssign = this.getSubject(this.subjectForAssign)
      if (subjectForAssign?.phanLoai === 'Lý thuyết') {
        this.lecturers = this.lecturers.filter((lecturer) => {
          const matchingNormsLecturer = this.universityLecturers.find(
            (normsLecturer) => normsLecturer.id === lecturer.id
          );
          return !matchingNormsLecturer || matchingNormsLecturer.isTeachingTheory;
        });
      }

      if (subjectForAssign?.phanLoai === 'Thực hành') {
        this.lecturers = this.lecturers.filter((lecturer) => {
          const matchingNormsLecturer = this.universityLecturers.find(
            (normsLecturer) => normsLecturer.id === lecturer.id
          );
          return !matchingNormsLecturer || matchingNormsLecturer.isTeachingPractice;
        });

      }
    }
    if (this.lecturers.length == 1) {
      this.lecturerForAssign = this.lecturers[0].id
    }
  }

  onLecturerChange() {
    this.globalErrorService.clearError()
  }

  checkLecturerAssign() {
    const lecturer = this.getLecturers(this.lecturerForAssign)
    return lecturer && lecturer.classification === 'Giảng viên cơ hữu' && lecturer.status === 1
  }

  checkValidSemester(): boolean {
    if (this.semesterForAssign === undefined || isNaN(this.semesterForAssign)) {
      return false;
    }

    const currentYear = new Date().getFullYear();
    const semesterYear = Math.floor(this.semesterForAssign / 100);

    return semesterYear > currentYear + 1 || semesterYear < currentYear - 1;
  }

  getSemester(semester: number | undefined) {
    const matchingSemesterItem = this.groupedSemesters.find(
      (group: SelectItemGroup) =>
        group.items.find((item: SelectItem) => item.value === semester)
    );
    if (matchingSemesterItem) {
      return matchingSemesterItem.items.find((item: SelectItem) => item.value === semester);
    } else {
      return undefined;
    }
  }

  getTrainingSys(trainingCode: number | undefined) {
    return this.trainingSys.find(sys => sys.trainingSysCode == trainingCode);
  }

  getSubject(subjectCode: string | undefined) {
    return this.subjects.find(sub => sub.maMon == subjectCode);
  }

  getLecturers(lecturerId: number | undefined) {
    return this.lecturers.find(lecturer => lecturer.id == lecturerId);
  }

  checkValidSubmit() {
    return !((this.lecturerForAssign != undefined)
      && (this.semesterForAssign != undefined)
      && (this.subjectForAssign != undefined)
      && (this.trainingSysForAssign != undefined)
    )
  }

  onSubmit() {
    this.globalErrorService.clearError()
    const request: AssignmentRequest = this.genAssignmentRequest()
    this.assignmentService.createAssignment(request).subscribe({
      next: () => {
        this.router.navigate([`/lecturers/${this.lecturerForAssign}`], {
          relativeTo: this.activatedRoute,
          queryParams: {tab: 'teaching-history'},
          queryParamsHandling: 'merge',
        }).then();
      },
      error: (error) => {
        if (error.status === 400) {
          this.err = {
            errMessage: error.error.results[0].message,
            errorCode: error.error.results[0].errorCd
          }
          this.globalErrorService.setGlobalError(this.err)
        } else {
          this.err = {
            errMessage: "Something went wrong here!",
            errorCode: error.error.results[0].errorCd
          }
          this.globalErrorService.setGlobalError(this.err)
        }
      }
    });
  }

  onClear() {
    this.lecturerForAssign = undefined
    this.semesterForAssign = this.selectedSemester
    this.subjectForAssign = undefined
    this.trainingSysForAssign = undefined
    this.globalErrorService.clearError()
  }

  private genAssignmentRequest(): AssignmentRequest {
    const assignment: Assignment = {
      giangVienId: this.lecturerForAssign,
      hocKy: this.semesterForAssign,
      maMon: this.subjectForAssign,
      maHe: this.trainingSysForAssign
    }
    return {
      assignment: assignment,
      createBy: this.userLogin
    }
  }
}
