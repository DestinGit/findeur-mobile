import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';
import { UserStorageInfosProvider } from '../../providers/user-storage-infos/user-storage-infos';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  monUser = {
    first_name: '',
    last_name: '',
    name: '',
    RealName: '',
    phone: '',
    email: '',
    privs: '',
    detail: ''
  };
  activity: string = 'Indépendant';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    public userInfos: UserProvider, private userStorageProvider: UserStorageInfosProvider,
    public events: Events) {

    this.monUser = userInfos.getUser();
    // console.log(userInfos.getUser());
    if (this.monUser.privs === '4') {
      this.activity = 'Entreprise';
    }
  }

  disconnect() {
    this.userInfos.signOut().then((status) => {
      this.events.publish('user.connection', false);
      // reset the storage provider
      this.userStorageProvider.initializeUserStorageInfos();
      this.dismiss();
    });
  }

  dismiss() {
    this.viewCtrl.dismiss({});
  }

  ionViewWillLoad() {
    // let data = this.navParams.get('data');
    // console.log(data);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ProfilPage');
  }

}
