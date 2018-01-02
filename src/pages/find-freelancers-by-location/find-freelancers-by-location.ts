import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FreelanceProvider } from '../../providers/freelance/freelance';

/**
 * Generated class for the FindFreelancersByLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-freelancers-by-location',
  templateUrl: 'find-freelancers-by-location.html',
})
export class FindFreelancersByLocationPage {
   freelances: any;
  //freelances: any;

  isAndroid: boolean = false;
  searchQuery: string = '';
  items: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,
  public freelanceProvider: FreelanceProvider) {
    // this.isAndroid = platform.is('android');
    this.initializeItems();
  }

  initializeItems() {
    this.freelanceProvider.getFreelances().then(
      (data) => {
         this.freelances = data;
        console.log(data);
      }
    );
  }

/*   getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
 */  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FindFreelancersByLocationPage');
  }

}
