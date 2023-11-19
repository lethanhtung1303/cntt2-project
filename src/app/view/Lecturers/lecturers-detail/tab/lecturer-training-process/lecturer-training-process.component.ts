import {Component, Input, OnInit} from '@angular/core';
import {Lecturer} from "../../../../../domain/lecturer";

@Component({
  selector: 'app-lecturer-training-process',
  templateUrl: './lecturer-training-process.component.html',
  styleUrls: ['./lecturer-training-process.component.css']
})
export class LecturerTrainingProcessComponent implements OnInit {
  @Input() lecturerInfo?: Lecturer;

  ngOnInit(): void {
  }
}
