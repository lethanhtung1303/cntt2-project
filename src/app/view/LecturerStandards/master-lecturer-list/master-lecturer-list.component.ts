import {Component} from '@angular/core';
import {MasterStandards} from "../../../domain/lecturer";
import {LecturerStandardService, MasterStandardsResponse} from "../../../service/lecturer-standards.service";

@Component({
  selector: 'app-master-lecturer-list',
  templateUrl: './master-lecturer-list.component.html',
  styleUrls: ['./master-lecturer-list.component.css']
})
export class MasterLecturerListComponent {
  lecturers: MasterStandards[] = [];

  constructor(private lecturerStandardService: LecturerStandardService) {
    this.lecturerStandardService.getMasterStandards().subscribe({
      next: (data: MasterStandardsResponse) => {
        this.lecturers = data.results.masterStandards;
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
