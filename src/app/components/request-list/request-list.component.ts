import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requests: any;

  expanded: boolean = false;

  @Output() update: EventEmitter<void> = new EventEmitter<void>();

  constructor(private requestService: RequestService) { }

  @Input() mode: any = null;


  toggleExpand() {
    this.expanded = !this.expanded;
  }

  Update() {
    this.update.emit();
  }


  onChanges() {
    this.updateRequests();
  }

  public updateRequests() {
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

      this.ngOnInit();



    }
  }

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
