import { Config } from './../../app/app.module';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
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

  constructor(public http: Http, public toastCtrl: ToastController) {}

  presentToast(mess: any) {
    let toast = this.toastCtrl.create({
      message: mess,
      duration: 3000
    });
    toast.present();
  }

  signIn(credentials) {
    var url = Config.URL + '/get/user';
    // console.log(url);
    //Promesse retournée à loginPage
    return new Promise(
      (resolve, reject)=> {
        //Appel asynchrone au backend
        this.http.post(url, credentials).subscribe(
          // callback de la requête http (succès)
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
            reject({
              err: error
            });
          }
        );
      }
    );

  }

  signOut() {
    return new Promise(
      (resolve, reject) => {
        this.authenticated = false;
        this.token = null;
        this.user = {};
        resolve(true);    
      }
    );
  }

  register(credentials:any) {
    var url = Config.URL + '/get/adduser';

    return new Promise((resolve, reject) => {
      // Appel Asynchrone au Backend
      this.http.post(url, credentials).subscribe(
        // callback de la requête http (succès)
        (response) => {
          var data = response.json();
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
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
