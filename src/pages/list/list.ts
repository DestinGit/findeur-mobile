import { CategoryProvider } from './../../providers/category/category';
import { MissionDetailsPage } from './../mission-details/mission-details';
// import { Component, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import {
  NavController, NavParams, ModalController, Modal,
  ModalOptions, Events, Loading, LoadingController, Toast, ToastController, AlertController
} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilPage } from './../profil/profil';
import { UserProvider } from '../../providers/user/user';
import { FreelanceProvider } from '../../providers/freelance/freelance';
// import { Storage } from '@ionic/storage';
// import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  // private requestParams = { results: 4, me: false, Keywords: '', fromCrDat: '' };
  private lastFromCrDateValue: string = '';
  // private lastFrCrDateMyCandidature: string = '';
  private loading: Loading;
  private toast: Toast;

  businessMissions: any;
  myCandidatures: any;
  isThereNoData = false;
  message: string;
  userName: string = null;
  filter = 'all';
  missions: any;
  kills = [];
  myFavorites = [];
  isenabledFavorites: boolean = true;

  ionSelectSkills: any = [{ name: '', title: '' }];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController, public userProvider: UserProvider, public events: Events,
    private freelanceProvider: FreelanceProvider, private category: CategoryProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    // Show loading
    this.presentLoadingDefault();

    this.loadSkills();

    // register for the event 'user.connection'
    events.subscribe('user.connection', () => this.whatClassIsIt());

    this.myCandidatures = this.businessMissions = [];
  }

  goToMissionDetails(item: any) {
    let params = {
      parData: item
    };
    this.navCtrl.push(MissionDetailsPage, params);
  }

  /** 
   * When View did load, load first datas
  */
  ionViewDidLoad() {
    this.loadDatas();
  }

  /** 
   * Handler for segment selection
  */
  getFilteredMissions() {
    switch (this.filter) {
      case 'all':
        // this.requestParams.results = 4;
        // this.requestParams.me = false;
        if (!this.businessMissions.length) {
          this.loadDatas();
        } else {
          this.missions = this.businessMissions;
        }
        break;
      case 'done':
        // this.requestParams.results = 400;
        // this.requestParams.me = true;
        if (!this.myCandidatures.length) {
          this.loadCandidatures();
        } else {
          this.missions = this.myCandidatures;
        }
        break;
      case 'favorites': this.missions = (!this.kills.length) ?
        this.myFavorites : this.getFilteredFavorites(this.kills);
        break;

    }
  }

  loadSkills() {
    this.category.getAllSkills()
      .then((data) => this.ionSelectSkills = data)
      .catch((error) => console.error());
  }

  /**
 * Recovering data from the database
 */
  loadDatas() {
    let params: any = {
      me: false,
      Keywords: this.kills.join(',')
    };

    this.freelanceProvider.getMissionsList(params)
      .then((data) => {
        this.missions = this.businessMissions = data;
        let sizeOfData = this.businessMissions.length;
        // S'il y a des datas, je sauvegarde la dernière date de création
        if (sizeOfData) {
          this.lastFromCrDateValue = data[sizeOfData - 1]['Posted'];
        }
        this.loading.dismiss();
      })
      .catch(() => this.loading.dismiss());
  }

  /**
   * Load Candidatures datas
   */
  loadCandidatures() {
    // If user not connected
    if (this.filter === 'done' && !this.userProvider.isAuthenticated()) {
      this.myCandidatures = this.missions = [];
      return;
    }
    // Otherwise, we perform request
    // this.requestParams.me = true;
    let params: any = {
      me: true,
      Keywords: this.kills.join(','),
    };
    this.freelanceProvider.getMissionsList(params)
      .then((data) => {
        this.missions = this.myCandidatures = data;
      })
      .catch((err) => {
        this.myCandidatures = this.missions = [];
      });
  }

  /**
   * Load more datas (pull up)
   * @param evt 
   */
  loadMoreDatas(evt) {
    if (this.filter === 'favorites') {
      evt.complete();
      return;
    }

    // If user not connected
    if (this.filter === 'done' && !this.userProvider.isAuthenticated()) {
      this.myCandidatures = this.missions = [];
      evt.complete();
      return;
    }
    // Otherwise, we perform request
    // Si je suis sur le segment list des missions
    let params: any = {
      results: 4,
      Keywords: this.kills.join(','),
      me: (this.filter === 'all') ? false : true,
      fromCrDat: (this.filter === 'all') ? this.lastFromCrDateValue : ''
    };

    // if (this.filter === 'all') {
    //   params['fromCrDat'] = this.lastFromCrDateValue;
    // }

    // Perform request
    this.freelanceProvider.getMissionsList(params)
      .then((data) => {
        let tmp: any = data;
        let sizeOfData = tmp.length;
        // S'il y a des datas et que je suis sur le segment liste des missions
        // je sauvegarde la dernière date de création
        if (sizeOfData && this.filter === 'all') {
          this.lastFromCrDateValue = data[sizeOfData - 1]['Posted'];
        }

        switch (this.filter) {
          case 'all': this.missions = this.businessMissions = this.businessMissions.concat(data); break;
          case 'done': this.missions = this.myCandidatures = data; break;
        }

        evt.complete();
      })
      .catch(() => evt.complete());
  }

  /**
   * Refresh datas on screen
   */
  refreshScreen(evt) {
    if (this.filter === 'favorites') {
      evt.complete();
      return;
    }
    // If user not connected
    if (this.filter === 'done' && !this.userProvider.isAuthenticated()) {
      this.myCandidatures = this.missions = [];
      evt.complete();
      return;
    }
    let params: any = {
      me: false,
      Keywords: this.kills.join(',')
    };

    this.freelanceProvider.getMissionsList(params)
      .then((data) => {
        let tmp: any = data;
        let sizeOfData = tmp.length;
        if (sizeOfData && this.filter === 'all') {
          this.lastFromCrDateValue = tmp[sizeOfData - 1]['Posted'];
        }

        switch (this.filter) {
          case 'all': this.missions = this.businessMissions = tmp; break;
          case 'done': this.missions = this.myCandidatures = tmp; break;
        }

        evt.complete();
      })
      .catch(() => evt.complete());
  }

  /**
   * Handle apply to mission by the user or open a connexion modal if user is not connected
   * @param item 
   */
  handlerApplyToMissionButton(item: any) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    if (!this.userProvider.isAuthenticated()) {
      // Lancement de la fenêtre modal
      let myModal: Modal = this.modalCtrl.create(LoginPage, {}, myModalOptions);
      myModal.present();
      // Handler de l'évènement fermeture de la modal
    } else if (this.userProvider.getUser().privs === "4") {
      this.showAlert('Postuler Echec!', 'Vous êtes une entreprise', () => { });
    } else {
      this.applyToMission(item);
    }
  }

  /**
   * Handler for the favorites button
   * @param item 
   */
  handlerAddToMyFavoritesButton(item: any) {
    let check = this.myFavorites.findIndex((element) => item.ID === element.ID);
    let message: string;

    if (check === -1) {
      message = 'Selection de la mission : OK';
      this.myFavorites.push(item);
    } else {
      message = 'Vous avez déjà selectionné cette mission';
    }

    this.presentToast(message);
    // Disable favorites button by its Id attribute
    this.disableElmtById(`favorites_${item.ID}`);
  }

  /**
   * Disable DOM Element by its Id attribute
   * @param idElmt 
   */
  private disableElmtById(idElmt: string) {
    (<HTMLInputElement>document.getElementById(idElmt)).disabled = true;
  }

  /**
   * Returns the name of the class for the ion-icon tag in order to assign the correct color 
   * for the user icon
   * @returns {string}
   */
  whatClassIsIt() {
    this.userName = (this.userProvider.isAuthenticated()) ? this.userProvider.getUser().name : null;
    return (this.userProvider.isAuthenticated()) ? 'userColor-idendifer' : 'userColor-noconnect';
  }

  /** 
   * Select Option filter
  */
  selectOptionItemSelected() {
    console.log('selectOptionItemSelected');
    console.log(this.filter);


    switch (this.filter) {
      case 'all': this.loadDatas(); break;
      case 'done': this.loadCandidatures(); break;
      case 'favorites': this.missions = (!this.kills.length) ?
        this.myFavorites : this.getFilteredFavorites(this.kills);
        break;
    }
  }

  /**
   * Filterd Favorites
   * @param tmpKeywords 
   */
  private getFilteredFavorites(tmpKeywords: any[]) {
    return this.myFavorites.filter((element) => {
      let ret = tmpKeywords.some((item) => {
        return element.Keywords.search(item) > -1;
      });
      if (ret) {
        return element;
      }
    });
  }

  /**
    * Opening the Login or Profile page depending on whether the user is authenticated or not
    */
  openLogOrProfilPage() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const data = { 'toto': true, 'titi': 'tata' };
    // User est authentifié ?
    let myPageView = (!this.userProvider.isAuthenticated()) ? LoginPage : ProfilPage;

    // Lancement de la fenêtre modal
    let myModal: Modal = this.modalCtrl.create(myPageView, { 'data': data }, myModalOptions);
    myModal.present();

    // Handler de l'évènement fermeture de la modal
    myModal.onDidDismiss((data) => { });
  }

  /**
   * Show a Toast notification
   * A Toast is a subtle notification commonly used in modern applications. 
   * @param viewTxt 
   */
  presentToast(viewTxt: string) {
    this.toast = this.toastCtrl.create({
      message: viewTxt,
      duration: 3000
    });
    this.toast.present();
  }

  /**
   * Perform the application to a mission
   * @param item
   */
  applyToMission(item: any) {
    this.freelanceProvider.applyToMission(item)
      .then((res) => {
        if ('status' in res && res['status']) {
          this.presentToast(`Votre candidature pour la mission ${item.Title} a bien été enregistrée`);
          // Disable application button by its Id attribute
          this.disableElmtById(`apply_${item.ID}`);
        }
      })
      .catch((err) => {
        this.presentToast(`Désolé ! Votre candidature pour la mission :
                            ${item.Title} n'a pas été prise en compte.`);
      });
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

  /**
   * Show Loading
   * An overlay that can be used to indicate activity while blocking user interaction. 
   */
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Patientez svp ...'
    });

    this.loading.present();
  }

  /**
   * 
   * @param title 
   * @param subTitle 
   * @param callback 
   */
  showAlert(title: string, subTitle: string, callback) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: 'OK', handler: (data) => { callback(); } }]
    });
    alert.present();
  }

}





















