import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TodosService } from '../../services/todos.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( 
      public todoSvc: TodosService,
      private router: Router,
      public alertController: AlertController
    ) { }


    async agregarLista() {
      const alert = await this.alertController.create({
        header: 'Nueva Lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
            placeholder: 'Hacer las compras'
          }          
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
            }
          }, {
            text: 'Crear',
            handler: ( data ) => {
              if(data.titulo.trim() === ''){
                return
              }
              
              const listaId = this.todoSvc.crearLista( data.titulo.trim() )
              this.router.navigate(['/tabs/tab1/agregar', listaId])
            }
          }
        ]
      });
  
      await alert.present();
    }
  
}
