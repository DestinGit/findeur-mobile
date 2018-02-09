import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, Platform, Modal,
  ModalOptions, ModalController, LoadingController, Loading
} from 'ionic-angular';
import { FreelanceProvider } from '../../providers/freelance/freelance';
import { Events } from 'ionic-angular/util/events';
import { LoginPage } from '../login/login';
import { ProfilPage } from '../profil/profil';
import { NewArticlePage } from '../new-article/new-article';
import { FreelanceDetailPage } from '../freelance-detail/freelance-detail';

/**
 * Generated class for the FindFreelancersByLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-find-freelancers-by-location',
  templateUrl: 'find-freelancers-by-location.html',
})
export class FindFreelancersByLocationPage {
  public freelancesData: any;
  public isThereNoData = false;
  public message: string;
  private loading: Loading;

  freelances: any;
  //freelances: any;

  isAndroid: boolean = false;
  searchQuery: string = '';
  items: string[];

  public mobility = [];
  public requestParams = {results:400, mobility:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public events: Events,
    public freelanceProvider: FreelanceProvider,
    public userProvider: UserProvider) {
    // this.isAndroid = platform.is('android');
    this.initializeItems();

    events.subscribe('user.connection', () => this.whatClassIsIt('events : '));

    this.presentLoadingDefault();
  }

  itemSelected(item: any) {
    let params = {
      parData: item
    };
    this.navCtrl.push(FreelanceDetailPage, params);
  }

  whatClassIsIt(msg: any) {
    // console.log(msg + this.userProvider.isAuthenticated());
    return (this.userProvider.isAuthenticated()) ? 'userColor-idendifer' : 'userColor-noconnect';
  }

  goToNewArticlePage() {
    this.navCtrl.push(NewArticlePage).then(() => { });
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
    let myPageView = (!this.userProvider.isAuthenticated()) ? LoginPage : ProfilPage;

    // Lancement de la fenêtre modal
    let myModal: Modal = this.modalCtrl.create(myPageView, { 'data': data }, myModalOptions);
    myModal.present();

    // Handler de l'évènement fermeture de la modal
    myModal.onDidDismiss((data) => {
      //console.log(data)
    }
    );

  }

  initializeItems() {
    this.freelanceProvider.getFreelances().then(
      (data) => {
        this.freelances = data;
        // console.log(data);
      }
    );
  }

  /*   getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();
  
      // set val to the value of the searchbar
      let val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
   */

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

  mobilitiesSelected() {
    this.requestParams.mobility = this.mobility.join(',');
    this.loadDatas(); 
    console.log(this.mobility);
    
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

        this.loading.dismiss();
      })
      .catch((err) => {
        this.isThereNoData = true;
        this.message = 'Échec de la connexion. Vérifier vos paramètres de réseau';

        this.loading.dismiss();
      });
  }

  loadMoreDatas(evt) {
    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(this.requestParams)
      .then((data) => {
        let tmp:any = data;
        this.isThereNoData = !tmp.length;
        this.freelancesData = this.freelancesData.concat(data);
        evt.complete();
      })
      .catch((err) => { evt.complete(); });
  }

  doRefresh(evt) {
    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(this.requestParams)
      .then((data) => {
        let tmp:any = data;
        this.isThereNoData = !tmp.length;
        this.freelancesData = tmp.concat(this.freelancesData);
        evt.complete();
      })
      .catch((err) => { evt.complete(); });
  }

}
