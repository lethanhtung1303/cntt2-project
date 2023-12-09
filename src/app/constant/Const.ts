import {GraduationType, Language, Level} from "../domain/lecturer";

export class Const {
    static readonly level: Level[] = [
        {
            id: 1,
            trinhDo: "Giáo sư",
            kyHieu: "GS",
            displayOrder: 1
        }, {
            id: 2,
            trinhDo: "Phó giáo sư",
            kyHieu: "PGS",
            displayOrder: 2
        }, {
            id: 3,
            trinhDo: "Tiến sĩ",
            kyHieu: "TS",
            displayOrder: 3
        }, {
            id: 4,
            trinhDo: "Thạc sĩ",
            kyHieu: "Ths",
            displayOrder: 4
        }, {
            id: 5,
            trinhDo: "Nghiên cứu sinh",
            kyHieu: "NCS",
            displayOrder: 5
        }, {
            id: 6,
            trinhDo: "Kỹ sư",
            kyHieu: "KS",
            displayOrder: 6
        }, {
            id: 7,
            trinhDo: "Cử nhân",
            kyHieu: "CN",
            displayOrder: 7
        },
    ]

    static readonly language: Language[] = [
        {
            id: 1,
            tenNgonNgu: "Việt"
        }, {
            id: 2,
            tenNgonNgu: "Anh"
        }, {
            id: 3,
            tenNgonNgu: "Nhật"
        }, {
            id: 4,
            tenNgonNgu: "Pháp"
        }, {
            id: 5,
            tenNgonNgu: "Trung"
        }
    ]
    static readonly graduationType: GraduationType[] = [
        {
            id: 1,
            loaiTotNghiep: "Xuất sắc"
        }, {
            id: 2,
            loaiTotNghiep: "Giỏi"
        }, {
            id: 3,
            loaiTotNghiep: "Khá"
        }, {
            id: 4,
            loaiTotNghiep: "Trung bình"
        }, {
            id: 5,
            loaiTotNghiep: "Yếu"
        }, {
            id: 6,
            loaiTotNghiep: "Kém"
        }
    ]
}
