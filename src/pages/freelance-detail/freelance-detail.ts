import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FreelanceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-freelance-detail',
  templateUrl: 'freelance-detail.html',
})
export class FreelanceDetailPage {
private image = ['architect.jpg', 'office62.jpg','card-sf.jpg','card-saopaolo.jpg'];
affImg: string;
freeDetail = {
  Image:'',
  Title:'',
  Body:'',
  Posted:'',
};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.freeDetail = navParams.get('parData');
    this.affImg = this.image[this.entierAleatoire(0,3)];
    console.log(this.freeDetail);
    
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
    console.log('ionViewDidLoad FreelanceDetailPage');
  }

}
