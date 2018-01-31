import { Config } from './../../app/app.module';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
// 
import { Storage } from '@ionic/storage';

/*
  Generated class for the FreelanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FreelanceProvider {
  private freelances: Array<object> = [];

  constructor(private storage: Storage, public http: Http) {}

  getFreelances() {
    return new Promise((resolve) => {
      this.storage.get('freelances').then((data) => {
        if(data) {
          this.freelances = JSON.parse(data);
        }

        // this.freelances = data.map(x => x);
        resolve(this.freelances);

      });
    });
  }

/*   getOneFreelance(idUser: number) {
    new Promise((resolve) => {
      this.storage.get
    });
  } */

  addFreelance(freelance) {
    this.freelances.push(freelance);
    this.storage.set('freelances', JSON.stringify(this.freelances));
  }




  getPersonalBusiness(numberParams) {
    let numberOfResults = (isNaN(numberParams)) ? 5 : numberParams;
    var url = Config.URL + '/freelance-list?results=' + numberOfResults;
    return new Promise(
      (resolve, reject) => {
        // Appel Asynchrone à l'API Slim
        this.http.get(url).subscribe(
          (response) => {
            //var data = response.json();
            //console.log(response.toString());
            resolve(response.json());
          },
          (error) => reject(error)
        );
      }
    );
  }

/**
 * 
 * @param numberParams 
 */
  getListOfMissionsToApply(numberParams) {
    let numberOfResults = (isNaN(numberParams)) ? 5 : numberParams;
    var url = Config.URL + '/missions-list?results=' + numberOfResults;
    return new Promise(
      (resolve, reject) => {
        // Appel Asynchrone à l'API Slim
        this.http.get(url).subscribe(
          (response) => {
            resolve(response.json());
          },
          (error) => reject(error)
        );
      }
    );
  }

  applyToMission(postData:any) {
    var url = Config.URL + '/ar/add';
    return new Promise(
      (resolve, reject) => {
        this.http.post(url, postData).subscribe(
          (response) => {
            resolve(response.json());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
