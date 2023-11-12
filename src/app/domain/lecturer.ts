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

