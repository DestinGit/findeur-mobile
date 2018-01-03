import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular/util/events';

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
    first_name: 'Destin',
    name: 'Gando',
    RealName: '',
    phone: '',
    email: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,
    public userInfos: UserProvider,
    public events: Events) {

    this.monUser = userInfos.getUser();
    // console.log(userInfos.getUser());
  }

  disconnect() {
    this.userInfos.signOut().then((status) => {
      this.events.publish('user.connection', false);
      this.dismiss()
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
