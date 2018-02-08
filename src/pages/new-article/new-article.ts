import { FreelanceProvider } from './../../providers/freelance/freelance';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Modal, ModalOptions, ModalController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';

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
    private viewCtrl: ViewController,
    private userProvider: UserProvider, private freelanceProvider: FreelanceProvider) {
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

    this.articleData = {
      Title: '',
      Category1: '', // departement
      Keywords: '',  // metiers
      Body: '',     // texte
      custom_3: '', // mobilité    
    }

  }

  stpSelect() {
    // console.log(`STP selected : ${this.categorie}`);
  }

  addNewMission() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
        
    if (!this.userProvider.isAuthenticated()) {
      this.showAlert('envoi des datas', 'fait', () => { });
      // console.log(this.article);
      // Lancement de la fenêtre modal
      let myModal: Modal = this.modalCtrl.create(LoginPage, {}, myModalOptions);
      myModal.present();
    } else {
      this.articleData['Posted'] = this.getDate();
      this.articleData['AuthorID'] = this.userProvider.getUser()['name'];
      // console.log(this.articleData);
      this.freelanceProvider.addNewMission(this.articleData).then((res) => {
        if('error' in res) {
          let errMsg = res['message'].join();
          this.showAlert('<h5 class="error">Echec Nouvelle Annonce</h5>', errMsg, () => {});
        } else {
          this.showAlert('<h5 class="success">Nouvelle Annonce OK !</h5>', 'Votre annonce a bien été enregistrée',
           () => { this.dismiss(); });
        }
        console.log(res)
      })
      .catch((err) => console.log(err));
    }
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
