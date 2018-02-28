import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FreelanceProvider } from '../../providers/freelance/freelance';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the UserProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profil',
  templateUrl: 'user-profil.html',
})
export class UserProfilPage {
  private image = ['architect.jpg', 'office62.jpg','card-sf.jpg','card-saopaolo.jpg'];
affImg: string;
  freeDetail = {
    Image:'',
    Title:'',
    Body:'',
    Posted:'',
    custom_4:''
  };
   
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private callNumber: CallNumber,
    public freelanceProvider: FreelanceProvider) {
    let freelanceName = navParams.get('name');
      freelanceProvider.getOnePersonalBusiness({name: freelanceName})
      .then((data) => {
        console.log(data);
        let tmp: any = data;
        this.freeDetail = tmp;
      })
      .catch((err) => console.log('error c'));

      this.affImg = this.image[this.entierAleatoire(0,3)];
  }

  contactFreelanceByPhone() {
    if (this.freeDetail.custom_4) {
      this.callNumber.callNumber(this.freeDetail.custom_4, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
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
    console.log('ionViewDidLoad UserProfilPage');
  }

}
