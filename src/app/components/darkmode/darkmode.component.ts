import { Component, OnInit } from '@angular/core';
import { throttleTime } from 'rxjs';

@Component({
  selector: 'app-darkmode',
  templateUrl: './darkmode.component.html',
  styleUrls: ['./darkmode.component.css']
})
export class DarkmodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
 }

}