// presentAlertBox(messageData: object, buttonsArray: any, inputsArray: any) {

//   let myTitle = (typeof messageData != 'undefined' && messageData !== null && messageData.hasOwnProperty('title'))
//     ? messageData['title'] : null;

//   let alert = this.alertCtrl.create({
//     title: myTitle,
//     message: (typeof messageData != 'undefined' && messageData !== null && messageData.hasOwnProperty('message'))
//       ? messageData['message'] : null,

//     enableBackdropDismiss: false,
//     inputs: (typeof inputsArray != 'undefined' && inputsArray !== null)
//       ? inputsArray : null,
//     buttons: (typeof buttonsArray != 'undefined' && buttonsArray !== null)
//       ? buttonsArray : [{ text: 'Ok' }]
//   });
//   alert.present();

// }

// /**
//  * Show Alert dialog box
//  * An Alert is a dialog that presents users with information or 
//  * collects information from the user using inputs.
//  * @param item 
//  */
// presentPrompt(item: any) {
//   let alert = this.alertCtrl.create({
//     title: '<h2>Connexion</h2>',
//     // cssClass:'alertClass',
//     // message: 'Veuillez vous identifier pour pouvoir postuler à la mission : <h5>' + item.Title + '</h5>',
//     enableBackdropDismiss: false,
//     inputs: [
//       {
//         name: 'username',
//         placeholder: 'Votre identifiant findeur'
//       },
//       {
//         name: 'password',
//         placeholder: 'Votre mot de passe',
//         type: 'password'
//       }
//     ],
//     buttons: [
//       {
//         text: 'Annuler',
//         role: 'cancel',
//         handler: data => {
//           console.log('Cancel clicked');
//         }
//       },
//       {
//         text: 'Valider',
//         handler: (data) => {
//           this.validateButtonHandler(data, item);
//         }
//       }
//     ]
//   });

//   alert.present();
// }

// validateButtonHandler(data: any, item: any) {
//   this.userProvider.signIn(data)
//     .then((res: any) => {
//       console.log(res);
//       if (res.success) {
//         this.events.publish('user.connection', res.success);
//         this.applyToMission(item);
//       } else {
//         this.coolSS(item);
//       }
//     })
//     .catch((err) => {
//       return false;
//     });
// }
