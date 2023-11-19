export interface ClassificationLecturer {
  maLoai: number;
  phanLoai: string;
}

export interface Certificate {
  id: number;
  loaiChungChi: string;
  diem: number;
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

export interface TrainingProcess {
  id: number;
  level: Level;
  language: Language[];
  truong: string;
  nganh: string;
  namTotNghiep: number;
  deTaiTotNghiep: string | null;
  nguoiHuongDan: string | null;
  loaiTotNghiep: string | null;
}

export interface SubjectGroup {
  maNhom: string;
  tenNhom: string;
}


export interface Subject {
  maMon: string;
  subjectGroup: SubjectGroup;
  tenMon: string;
  soTietLyThuyet: number;
  soTietThucHanh: number;
}

export interface SatisfactionScore {
  id: number;
  subject: Subject;
  hocKy: number;
  diemHaiLong: number;
}


export interface Lecturer {
  id: number;
  /** OK **/
  firstName: string;
  /** OK **/
  fullName: string;
  /** OK **/
  gender: boolean;
  images: string | null;
  birthday: string | null;
  /** OK **/
  placeOfBirth: string | null;
  /** OK **/
  address: string | null;
  /** OK **/
  addressTmp: string | null;
  /** OK **/
  phone: string | null;
  /** OK **/
  email: string | null;
  /** OK **/
  emailTdtu: string | null;
  /** OK **/
  workplace: string | null;
  /** OK **/
  mainPosition: string | null;
  /** OK **/
  secondaryPosition: string | null;
  /** OK **/
  classificationLecturers: ClassificationLecturer;
  /** OK **/
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

