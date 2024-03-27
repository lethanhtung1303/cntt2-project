import { Certificate } from './certificate';
import { Subject } from './subject';

export interface ClassificationLecturer {
  maLoai: number;
  phanLoai: string;
}

export interface Language {
  id: number;
  tenNgonNgu: string;
}

export interface Level {
  id: number;
  trinhDo: string;
  kyHieu: string;
  displayOrder: number;
}

export interface GraduationType {
  id: number;
  loaiTotNghiep: string;
}

export interface TrainingProcess {
  id: number;
  level: Level;
  language: Language[];
  truong: string;
  nganh: string;
  namTotNghiep: number;
  deTaiTotNghiep: string | null;
  nguoiHuongDan: string | null;
  graduationType: GraduationType;
}

export interface SatisfactionScore {
  id: number;
  subject: Subject;
  hocKy: number;
  diemHaiLong: number;
}

export interface Lecturer {
  id: number;
  firstName: string;
  fullName: string;
  gender: boolean;
  images: string | null;
  birthday: string | null;
  placeOfBirth: string | null;
  address: string | null;
  addressTmp: string | null;
  phone: string | null;
  email: string | null;
  emailTdtu: string | null;
  workplace: string | null;
  mainPosition: string | null;
  secondaryPosition: string | null;
  classificationLecturers: ClassificationLecturer;
  certificate: Certificate[];
  trainingProcess: TrainingProcess[];
  satisfactionScore: SatisfactionScore[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updateBy: string | null;
  deletedFlag: boolean;
  deletedAt: string | null;
  deletedBy: string | null;
}

export interface LecturerUpdateRequest {
  lecturerId?: number;
  lecturerUpdate?: LecturerUpdate;
  updateBy?: string;
}

export interface LecturerCreateRequest {
  createBy?: string;
  lecturerCreate?: LecturerCreate;
}

export interface LecturerCreate {
  images: string;
  firstName: string;
  fullName: string;
  classification: string;
  mainPosition: string;
  secondaryPosition: string | null;
  birthday: string;
  gender: string;
  placeOfBirth: string;
  address: string;
  addressTmp: string;
  phone: string;
  email: string;
  emailTdtu: string;
  workplace: string;
}

export interface LecturerUpdate {
  images: string;
  firstName: string;
  fullName: string;
  classification: string;
  mainPosition: string | null;
  secondaryPosition: string | null;
  birthday: string;
  gender: string;
  placeOfBirth: string;
  address: string;
  addressTmp: string;
  phone: string;
  email: string;
  emailTdtu: string;
  workplace: string;
}

export interface LecturerDeleteRequest {
  lecturerIds: string;
  deleteBy: string;
}

export interface UniversityStandard {
  id?: number;
  fullName?: string;
  images?: string;
  emailTdtu?: string;
  isTeachingTheory?: boolean;
  isTeachingPractice?: boolean;
  isTeachingVietnamese?: boolean;
  isTeachingEnglish?: boolean;
  isEnglishInternational?: boolean;
<<<<<<< develop
  standardDetail: StandardDetail[];
}

export interface StandardDetail {
  highestLevel: HighestLevel;
  trainingProcessStandard?: TrainingProcessStandard;
  totalNumberLessons?: number;
  certificate?: CertificateStandard;
  averageSatisfaction?: number;
}

export interface TrainingProcessStandard {
  school?: string;
  majors?: string;
  graduationYear?: number;
  graduationType?: string;
  level?: string;
  language?: string;
}

export interface CertificateStandard {
  certificateName?: string;
  certificateScore?: string;
}

export interface HighestLevel {
  level?: string;
  graduationYear?: number;
  graduationType?: string;
=======
>>>>>>> master
}

export interface MasterStandards {
  id?: number;
  fullName?: string;
  images?: string;
  emailTdtu?: string;
}

export interface NumberLessons {
  numberTheory: number;
  numberPractice: number;
}

export interface NumberLessonsDetail {
  originalLesson: NumberLessons;
  conversionLessons: NumberLessons;
}

export interface NormsLectureHours {
  id?: number;
  fullName?: string;
  images?: string;
  emailTdtu?: string;
  classificationLecturersCode?: number;
  classificationLecturers?: string;
  lecturerLevelCode?: number;
  lecturerLevel?: string;
  displayOrder?: number;
  lessonsStandardSys: NumberLessonsDetail;
  lessonsCLCVietnamese: NumberLessonsDetail;
  lessonsCLCEnglish: NumberLessonsDetail;
  lessonsEnglishInternational: NumberLessonsDetail;
  lessonsMaster: NumberLessonsDetail;
  conversionLesson: NumberLessons;
  totalNumberLessons: number;
  status: number;
}

export interface LecturerTeachingHistory {
  historyId?: number;
  subjectCode?: string;
  subjectTitle?: string;
  numberLessons?: number;
  subjectGroupCode?: string;
  subjectGroupName?: string;
  subjectTypeCode?: number;
  nameTypeSubject?: string;
  trainingSysCode?: number;
  nameTrainingSys?: string;
  identification?: number;
  createDatetime?: string;
}

export interface TeachingDiaryDetailResponse {
  historyId: number;
  absenceReport: number;
  compensationReport: number;
  reminderReport: number;
  lateReport: number;
  returnEarlyReport: number;
  reportBehavior: number;
  incorrectGradingReport: number;
  lateSubmissionScoresReport: number;
  reviewReport: number;
  manyPassingReports: string;
  manyFailedReport: string;
}

export interface TeachingDiaryUpdate {
  absenceReport: number;
  compensationReport: number;
  reminderReport: number;
  lateReport: number;
  returnEarlyReport: number;
  reportBehavior: number;
  incorrectGradingReport: number;
  lateSubmissionScoresReport: number;
  reviewReport: number;
  manyPassingReports: number;
  manyFailedReport: number;
}

export interface TeachingDiaryUpdateRequest {
  historyId: string;
  teachingDiaryUpdate: TeachingDiaryUpdate;
  updateBy?: string;
}

export interface ExtraLectureHours {
  id?: number;
  fullName?: string;
  images?: string;
  emailTdtu?: string;
  classificationLecturersCode?: number;
  classificationLecturers?: string;
  lecturerLevelCode?: number;
  lecturerLevel?: string;
  displayOrder?: number;
  standardLectureHours: number;
  totalLectureHours: number;
  extraHoursStandardSys: number;
  extraHoursCLCVietnamese: ExtraHours;
  extraHoursCLCEnglish: ExtraHours;
  extraHoursEnglishInternational: ExtraHours;
  extraHoursMaster: number;
  totalPayment: number;
}

export interface ExtraHours {
  basicSubjects: number;
  majoringSubjects: number;
}

export interface TrainingSys {
  trainingSysCode?: number;
  nameTrainingSys?: string;
}
