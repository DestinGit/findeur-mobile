import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchCompagnyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-compagny',
  templateUrl: 'search-compagny.html',
})
export class SearchCompagnyPage {
  
pet = "metier";
freelances = [{
  image:'../assets/img/freelance/business-man.png',
  title:'Nine Inch Nails Live Montréal',
  description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
  job:'Developpeur backend',
  location: 'Paris',
  available:'now'
}, {
  image:'../assets/img/freelance/computer.jpg',
  title:'Nine Inch Nails Live Paris',
  description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
  job:'Developpeur frontend',
  location: 'Marseille',
  available:'tomorrow'
}, {
  image:'../assets/img/freelance/manager.jpg',
  title:'Nine Inch Nails Live Tokyo',
  description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
  job:'Fleuriste',
  location: 'Paris',
  available:'next week'
}, {
  image:'../assets/img/freelance/ruitenwas.jpg',
  title:'Nine Inch Nails Live New York',
  description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
  job:'Electricien',
  location: 'Paris',
  available:'now'
}, {
  image:'../assets/img/freelance/ruitenwas.jpg',
  title:'Nine Inch Nails Live New York',
  description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
  job:'Secretaire',
  location: 'Marseille',
  available:'tomorrow'
}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchCompagnyPage');
  }

}
