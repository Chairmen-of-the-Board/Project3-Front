import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests: any;

  constructor(private requestService: RequestService) { }

  @Input() mode: any = null;

  ngOnInit(): void {
    if(this.mode == "out"){
      this.requests = this.requestService.getOutgoing();
    }
    else{
      this.requests = this.requestService.getIncoming();
    }
  }

}
