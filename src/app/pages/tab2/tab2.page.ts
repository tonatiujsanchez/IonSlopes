import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  disabledReorder: boolean = true;

  get showBtnReorder(){

    const listasCompletadas = this.todoSvc.listas.filter( l => l.terminada )

    return listasCompletadas.length >= 2;
  }

  constructor( private todoSvc: TodosService ) {}

  ionViewDidEnter(){
    this.disabledReorder = true;
    this.todoSvc.activeReorder.emit(this.disabledReorder)
  }

  editarLista( lista: Lista ){
    this.todoSvc.mostrarAlerta( lista );
  }

  toggleReorder(){
    this.disabledReorder = !this.disabledReorder;
    this.todoSvc.activeReorder.emit(this.disabledReorder)
  }

}
