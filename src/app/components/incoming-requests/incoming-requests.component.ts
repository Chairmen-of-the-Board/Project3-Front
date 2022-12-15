import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-incoming-requests',
  templateUrl: './incoming-requests.component.html',
  styleUrls: ['./incoming-requests.component.css']
})
export class IncomingRequestsComponent implements OnInit {

  requests: any;

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.requests = this.requestService.getIncoming();
  }

}
