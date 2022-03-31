import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';

import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista: IonList;

  @Input() completadas = true;
  @Output() editLista: EventEmitter<Lista> = new EventEmitter();


  disabledReorder: boolean = true;

  constructor(
    public todoSvc: TodosService,
    private router: Router) { }

  ngOnInit() {

    this.todoSvc.closeSliding.subscribe(
      () => { this.lista.closeSlidingItems() }
    )

    this.todoSvc.activeReorder.subscribe(
      (toggleReorder) => { 
        this.disabledReorder = toggleReorder;
       }
    )

  }

  ionViewDidEnter(){
    this.disabledReorder = true;
  }


  verLista(idLista) {
    if (this.completadas) {
      this.router.navigate(['/tabs/tab2/agregar', idLista]);
    } else {
      this.router.navigate(['/tabs/tab1/agregar', idLista]);
    }
  }


  deleteList(idLista) {
    this.todoSvc.eliminarLista(idLista);
  }


  editList(lista: Lista) {
    this.editLista.emit(lista);
  }


  doReorder( $event ){

    const itemMove = this.todoSvc.listas.splice( $event.detail.from, 1 )[0];  //Eliminamos el elementos del Array y lo almacenamos
    this.todoSvc.listas.splice( $event.detail.to, 0, itemMove );              //Insertamos el elemento en el Array en la nueva posisión

    $event.detail.complete();
    this.todoSvc.guardarStorage();
  }


  // toggleReorder(){
  //   this.disabledReorder = !this.disabledReorder;    
  // }

}
