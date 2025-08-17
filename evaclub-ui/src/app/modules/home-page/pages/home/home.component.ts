import { AfterViewInit, Component } from '@angular/core';
import 'flowbite';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

   ngAfterViewInit() {
    initFlowbite();

  }




}
