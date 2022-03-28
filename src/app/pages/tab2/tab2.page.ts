import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private todoSvc: TodosService ) {}

}
