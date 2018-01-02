import { Config } from './../../app/app.module';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private authenticated:boolean = false;
  //toke JWT
  private token:String = null;
  //Infos sur l'utilisateur
  private user:any = {};

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  signIn(credentials) {
    var url = Config.URL + '/user/find';
    //Promesse retournée à loginPage
    return new Promise(
      (resolve, reject)=> {
        //Appel asynchrone au backend
        this.http.post(url, credentials).subscribe(
          //callback de la requête http (succès)
          (response)=> {
            //tranformation de la réponse texte en objet json
            var data = response.json();
            console.log(data);
            //hydratation de UserProvider en fonction des données de la requête
             if('success' in data) {
              this.authenticated = data.success;
              this.token = data.token || null;
              this.user = data.user || {};
            } 
            //Envoi des données à la page qui a initié la promesse
            resolve(data);
          },
          //callback d'erreur http
          (error)=>{
            console.log(error);
            reject(error);
          }
        );
      }
    );

  }

  signOUt() {

  }

  register() {

  }


  getToken(){
    return this.token;
  }

  getUser(){
    return this.user;
  }

  isAuthenticated(){
    return this.authenticated;
  }

}
