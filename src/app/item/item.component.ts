import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { LoginService, itemService } from '../_services/index';
import { Observable } from 'rxjs';
import { GridComponent, GridDataResult, DataStateChangeEvent} from '@progress/kendo-angular-grid';
import { progress } from '@progress/jsdo-core';
import { State } from '@progress/kendo-data-query';

@Component({
  providers: [itemService],
  templateUrl: 'item.component.html'
 })

export class ItemComponent {
    public view: Observable<GridDataResult>;
    public state: State = { 
        take: 20,
        skip: 0
    };

    constructor( private route: ActivatedRoute, private router: Router, private service: itemService) {
        this.view = service;
        this.service.query(this.state);
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.service.query(state);
    }
}