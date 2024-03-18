export interface CertificateType {
  maLoai: number;
  tenLoai: string;
}

export interface Certificate {
  id: number;
  certificateType: CertificateType;
  diem: number;
}

export interface CertificateUpdate {
  id: number;
  maLoai: number;
  diem: number;
}

export interface CertificateUpdateRequest {
  lecturerId?: number;
  certificateUpdate?: CertificateUpdate;
  updateBy?: string
}

export interface CertificateDeleteRequest {
  certificateId: string;
  deleteBy: string
}

export interface CertificateCreate {
  maLoai: number;
  diem: number;
}

export interface CertificateCreateRequest {
  lecturerId?: number;
  certificateCreate?: CertificateCreate;
  createBy?: string
}
