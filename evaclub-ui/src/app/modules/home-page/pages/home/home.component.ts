import { AfterViewInit, Component, OnInit } from '@angular/core';
import 'flowbite';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnInit {

  ngAfterViewInit() {
    initFlowbite();
  }


  ngOnInit() {
    this.InitScroll();
  }

  InitScroll(): void {
    const content = document.getElementById("scrollContent");
    if (content) {
      const clone = content.innerHTML;
      for (let i = 0; i < 3; i++) {
        content.innerHTML += clone;
      }
    }
  }


}
