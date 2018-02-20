import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CompagnyProjectsPage } from './../compagny-projects/compagny-projects';
import { FindFreelancersBySkillPage } from '../find-freelancers-by-skill/find-freelancers-by-skill';
import { FindFreelancersByAvailabilityPage } from './../find-freelancers-by-availability/find-freelancers-by-availability';

/**
 * Generated class for the MyTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-tabs',
  templateUrl: 'my-tabs.html',
})
export class MyTabsPage {
  tabsHome: any;
  tabsAvailable: any;
  tabsProjects: any;
  tabsSkill: any;

  className = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.tabsHome = HomePage;
      this.tabsSkill = FindFreelancersBySkillPage;
      this.tabsProjects = CompagnyProjectsPage;
      this.tabsAvailable = FindFreelancersByAvailabilityPage;

      //this.className = navParams.get('val') ? true:false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTabsPage');
  }

}
