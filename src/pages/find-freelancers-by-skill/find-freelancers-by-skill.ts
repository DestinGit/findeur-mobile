import { NewArticlePage } from './../new-article/new-article';
import { FreelanceDetailPage } from './../freelance-detail/freelance-detail';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  IonicPage, NavController, NavParams, Platform,
  Modal, ModalOptions, Events, ModalController, ToastController,
  Loading, LoadingController
} from 'ionic-angular';
import { FreelanceProvider } from '../../providers/freelance/freelance';
import { UserProvider } from '../../providers/user/user';
// import { UserStorageInfosProvider } from '../../providers/user-storage-infos/user-storage-infos';

import { LoginPage } from '../login/login';
import { ProfilPage } from './../profil/profil';
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
  public freelancesData: any;
  public isThereNoData = false;
  public message: string;
  private loading: Loading;

  freelances: any;
  dataUser: any;

  isAndroid: boolean = false;
  // business: any;
  // params: { results: number, Keywords: any };
  public kills = [];
  public requestParams = { results: 400, Keywords: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,
    public storage: Storage,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController, public toastCtrl: ToastController,
    public freelanceProvider: FreelanceProvider, public userProvider: UserProvider,
    public events: Events) {
    //this.isAndroid = platform.is('android');
    this.initializeItems();

    // this.params = {results:400, Keywords:false};

    events.subscribe('user.connection', () => this.whatClassIsIt());

    this.presentLoadingDefault();
  }

  goToNewArticlePage() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };


    if (!this.userProvider.isAuthenticated()) {
      // Lancement de la fenêtre modal
      let myModal: Modal = this.modalCtrl.create(LoginPage, {}, myModalOptions);
      myModal.present();

    } else {
      this.navCtrl.push(NewArticlePage).then(() => { });
    }
  }

  whatClassIsIt() {
    return (this.userProvider.isAuthenticated()) ? 'userColor-idendifer' : 'userColor-noconnect';
  }

  itemSelected(item: any) {
    // console.log(item);
    let params = {
      parData: item
    };
    this.navCtrl.push(FreelanceDetailPage, params);
  }


  initializeItems() { }

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
    let myPageView = (!this.userProvider.isAuthenticated()) ? LoginPage : ProfilPage;

    // Lancement de la fenêtre modal
    let myModal: Modal = this.modalCtrl.create(myPageView, { 'data': data }, myModalOptions);
    myModal.present();

    // Handler de l'évènement fermeture de la modal
    myModal.onDidDismiss((data) => {
    }
    );

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

  entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Patientez svp ...'
    });

    this.loading.present();
  }

  killsSelected() {
    // console.log(this.kills);

    this.requestParams.Keywords = this.kills.join(',');
    this.loadDatas(); 
  }

  ionViewDidLoad() {
    this.loadDatas();
  }

  loadDatas() {
    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(this.requestParams)
      .then((data) => {
        this.freelancesData = data;
        this.isThereNoData = !this.freelancesData.length;
        this.message = 'Désolé, aucun résultat ne correspond à vos critères de recherche.';
console.log(this.freelancesData);

        this.loading.dismiss();
      })
      .catch((err) => {
        this.isThereNoData = true;
        this.message = 'Échec de la connexion. Vérifier vos paramètres de réseau';

        this.loading.dismiss();
      });
  }

  loadMoreDatas(evt) {
    console.log(this.requestParams);
    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(this.requestParams)
      .then((data) => {
        let tmp: any = data;
        this.isThereNoData = !tmp.length;
        this.freelancesData = this.freelancesData.concat(data);
        evt.complete();
      })
      .catch((err) => {
        evt.complete();
      });
  }

  doRefresh(evt) {
    console.log(this.requestParams);
    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(this.requestParams)
      .then((data) => {
        let tmp: any = data;
        this.isThereNoData = !tmp.length;
        this.freelancesData = tmp.concat(this.freelancesData);
        evt.complete();
      })
      .catch((err) => { evt.complete(); });
  }

}
