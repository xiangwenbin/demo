import { Component } from '@angular/core';
import {PeopleService} from './services/PeopleService'
@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
    <div><a href="javascript:void(0)" (click)="findOne()">findOne</a></div>
    `,
    providers:[PeopleService]
})
export class AppComponent {
    constructor(private peopleService:PeopleService){
    }

    findOne(){
        this.peopleService.findOne(1);
    }
}
