import { Config } from './../../app/app.module';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {

  constructor(private http: Http) { }

  /** */
  getAllSkills() {
    var url = Config.URL + '/get/skills-list';

    //Promesse retournée à la page
    return new Promise(
      (resolve, reject) => {
        //Appel asynchrone au backend
        this.http.get(url).subscribe(
          // callback de la requête http (succès)
          (response) => {
            //tranformation de la réponse texte en objet json
            let data = response.json();
          // Envoi des données à la page qui a initié la promesse
            resolve(data);
          },
          //callback d'erreur http
          (error) => reject(error)
        );
      }
    );
  }

  /** */
  getAllArea() {
    var url = Config.URL + '/get/area-list';

    //Promesse retournée à la page
    return new Promise(
      (resolve, reject) => {
        //Appel asynchrone au backend
        this.http.get(url).subscribe(
          // callback de la requête http (succès)
          (response) => {
            //tranformation de la réponse texte en objet json
            let data = response.json();
          // Envoi des données à la page qui a initié la promesse
            resolve(data);
          },
          //callback d'erreur http
          (error) => reject(error)
        );
      }
    );
  }

    /** */
    getAllMobilities() {
      var url = Config.URL + '/get/mobility-list';
  
      //Promesse retournée à la page
      return new Promise(
        (resolve, reject) => {
          //Appel asynchrone au backend
          this.http.get(url).subscribe(
            // callback de la requête http (succès)
            (response) => {
              //tranformation de la réponse texte en objet json
              let data = response.json();
            // Envoi des données à la page qui a initié la promesse
              resolve(data);
            },
            //callback d'erreur http
            (error) => reject(error)
          );
        }
      );
    }
  
}
