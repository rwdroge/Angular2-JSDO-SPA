import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { LoginService, itemService } from '../_services/index';
import { Observable } from 'rxjs';
import { GridComponent, GridDataResult, DataStateChangeEvent} from '@progress/kendo-angular-grid';
import { progress } from '@progress/jsdo-core';

@Component({
  providers: [itemService],
  templateUrl: 'item.component.html'
 })

export class ItemComponent implements OnInit {
    private view: Observable<GridDataResult>;
    private pageSize: number = 20;
    private skip: number  = 0;

    @ViewChild(GridComponent) private grid: GridComponent;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: itemService,
                private login: LoginService){
                    this.view = service;
                }


    ngOnInit() {
        this.grid.dataStateChange
        .do(({ skip, take }: DataStateChangeEvent) => {
            this.skip = skip;
            this.pageSize = take;
        })
        .subscribe(x => this.service.query(x));    
        
    }

   public ngAfterViewInit(): void {
        
    }
}