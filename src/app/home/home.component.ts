import { Component, OnInit, ViewChild } from '@angular/core';
import { itemService } from '../_services/index';
import { Observable } from 'rxjs';
import { GridComponent, GridDataResult, DataStateChangeEvent} from '@progress/kendo-angular-grid';


@Component({
  providers: [itemService],
  templateUrl: 'home.component.html'
 })

export class HomeComponent {
    private view: Observable<GridDataResult>;
    private pageSize: number = 5;
    private skip: number  = 0;

    @ViewChild(GridComponent) private grid: GridComponent;
    constructor(private service: itemService) {
        this.view = service;
        var that = this; 
       setTimeout(function() { service.query({ skip: that.skip, take: that.pageSize })}, 1000);

       
    }

    public ngAfterViewInit(): void {
        this.grid.dataStateChange
            .do(({ skip, take }: DataStateChangeEvent) => {
                this.skip = skip;
                this.pageSize = take;
            })
            .subscribe(x => this.service.query(x));
    }
}