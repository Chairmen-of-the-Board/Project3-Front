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
      // get outgoing requests
      this.requestService.getOutgoing().subscribe(res=> {
        this.requests = res;
      });


    }
    else{

      // get incoming requests
      this.requestService.getIncoming().subscribe(res=> {
        this.requests = res;
      });




    }
  }

}
