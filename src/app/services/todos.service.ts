import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private _storage: Storage | null = null;
  private keyStorage: string = '280322-ion-todoList';

  public listas: Lista[] = [];



  constructor( private storage: Storage ) { 

    this.loadStorage()
  }

  async loadStorage(){
    const storage = await this.storage.create();
    this._storage = storage;

    return await this.cargarListas()
  }

  async cargarListas(){
    const listasStorage:Lista[] = await this._storage.get(this.keyStorage);
    
    if( !listasStorage ){
      this._storage.set( this.keyStorage, [] );
    }
    
    this.listas = listasStorage || [];   

   return this.listas;
  }




  crearLista( titulo:string ){
    const nuevaLista = new Lista(titulo)
    
    this.listas = [ nuevaLista, ...this.listas ]
    this. guardarStorage();
    
    return nuevaLista.id;
  }


  async obtenerLista( idLista:number ){
    
    const listas = await this.loadStorage()
    
    return listas.find( lista => lista.id === idLista )
  }

  guardarStorage(){
    this._storage.set( this.keyStorage, this.listas );
  }


}
