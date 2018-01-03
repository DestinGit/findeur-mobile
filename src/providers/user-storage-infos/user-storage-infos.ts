import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserStorageInfosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserStorageInfosProvider {

  private userStorageInfos: any;

  constructor(private storage: Storage) {}

  getUserStorageInfos() {
    return new Promise((resolve, reject) => {
      this.storage.get('user.infos')
      .then((data) => {
        resolve(JSON.parse(data));
      })
      .catch((err) => reject('Error lors de la récupération des datas : ' + err));
    });
  }

  setUserStorageInfos(data:any) {
    this.userStorageInfos = data;
    this.storage.set('user.infos', JSON.stringify(this.userStorageInfos));
  }

  initializeUserStorageInfos() {
    this.userStorageInfos = {};
    this.storage.remove('user.infos');
  }

}
