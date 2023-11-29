export interface TrainingProcessCreate {
    namTotNghiep: number;
    loaiTotNghiep: number;
    nguoiHuongDan: string;
    deTaiTotNghiep: string;
    nganh: string;
    truong: string;
    languageIds: string;
    level: number;
}

export interface TrainingProcessUpdate {
    namTotNghiep: number;
    loaiTotNghiep: number;
    nguoiHuongDan: string;
    deTaiTotNghiep: string;
    nganh: string;
    truong: string;
    languageIds: string;
    level: number;
}

export interface TrainingProcessCreateRequest {
    lecturerId?: number;
    trainingProcessCreate?: TrainingProcessCreate;
    createBy?: string
}

export interface TrainingProcessUpdateRequest {
    processId?: number;
    trainingProcessUpdate?: TrainingProcessUpdate;
    updateBy?: string
}

export interface TrainingProcessDeleteRequest {
    trainingProcessId: number;
    deleteBy: string
}
