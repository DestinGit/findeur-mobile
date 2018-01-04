import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, Platform, Modal, ModalOptions, Events } from 'ionic-angular';
import { FreelanceProvider } from '../../providers/freelance/freelance';
import { UserProvider } from '../../providers/user/user';
// import { UserStorageInfosProvider } from '../../providers/user-storage-infos/user-storage-infos';

import { ToastController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilPage } from './../profil/profil';
// import { Events } from 'ionic-angular/util/events';
// import { Modal } from 'ionic-angular/components/modal/modal';
// import { HomePage } from '../home/home';
// import { MyTabsPage } from './../my-tabs/my-tabs';
/**
 * Generated class for the FindFreelancersBySkillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-freelancers-by-skill',
  templateUrl: 'find-freelancers-by-skill.html',
})
export class FindFreelancersBySkillPage {
  public userColor = '';

  public freelancesData = [{
    Image: '',
    Section: '',
    Title: '',
    Excerpt: ''
  }];


  freelances: any;
  // freelances: Array<object> = [];
  dataUser: any;

  isAndroid: boolean = false;
  toppings: any;
  notifications: any;
  gaming: any;
  musicAlertOpts: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,
    public storage: Storage,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public freelanceProvider: FreelanceProvider,
    public userProvider: UserProvider,
    // public userInfosStorage: UserStorageInfosProvider,
    public events: Events) {
    //this.isAndroid = platform.is('android');
    this.initializeItems();

/*     // Récupération des données
    freelanceProvider.getPersonalBusiness().then((data) => console.log(data));
 */

    // Souscription à l'évènement de connexion ustilisateur
    events.subscribe('user.connection', (data) => {
      this.userColor = (data) ? 'primary' : '';
    });

    //this.storage.get('name').then((value) => console.log(value));

      // userInfosStorage.setUserStorageInfos({'nom': 'jambon', 'prenom': 'fromage'});
  }

  initializeItems() {

/*     this.freelanceProvider.getFreelances().then(
      (data) => {
        this.freelances = data;
      }
    );
 */
  }

  /**
   * Ouverture de la page Login ou Profil
   * suivant que l'utilisateur est authentifié ou pas
   */
  openLogOrProfilPage() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const data = { 'toto': true, 'titi': 'tata' };
    // User est authentifié ?
    // console.log(this.userProvider.isAuthenticated());
    let myPageView = (!this.userProvider.isAuthenticated()) ? LoginPage : ProfilPage;

    // Lancement de la fenêtre modal
    let myModal: Modal = this.modalCtrl.create(myPageView, { 'data': data }, myModalOptions);
    myModal.present();

    // console.log('Loginddfsdfd page');
    // Handler de l'évènement fermeture de la modal
    myModal.onDidDismiss((data) => {
      //console.log(data)
    }
    );

    // this.userInfosStorage.getUserStorageInfos().then((data) => console.log(data));
  }

  presentToast(viewTxt: string) {
    let toast = this.toastCtrl.create({
      message: viewTxt,
      duration: 3000
    });
    toast.present();
  }

  stpSelect() {
  }
  backToHomeButton() {
  }

  notificationSelect() {

  }

  ionViewDidLoad() {
        // Récupération des données
        this.freelanceProvider.getPersonalBusiness(10).then((data) => {
          this.freelancesData = data;
          console.log(data)
        });

    //console.log('ionViewDidLoad FindFreelancersBySkillPage');
    /*     this.freelances.forEach(element => {
        this.presentToast(element.image);      
        }); */
    //console.log(this.freelances);
  }

}
