import {Certificate} from "./certificate";
import {Subject} from "./subject";

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
  updateBy?: string
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
  mainPosition: string | null
  secondaryPosition: string | null
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
  deleteBy: string
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
  lessonsStandardSys: NumberLessons;
  lessonsCLCVietnamese: NumberLessons;
  lessonsCLCEnglish: NumberLessons;
  lessonsEnglishInternational: NumberLessons;
  lessonsMaster: NumberLessons;
  conversionLesson: NumberLessons;
  totalNumberLessons: number;
  status: number;
}

export interface LecturerTeachingHistory {
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
