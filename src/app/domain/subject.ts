export interface SubjectGroup {
  maNhom: string;
  tenNhom: string;
}

export interface SubjectTrainingSys {
  maHe: number;
  phanHe: string;
}

export interface Subject {
  maMon: string;
  phanLoai: string;
  subjectGroup: SubjectGroup;
  tenMon: string;
  soTiet: number;
}

export interface SubjectCreateRequest {
  createBy?: string;
  subjectCreate?: SubjectCreate;
}

export interface SubjectCreate {
  maNhom: string,
  maLoai: number,
  maMon: string,
  tenMon: string,
  soTiet: number,
}

export interface SubjectDeleteRequest {
  subjectIds: string;
  deleteBy: string
}

export interface SubjectUpdateRequest {
  subjectId?: string;
  subjectUpdate?: SubjectUpdate;
  updateBy?: string
}

export interface SubjectUpdate {
  tenMon: string,
  soTiet: number,
}

