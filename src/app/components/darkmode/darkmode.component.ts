import { Component, OnInit } from '@angular/core';
import { throttleTime } from 'rxjs';

@Component({
  selector: 'app-darkmode',
  templateUrl: './darkmode.component.html',
  styleUrls: ['./darkmode.component.css']
})
export class DarkmodeComponent implements OnInit {
  darkTheme = 'false';

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('dark-theme')=='true'){
      document.body.classList.toggle('dark-theme');
    }

  }
  toggleDarkTheme(): void {
    if(localStorage.getItem('dark-theme') == 'true'){
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('dark-theme', 'false');

    }
    else{
      localStorage.setItem('dark-theme', 'true');
      document.body.classList.toggle('dark-theme');


    }


 }

}
