import { Component } from '@angular/core';
import {PeopleService} from './services/PeopleService'

// styleUrls:['./app.component.css'],
@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl:'app.component.html',
    styleUrls:['app.component.css'],
    providers:[PeopleService]
})
export class AppComponent {
    constructor(private peopleService:PeopleService){
    }

    findOne(){
        this.peopleService.findOne(1);
    }
}
