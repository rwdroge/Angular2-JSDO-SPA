import { Injectable } from '@angular/core';
import { Router, NavigationStart, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService, AlertService } from '../_services/index';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { progress } from '@progress/jsdo-core';

import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from "@progress/kendo-data-query";

@Injectable()
export class itemService extends BehaviorSubject<GridDataResult>{
    private tableName: string = 'ttItems';
    private jsdo: progress.data.JSDO;

    constructor(private http: Http,
                private router: Router,
                private loginService: LoginService,
                private alertService: AlertService) 
    {
        
        super(null);
        this.jsdo = new progress.data.JSDO("item"); 

    }


        public query(state: any): any {
            console.log("am i here?");
            this.fetch(this.tableName, state)
                .subscribe(x => super.next(x));
                
        }
        
        private fetch(tableName: string, state: State): Observable<GridDataResult> {
            let that = this;
            let query = {
                skip: state.skip,
                top: state.take
            };
            
            let promise = new Promise((resolve, reject) => {
                let afterFill = (jsdo: any, success: any, request: any) => {
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
                that.jsdo.subscribe('AfterFill', afterFill, this);
                that.jsdo.fill(query).then(
                    (done) => {
                        console.log("done", done);
                }).catch(
                    (error) => {
                        this.router.navigate(['/login'], { queryParams: { error: "There is no active login session, please login again" } } );
                });
            });

            let result = Observable.fromPromise(promise)
                .map((ret: GridDataResult) => (<GridDataResult>{
                    
                    data: ret.data,
                    total: ret.total
                }));
               
            return result;
        }
    
}