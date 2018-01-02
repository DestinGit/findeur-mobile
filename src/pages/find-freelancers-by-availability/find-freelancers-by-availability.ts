import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
// import { DataClassProvider } from '../../providers/data-class/data-class';
import { FreelanceProvider } from '../../providers/freelance/freelance';

/**
 * Generated class for the FindFreelancersByAvailabilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-freelancers-by-availability',
  templateUrl: 'find-freelancers-by-availability.html',
})
export class FindFreelancersByAvailabilityPage {

  freelances: any;

  isAndroid: boolean = false;
  toppings: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,
  public freelanceProvider: FreelanceProvider) {
    // this.isAndroid = platform.is('android');
    this.initializeItems();
  }

  initializeItems() {
    this.freelanceProvider.getFreelances().then(
      (data) => {
         this.freelances = data;
      }
    );

   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindFreelancersByAvailabilityPage');
  }

}
