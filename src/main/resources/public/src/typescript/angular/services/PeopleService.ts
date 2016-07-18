import { Injectable } from '@angular/core';
import {Http,RequestOptions,Response} from '@angular/http';
import { Observable }  from 'rxjs/Observable';
@Injectable()
export class PeopleService {
    constructor(private http:Http){

    }
    findOne(id:number){
        let options=new RequestOptions({search:'id='+id});
        return this.http.get("/people/findOne",options).subscribe(
            (resonpose)=>resonpose.json(),
            (error) =>  console.log(error));
        
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
}
