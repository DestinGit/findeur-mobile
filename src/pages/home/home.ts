// import { SearchCompagnyPage } from './../search-compagny/search-compagny';
import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyTabsPage } from '../my-tabs/my-tabs';
import { FreelanceProvider } from '../../providers/freelance/freelance';
import { DataClassProvider } from '../../providers/data-class/data-class';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  isAndroid: boolean = true;
  className="hideBloc";

  constructor(public navCtrl: NavController, platform: Platform, public storage: Storage, 
  public dataTmpFree: DataClassProvider,
  public freelanceProvider: FreelanceProvider) {
    // this.isAndroid = platform.is('android');  
// storage.clear();
      // this.initData();

    }

  initData() {
    let data = this.dataTmpFree.getAllUsers();
    data.forEach((item) => {
      this.freelanceProvider.addFreelance(item);
    });
  }

  doClick(evt, goToPage) {
    if(goToPage == 0) {
      this.navCtrl.push(ListPage);
    } else {
      this.navCtrl.push(MyTabsPage);
    }
  }
}
