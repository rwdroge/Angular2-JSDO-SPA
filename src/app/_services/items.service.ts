import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { JsdoService, AlertService } from '../_services/index';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { progress } from 'jsdo';

import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from "@progress/kendo-data-query";

var Session = progress.data.JSDOSession;

@Injectable()
export class itemService extends BehaviorSubject<GridDataResult> {
    private tableName: string = 'Categories';
    private jsdo: any;

    constructor(private http: Http,
                private jsdoService: JsdoService,
                private alertService: AlertService) 
    {
        super(null);

        const catalogURI = 'http://localhost:9210/Sports2017/static/Sports2017Service.json';

        let session = jsdoService.session;
        
        var promise = new Promise((resolve, reject) => {
            resolve(session.addCatalog(catalogURI));
        })
        .then((val) => {
            let items = new progress.data.JSDO({ name: 'item' });
            this.jsdo = items;
            
        })
        .catch((val) => {
            this.alertService.error("Could not add catalog");
        })
        
        
    }

    public query(state: any): void {
        this.fetch(this.tableName, state)
            .subscribe(x => super.next(x));
    }
    
    private fetch(tableName: string, state: State): Observable<GridDataResult> {
        let that = this;
        let query = {
            skip: state.skip,
            top: state.take
        };
        console.log(that.jsdo);
        let promise = new Promise((resolve, reject) => {
            let afterFill = (jsdo: any, success: any, request: any) => {
                    console.log(jsdo);
                    jsdo.unsubscribe('AfterFill', afterFill, this);

                    if (success) {
                        let data = jsdo.getData();

                        if (query.top) {
                            let afterInvoke = (items: any, success1: any, request1: any): void => {
                                jsdo.unsubscribe('AfterInvoke', 'count', afterInvoke, this);

                                resolve(<GridDataResult>{
                                    data: data,
                                    total: request1.response.numRecs
                                });
                            };
                            jsdo.subscribe('AfterInvoke', 'count', afterInvoke, this);
                            jsdo.count(query);
                        } else {
                            resolve(<GridDataResult>{
                                data: data,
                                total: data.length
                            });
                        }
                    } else {
                        reject(new Error('Error while executing query'));
                    }
                };
                console.log(that.jsdo);
            that.jsdo.subscribe('AfterFill', afterFill, this);
            that.jsdo.fill(query);
        });

        let result = Observable.fromPromise(promise)
            .map((ret: GridDataResult) => (<GridDataResult>{
                data: ret.data,
                total: ret.total
            }));

        return result;
    }
}