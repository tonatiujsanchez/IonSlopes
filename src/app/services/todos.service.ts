import { EventEmitter, Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private _storage: Storage | null = null;
  private keyStorage: string = '280322-ion-todoList';

  public listas: Lista[] = [];

  public closeSliding: EventEmitter<boolean> = new EventEmitter();
  public activeReorder: EventEmitter<boolean> = new EventEmitter();

  constructor( 
    private storage: Storage,
    private router: Router,
    private alertController: AlertController
  ) {
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
    this.guardarStorage();
    
    return nuevaLista.id;
  }


  async obtenerLista( idLista:number ){
    
    const listas = await this.loadStorage()
    
    return listas.find( lista => lista.id === idLista )
  }


  eliminarLista( idLista ){
    this.listas = this.listas.filter( lista => lista.id !== idLista );

    this.guardarStorage();
  }



  editarLista( lista:Lista ){
    this.listas = this.listas.map( listaData =>(
      listaData.id === lista.id ? lista : listaData
    ))

    this.guardarStorage();
  }


  guardarStorage(){
    this._storage.set( this.keyStorage, this.listas );
  }



  async mostrarAlerta( lista?: Lista ) {

    const alert = await this.alertController.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista?.id ? lista.titulo : '',
          placeholder: 'Hacer las compras'
        }          
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.closeSliding.emit();
          }
        }, {
          text: lista?.id ? 'Editar' : 'Crear',
          handler: ( data ) => {
            if(data.titulo.trim() === ''){
              return
            }
            if(lista?.id){
              lista.titulo = data.titulo.trim();
              this.editarLista( lista );
            }else{
              const listaId = this.crearLista( data.titulo.trim() );
              this.router.navigate(['/tabs/tab1/agregar', listaId]);
            }
            this.closeSliding.emit();
          }
        }
      ]
    });

    await alert.present();
  }






}
