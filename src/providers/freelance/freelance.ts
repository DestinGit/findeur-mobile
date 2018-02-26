import { UserProvider } from './../user/user';
import { Config } from './../../app/app.module';
import { Http, Headers, RequestOptions } from '@angular/http';
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

  constructor(private storage: Storage, public http: Http, private userProvider: UserProvider) { }

  getFreelances() {
    return new Promise((resolve) => {
      this.storage.get('freelances').then((data) => {
        if (data) {
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


/**
 * 
 * @param {object} params 
 * @returns {string} parametersString
 */
  private getStringParameters(params:{}) {
    var parametersString = '', i = 0;
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key].length != 0) {
        parametersString = (i == 0) ? `?${key}=${params[key]}` : `${parametersString}&${key}=${params[key]}`;
        i = 1;
      }
    }
    return parametersString;
  }

  getPersonalBusiness(args: any) {
    let strParams = this.getStringParameters(args);
    var url = `${Config.URL}/get/freelance-list${strParams}`;

    return new Promise(
      (resolve, reject) => {
        // Appel Asynchrone à l'API Slim
        this.http.get(url, args).subscribe(
          (response) => {
            resolve(response.json());
          },
          (error) => reject(error.json())
        );
      }
    );
  }

  getOnePersonalBusiness(args: any) {
    let strParams = this.getStringParameters(args);
    var url = `${Config.URL}/get/freelance${strParams}`;

    return new Promise(
      (resolve, reject) => {
        // Appel Asynchrone à l'API Slim
        this.http.get(url, args).subscribe(
          (response) => {
            resolve(response.json());
          },
          (error) => reject(error.json())
        );
      }
    );
  }

  getMissionsList(params: any) {
    let strParams = this.getStringParameters(params);
    var url = ('me' in params && params.me) ? 
    `${Config.URL}/secure/mycandidatures-list${strParams}` : `${Config.URL}/get/missions-list${strParams}`;
console.log(url);

    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.userProvider.getToken()}`);

    var options = ('me' in params && params.me) ? 
    new RequestOptions({ headers: headers }) : {};

    return new Promise(
      (resolve, reject) => {
        // Appel Asynchrone à l'API Slim
        this.http.get(url, options).subscribe(
          (response) => {
            resolve(response.json());
          },
          (error) => {
            console.log('error');
            
            reject(error);
          }
        );
      }
    );   
  }

  getMyProjectsList(params:any) {
    let strParams = this.getStringParameters(params);
    var url = `${Config.URL}/secure/myprojects-list${strParams}`;

    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.userProvider.getToken()}`);

    var options = new RequestOptions({ headers: headers });

    return new Promise(
      (resolve, reject) => {
        // Appel Asynchrone à l'API Slim
        this.http.get(url, options).subscribe(
          (response) => {
            resolve(response.json());
          },
          (error) => {
            console.log('error');
            
            reject(error);
          }
        );
      }
    );   

  }

  getListOfMissionsToApply(args: any) {
    let strParams = this.getStringParameters(args);
    var url = `${Config.URL}/get/missions-list${strParams}`;

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

  applyToMission(postData: any) {
    var url = Config.URL + '/secure/applytomission';
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.userProvider.getToken()}`);
    var options = new RequestOptions({ headers: headers });

    return new Promise(
      (resolve, reject) => {
        this.http.post(url, postData, options).subscribe(
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



  addNewMission(data: any) {
    var url = Config.URL + '/secure/registermission';
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.userProvider.getToken()}`);
    var options = new RequestOptions({ headers: headers });

    return new Promise(
      (resolve, reject) => {
        this.http.post(url, data, options).subscribe(
          (response) => { resolve(response.json()) },
          (error) => { reject(error); },
          () => { }
        );
      }
    );
  }


}
