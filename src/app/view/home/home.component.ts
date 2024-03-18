import { Component } from '@angular/core';
import {
  LecturerResponse,
  LecturerService,
} from '../../service/lecturer.service';
import { SubjectResponse, SubjectService } from '../../service/subject.service';
import { Lecturer } from '../../domain/lecturer';
import { Subject } from '../../domain/subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images: any[] | undefined;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];
  totalLecturers: number = 0;
  totalSubjects: number = 0;
  lecturers: Lecturer[] = [];
  subjects: Subject[] = [];

  constructor(
    private lecturerService: LecturerService,
    private subjectService: SubjectService,
  ) {
    this.getImages().then((images) => (this.images = images));

    this.lecturerService.getAllLecturer().subscribe({
      next: (data: LecturerResponse) => {
        this.totalLecturers = data.results.resultsTotalCount;
        this.lecturers = data.results.lecturers;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.subjectService.getAllSubject().subscribe({
      next: (data: SubjectResponse) => {
        this.totalSubjects = data.results.resultsTotalCount;
        this.subjects = data.results.subjects;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getData() {
    return [
      {
        itemImageSrc: 'https://stdportal.tdtu.edu.vn/images/sliders/T7-2.jpg',
        thumbnailImageSrc:
          'https://stdportal.tdtu.edu.vn/images/sliders/T7-2.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1',
      },
      {
        itemImageSrc:
          'https://stdportal.tdtu.edu.vn/images/sliders/Th%C6%B0%20Vi%E1%BB%87n.jpg',
        thumbnailImageSrc:
          'https://stdportal.tdtu.edu.vn/images/sliders/Th%C6%B0%20Vi%E1%BB%87n.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2',
      },
    ];
  }

  getImages() {
    return Promise.resolve(this.getData());
  }

  getContractualLecturer() {
    return this.lecturers.filter(
      (lecturer) => lecturer.classificationLecturers.maLoai === 1,
    ).length;
  }

  getVisitingLecturer() {
    return this.lecturers.filter(
      (lecturer) => lecturer.classificationLecturers.maLoai !== 1,
    ).length;
  }

  getTheorySubjects() {
    return this.subjects.filter((subject) => subject.phanLoai === 'Lý thuyết')
      .length;
  }

  getPracticeSubjects() {
    return this.subjects.filter((subject) => subject.phanLoai === 'Thực hành')
      .length;
  }
}
