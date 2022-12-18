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

  @Output() requests: any;

  expanded: boolean = false;

  constructor(private requestService: RequestService,  private router: Router) { }

  @Input() mode: any = null;


  toggleExpand() {
    this.expanded = !this.expanded;
  }


  onChanges() {
    this.updateRequests();
  }

  public reload() {

    // save current route first
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]); // navigate to same route
    }); 
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
