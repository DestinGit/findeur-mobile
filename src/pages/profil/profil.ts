import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss({});
  }

  ionViewWillLoad() {
    let data = this.navParams.get('data');
    console.log(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
