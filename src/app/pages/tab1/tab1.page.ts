import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  disabledReorder: boolean = true;
  
  get showBtnReorder(){

    const listasSinCompletar = this.todoSvc.listas.filter( l => !l.terminada )

    return listasSinCompletar.length >= 2;
  }

  constructor( 
      public todoSvc: TodosService,
      public alertController: AlertController
    ) { }

    ionViewDidEnter(){
      this.disabledReorder = true;
      this.todoSvc.activeReorder.emit(this.disabledReorder)

    }

    agregarLista(){
      this.todoSvc.mostrarAlerta();
    }

    editarLista( lista: Lista ){
      this.todoSvc.mostrarAlerta( lista );
    }
  
    toggleReorder(){
      this.disabledReorder = !this.disabledReorder;
      this.todoSvc.activeReorder.emit(this.disabledReorder)
    }

}
