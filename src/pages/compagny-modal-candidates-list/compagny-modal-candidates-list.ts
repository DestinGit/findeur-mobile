import { UserProfilPage } from './../user-profil/user-profil';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController } from 'ionic-angular';

/**
 * Generated class for the CompagnyModalCandidatesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compagny-modal-candidates-list',
  templateUrl: 'compagny-modal-candidates-list.html',
})
export class CompagnyModalCandidatesListPage {
  public candidatesList: any = [];
  
  constructor(private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.candidatesList = navParams.get('candidates');
  }

  closeModal(item?:any) {
    const projectSelected = item;
    this.view.dismiss(projectSelected);
  }

  goToUserAnnonce(name:any) {
    this.navCtrl.push(UserProfilPage, {name: name});
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CompagnyModalCandidatesListPage');
  }

}
