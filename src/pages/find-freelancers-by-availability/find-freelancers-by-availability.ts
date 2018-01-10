import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Modal, ModalOptions, ModalController, LoadingController, Loading } from 'ionic-angular';
// import { DataClassProvider } from '../../providers/data-class/data-class';
import { FreelanceProvider } from '../../providers/freelance/freelance';
import { Events } from 'ionic-angular/util/events';
import { LoginPage } from '../login/login';
import { ProfilPage } from '../profil/profil';

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
  public freelancesData: any;
  public isThereNoData = false;
  public message: string;
  private loading: Loading;

  freelances: any;

  isAndroid: boolean = false;
  toppings: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public events: Events,
    public freelanceProvider: FreelanceProvider,
    public userProvider: UserProvider) {
    // this.isAndroid = platform.is('android');
    this.initializeItems();

    events.subscribe('user.connection', () => this.whatClassIsIt());
  }

  whatClassIsIt() {
    return (this.userProvider.isAuthenticated()) ? 'userColor-idendifer' : 'userColor-noconnect';
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

  initializeItems() {
    this.freelanceProvider.getFreelances().then(
      (data) => {
        this.freelances = data;
      }
    );

  }

  entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ionViewDidLoad() {
    let nb = this.entierAleatoire(0, 250);
    this.presentLoadingDefault();
    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(nb).then((data) => {
      this.freelancesData = data;
      this.isThereNoData = !this.freelancesData.length;
      this.message = 'Désolé, aucun résultat ne correspond à vos critères de recherche.';
      this.loading.dismiss();
    }).catch((err) => {
      this.isThereNoData = true;
      this.message = 'Échec de la connexion. Vérifier vos paramètres de réseau';
      this.loading.dismiss();
    });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Patientez svp ...'
    });

    this.loading.present();
  }
}
