// import { Component, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import {
  NavController, NavParams, ModalController, Modal,
  ModalOptions, Events, AlertController, Loading, LoadingController, Toast, ToastController
} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilPage } from './../profil/profil';
import { UserProvider } from '../../providers/user/user';
import { FreelanceProvider } from '../../providers/freelance/freelance';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  businessMissions: any;
  isThereNoData = false;
  message: string;
  private loading: Loading;
  private toast: Toast;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public userProvider: UserProvider,
    private alertCtrl: AlertController, public events: Events,
    private freelanceProvider: FreelanceProvider, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

    // Show loading
    this.presentLoadingDefault();
    
    // register for the event 'user.connection'
    events.subscribe('user.connection', () => this.whatClassIsIt());
  }

  ionViewDidLoad() {
    this.loadDatas();
  }



  coolSS(item: any) {
    // console.log(item);
    if (!this.userProvider.isAuthenticated()) {
      this.presentPrompt(item);
    } else {
      this.presentToast('Votre candidature pour la mission ' + item.Title + ' a bien été enregistrée');
      this.applyToMission(item);
    }
  }

  /**
   * Returns the name of the class for the ion-icon tag in order to assign the correct color 
   * for the user icon
   * @returns {string}
   */
  whatClassIsIt() {
    return (this.userProvider.isAuthenticated()) ? 'userColor-idendifer' : 'userColor-noconnect';
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
    myModal.onDidDismiss((data) => {
    }
    );

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


  presentAlertBox(messageData:object, buttonsArray:any, inputsArray:any) {
    
    let myTitle = (typeof messageData != 'undefined' && messageData !== null && messageData.hasOwnProperty('title'))
     ? messageData['title'] : null;

    let alert = this.alertCtrl.create({
      title: myTitle,
      message: (typeof messageData != 'undefined' && messageData !== null && messageData.hasOwnProperty('message')) 
      ? messageData['message'] : null,

      enableBackdropDismiss: false,
      inputs: (typeof inputsArray != 'undefined' && inputsArray !== null) 
      ? inputsArray : null,
      buttons: (typeof buttonsArray != 'undefined' && buttonsArray !== null) 
      ? buttonsArray : [{text: 'Ok'}]
    });
    alert.present();

  }

  /**
   * Show Alert dialog box
   * An Alert is a dialog that presents users with information or 
   * collects information from the user using inputs.
   * @param item 
   */
  presentPrompt(item: any) {
    let alert = this.alertCtrl.create({
      title: '<h2>Connexion</h2>',
      message: 'Veuillez vous identifier pour pouvoir postuler à la mission : <h5>' + item.Title + '</h5>',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'username',
          placeholder: 'Votre identifiant findeur'
        },
        {
          name: 'password',
          placeholder: 'Votre mot de passe',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: (data) => {            
            this.validateButtonHandler(data, item);
          }
        }
      ]
    });
    alert.present();
  }

  validateButtonHandler(data:any, item:any) { 
    this.userProvider.signIn(data)
      .then((res: any) => {
        console.log(res);
        if (res.success) {
          this.events.publish('user.connection', res.success);
          this.applyToMission(item);                 
        } else {
          this.coolSS(item);   
        }
      })
      .catch((err) => {
        return false;
      });
  }

  applyToMission(item: any) {
    item['user'] = this.userProvider.getUser()['name'];
    this.freelanceProvider.applyToMission(item)
        .then((res)=>console.log(res))
        .catch((err) => console.log(err));
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
   * Recovering data from the database
   */
  loadDatas() {
    this.freelanceProvider.getListOfMissionsToApply(this.entierAleatoire(50, 70))
      .then((data) => {
        this.businessMissions = data;
        console.log(data);
        this.isThereNoData = !this.businessMissions.length;
        this.message = 'Désolé, aucun résultat ne correspond à vos critères de recherche.';

        this.loading.dismiss();
      })
      .catch(() => {
        this.isThereNoData = true;
        this.message = 'Échec de la connexion. Vérifier vos paramètres de réseau';

        this.loading.dismiss();
      });
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

}
