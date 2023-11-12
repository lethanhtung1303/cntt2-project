import {Injectable} from '@angular/core';
import {Lecturer} from "../domain/lecturer";
import {Observable, of} from "rxjs";

export interface LecturerResponse {
  status: number,
  results: {
    resultsTotalCount: number,
    lecturers: Lecturer[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  constructor() {
  }

  getData(): LecturerResponse {
    return {
      status: 200,
      results: {
        resultsTotalCount: 0,
        lecturers: [
          {
            id: 1,
            firstName: 'John',
            fullName: 'John Doe 001',
            gender: true,
            images: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/7383d138650505.598fa11956e27.jpg',
            birthday: '1990-01-15',
            placeOfBirth: 'New York',
            address: '123 Main St, New York, USA',
            addressTmp: '456 Temporary St, New York, USA',
            phone: '123-456-7890',
            email: 'john.doe@example.com',
            emailTdtu: 'john.doe@tdtu.edu.vn',
            workplace: 'ABC Corporation',
            mainPosition: 'Software Engineer',
            secondaryPosition: 'Team Lead',
            certificate: [
              {
                id: 1,
                loaiChungChi: 'Cert 1',
                diem: 95
              },
              {
                id: 2,
                loaiChungChi: 'Cert 2',
                diem: 88
              }
            ],
            trainingProcess: [
              {
                id: 1,
                level: {
                  id: 1,
                  trinhDo: 'Tien si',
                  kyHieu: 'TS',
                  displayOrder: 3
                },
                language: [
                  {
                    id: 1,
                    tenNgonNgu: 'English'
                  },
                  {
                    id: 2,
                    tenNgonNgu: 'French'
                  }
                ],
                truong: 'ABC University',
                nganh: 'Computer Science',
                namTotNghiep: 2015,
                deTaiTotNghiep: 'Thesis on AI',
                nguoiHuongDan: 'Dr. Smith',
                loaiTotNghiep: 'Excellent'
              },
              {
                id: 2,
                level: {
                  id: 2,
                  trinhDo: 'Thac si',
                  kyHieu: 'ThS',
                  displayOrder: 4
                },
                language: [
                  {
                    id: 1,
                    tenNgonNgu: 'English'
                  },
                  {
                    id: 2,
                    tenNgonNgu: 'French'
                  }
                ],
                truong: 'ABC University',
                nganh: 'Computer Science',
                namTotNghiep: 2015,
                deTaiTotNghiep: 'Thesis on AI',
                nguoiHuongDan: 'Dr. Smith',
                loaiTotNghiep: 'Excellent'
              }
            ],
            satisfactionScore: [
              {
                id: 1,
                subject: {
                  maMon: 'CS101',
                  subjectGroup: {
                    maNhom: 'IT',
                    tenNhom: 'Information Technology'
                  },
                  tenMon: 'Introduction to Computer Science',
                  soTietLyThuyet: 30,
                  soTietThucHanh: 15
                },
                hocKy: 1,
                diemHaiLong: 9.5
              }
            ],
            isActive: true,
            createdAt: '2023-11-10',
            createdBy: 'Admin',
            updatedAt: null,
            updateBy: null,
            deletedFlag: false,
            deletedAt: null,
            deletedBy: null,
          }
          , {
            id: 2,
            firstName: "John",
            /** Have **/      fullName: "John Doe 002",
            /** Have **/    gender: false,
            /** Have **/  images: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/3671da38650505.598fa119575fb.jpg",
            /** Have **/  birthday: "1990-01-01",
            /** Have **/  placeOfBirth: "City X",
            address: "123 Main Street",
            /** Have **/  addressTmp: "456 Temporary Street",
            /** Have **/    phone: "123-456-7890",
            /** Have **/   email: "john.doe@example.com",
            /** Have **/   emailTdtu: "john.doe@tdtu.edu.vn",
            /** Have **/  workplace: "University XYZ",
            /** Have **/ mainPosition: "Professor",
            /** Have **/  secondaryPosition: "Researcher",
            certificate: [
              {
                id: 1,
                loaiChungChi: "PhD",
                diem: 90
              },
              {
                id: 2,
                loaiChungChi: "Master's",
                diem: 85
              }
            ],
            trainingProcess: [
              {
                id: 1,
                level: {
                  id: 1,
                  trinhDo: "Tien si",
                  kyHieu: "TS",
                  displayOrder: 3
                },
                language: [
                  {
                    id: 1,
                    tenNgonNgu: "English"
                  }
                ],
                truong: "University ABC",
                nganh: "Computer Science",
                namTotNghiep: 2010,
                deTaiTotNghiep: "Thesis title",
                nguoiHuongDan: "Mentor Name",
                loaiTotNghiep: "Excellent"
              },
              {
                id: 2,
                level: {
                  id: 1,
                  trinhDo: "Giao su",
                  kyHieu: "GS",
                  displayOrder: 1
                },
                language: [
                  {
                    id: 1,
                    tenNgonNgu: "English"
                  }
                ],
                truong: "University ABC",
                nganh: "Computer Science",
                namTotNghiep: 2010,
                deTaiTotNghiep: "Thesis title",
                nguoiHuongDan: "Mentor Name",
                loaiTotNghiep: "Excellent"
              },
              {
                id: 3,
                level: {
                  id: 1,
                  trinhDo: "Thac si",
                  kyHieu: "ThS",
                  displayOrder: 4
                },
                language: [
                  {
                    id: 1,
                    tenNgonNgu: "English"
                  }
                ],
                truong: "University ABC",
                nganh: "Computer Science",
                namTotNghiep: 2010,
                deTaiTotNghiep: "Thesis title",
                nguoiHuongDan: "Mentor Name",
                loaiTotNghiep: "Excellent"
              }
            ],
            satisfactionScore: [
              {
                id: 1,
                subject: {
                  maMon: "CS101",
                  subjectGroup: {
                    maNhom: "Group1",
                    tenNhom: "Group 1"
                  },
                  tenMon: "Introduction to Computer Science",
                  soTietLyThuyet: 30,
                  soTietThucHanh: 20
                },
                hocKy: 1,
                diemHaiLong: 9.5
              }
            ],
            isActive: true,
            createdAt: "2022-01-01",
            createdBy: "Admin",
            updatedAt: null,
            updateBy: null,
            deletedFlag: false,
            deletedAt: null,
            deletedBy: null
          }
        ]
      }
    }
  }

  getLecturer(): Observable<LecturerResponse> {
    return of(this.getData())
  }
}
