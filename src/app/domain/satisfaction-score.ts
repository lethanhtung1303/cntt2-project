export interface SatisfactionScoreDeleteRequest {
    satisfactionScoreId: string;
    deleteBy: string
}

export interface SatisfactionScoreCreate {
    maMon: string;
    hocKy: number;
    diemHaiLong: number;
}

export interface SatisfactionScoreCreateRequest {
    lecturerId?: number;
    satisfactionScoreCreate?: SatisfactionScoreCreate;
    createBy?: string
}
