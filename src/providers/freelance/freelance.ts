//import { HttpClient } from '@angular/common/http';
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

  constructor(private storage: Storage) {}

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
}
