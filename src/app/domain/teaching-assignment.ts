export interface AssignmentRequest {
  assignment: Assignment;
  createBy: string;
}

export interface UploadAssignmentRequest {
  assignments: Assignment[];
  createBy: string;
}

export interface Assignment {
  giangVienId?: number;
  hocKy?: number;
  maMon?: string;
  maHe?: number;
}
