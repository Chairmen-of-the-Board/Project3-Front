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

  get isDark() : boolean {
    let is_dark: boolean = ( localStorage.getItem('dark-theme') == 'true') ? true : false;
    return is_dark;
  }


  ngOnInit(): void {
      // SET DARK MODE
    if (localStorage.getItem('dark-theme') =='true') {
      document.body.classList.toggle('dark-theme', true);
    } else {
      document.body.classList.toggle('dark-theme', false);
    }
  }
  toggleDarkTheme(): void {
    alert('dark mode is ' + this.isDark + ' and\n' + 'localstorage is ' + localStorage.getItem('dark-theme'));

    if(localStorage.getItem('dark-theme') == 'true'){
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('dark-theme', 'false');

    }
    else{
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('dark-theme', 'true');
    }


    alert('now dark mode is ' + this.isDark + ' and\n' + 'localstorage is ' + localStorage.getItem('dark-theme'));


 }

}
