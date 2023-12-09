import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  images: any[] | undefined;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() {
    this.getImages().then((images) => (this.images = images))
  }


  getData() {
    return [
      {
        itemImageSrc: 'https://stdportal.tdtu.edu.vn/images/sliders/T7-2.jpg',
        thumbnailImageSrc: 'https://stdportal.tdtu.edu.vn/images/sliders/T7-2.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: 'https://stdportal.tdtu.edu.vn/images/sliders/Th%C6%B0%20Vi%E1%BB%87n.jpg',
        thumbnailImageSrc: 'https://stdportal.tdtu.edu.vn/images/sliders/Th%C6%B0%20Vi%E1%BB%87n.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2'
      },
    ];
  }

  getImages() {
    return Promise.resolve(this.getData());
  }

}
