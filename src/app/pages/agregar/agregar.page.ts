import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../../services/todos.service';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor( 
    private todosSvc: TodosService,
    private activateRoute: ActivatedRoute
    ) { }
    
    async ngOnInit() {
      const listaId = this.activateRoute.snapshot.paramMap.get('listaId')
      this.lista = await this.todosSvc.obtenerLista( Number( listaId ) ) 
    }


    agregarItem(){
      if( this.nombreItem.trim() === '' ){
        return;
      }

      const nuevoItem = new ListaItem( this.nombreItem );

      this.lista.items.push( nuevoItem );
      this.todosSvc.guardarStorage();

      this.nombreItem = '';
    }

    checkToggle(item){

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

}
