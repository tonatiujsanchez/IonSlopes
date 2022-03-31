import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../../services/todos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { IonInput, IonList } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  @ViewChild('inputAdd') inputAgregar: IonInput;
  @ViewChild('listTareas') listaTareas: IonList;

  lista: Lista;
  nombreItem = '';

  idxEditando:number = null;

  disabledReorder: boolean = true;


  constructor( 
    private todosSvc: TodosService,
    private activateRoute: ActivatedRoute
    ) { }
    
    async ngOnInit() {
      const listaId = this.activateRoute.snapshot.paramMap.get('listaId')
      this.lista = await this.todosSvc.obtenerLista( Number( listaId ) ) 
    }

    ionViewWillEnter(){
      this.disabledReorder = true;
    }

    agregarItem(){

      if( this.nombreItem.trim() === '' ){
        return;
      }

      if(this.idxEditando !== null){
        
        this.lista.items[this.idxEditando].desc = this.nombreItem;
        this.idxEditando = null;
        this.listaTareas.closeSlidingItems();

      }else{
        const nuevoItem = new ListaItem( this.nombreItem );
        this.lista.items.push( nuevoItem );
      }
      this.todosSvc.guardarStorage();
      this.nombreItem = '';

    }


    checkToggle(){
      const listaCompletada = this.lista.items.every( i => i.completado )

      if( listaCompletada ){
        this.lista.terminada = true;
        this.lista.terminadaEn = new Date();
      }else{
        this.lista.terminada = false;
        this.lista.terminadaEn = null;
      }

      this.todosSvc.guardarStorage();
    }


    deleteItem( index: number ){
      this.lista.items.splice(index, 1)
      this.todosSvc.guardarStorage();
    }


    editItem( index:number ){
      
      this.nombreItem = this.lista.items[index].desc;
      this.idxEditando = index;
      this.inputAgregar.setFocus()
    }



    doReorder( $event ){
      const itemMove = this.lista.items.splice( $event.detail.from, 1 )[0];  //Eliminamos el elementos del Array y lo almacenamos
      this.lista.items.splice( $event.detail.to, 0, itemMove );              //Insertamos el elemento en el Array en la nueva posisión
            
      $event.detail.complete();
      this.todosSvc.guardarStorage();
    }


    toggleReorder(){
      this.disabledReorder = !this.disabledReorder;
    }
}
