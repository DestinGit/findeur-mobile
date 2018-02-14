import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalDataProvider {

  constructor(private storage: Storage) {
    console.log('Hello LocalDataProvider Provider');
  }

  setFreelanceSelection(data:any) {
    this.storage.set('freelance:select', JSON.stringify(data));
  }

  getFreelanceSelection() {
    return new Promise((resolve, reject) => {
      this.storage.get('freelance:select')
      .then((data) => {
        resolve(JSON.parse(data));
      })
      .catch((err) => reject('Error lors de la récupération des datas : ' + err));
    });    
  }

  resetFreelanceSelection() {
    this.storage.remove('freelance:select');
  }
}
