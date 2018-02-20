// import { FreelanceProvider } from './../../providers/freelance/freelance';
// import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController, Events } from 'ionic-angular';
// import { LoginPage } from '../login/login';

/**
 * Generated class for the NewArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-article',
  templateUrl: 'new-article.html',
})
export class NewArticlePage {
  public mobility: string;
  public categorie: string;
  public county: string;

  public index: Number = -1;

  public articleData: {
    // Posted: Date,
    Title: string,
    Category1: string, // departement
    Keywords: string,  // metiers
    Body: string,     // texte
    custom_3: string, // mobilité
  };

  catAlertOpts: { title: string, subTitle: string };
  countyAlertOpts: { title: string, subTitle: string };
  mobilityAlertOpts: { title: string, subTitle: string };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, public modalCtrl: ModalController,
    private viewCtrl: ViewController, public events: Events ) {
    // init some vars
    this.initializeVars();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  initializeVars() {
    this.catAlertOpts = {
      title: 'Métiers',
      subTitle: 'Sélectionnez les métiers'
    };

    this.countyAlertOpts = { title: 'Département de chalendise', subTitle: 'Sélectionnez le département' }
    this.mobilityAlertOpts = { title: 'Mobilité', subTitle: 'Sélectionnez la mobilité' };

    this.articleData = this.navParams.get('article');
    this.index = this.navParams.get('index');

    console.log('this.articleData');
    console.log(this.articleData);
    
  }

  stpSelect() {
    // console.log(`STP selected : ${this.categorie}`);
  }

  saveArticle() {
    let params = {
      article: this.articleData,
      index: this.index
    };

    if (this.index >= 0) {
      // publier un event update si index existe
      this.events.publish('project.update', JSON.stringify(params));
    } else {
      // publier un event créer si index n'existe pas
      this.events.publish('project.create', JSON.stringify(params));
    }

    // Retour à la page précédente
    this.navCtrl.pop();
  }

  getDate() {
    let date1 = new Date();
    return `${date1.getFullYear()}-${date1.getMonth()+1}-${date1.getDate()} ${date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()}`;
  }
  
  showAlert(title: string, subTitle: string, callback) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: 'OK', handler: (data) => { callback(); } }]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewArticlePage');
  }

}
