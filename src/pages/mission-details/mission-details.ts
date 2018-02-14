import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MissionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mission-details',
  templateUrl: 'mission-details.html',
})
export class MissionDetailsPage {
  private image = ['architect.jpg', 'office62.jpg', 'card-sf.jpg', 'card-saopaolo.jpg'];
  affImg: string;
  freeDetail = {
    Image: '',
    Title: '',
    Body: '',
    Posted: '',
  };
  userName: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userProvider: UserProvider) {
    this.freeDetail = navParams.get('parData');
    this.affImg = this.image[this.entierAleatoire(0, 3)];

    if (userProvider.isAuthenticated()) {
      this.userName = userProvider.getUser().name;
    }
  }


  /**
   * Return a random number
   * @param {number} min
   * @param {number} max 
   * @returns {number}
   */
  entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  ionViewDidLoad() {
  }

}
