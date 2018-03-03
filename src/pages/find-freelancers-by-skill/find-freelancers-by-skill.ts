import { NewArticlePage } from './../new-article/new-article';
import { FreelanceDetailPage } from './../freelance-detail/freelance-detail';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  IonicPage, NavController, NavParams, Platform,
  Modal, ModalOptions, Events, ModalController, ToastController,
  Loading, LoadingController, AlertController
} from 'ionic-angular';
import { FreelanceProvider } from '../../providers/freelance/freelance';
import { UserProvider } from '../../providers/user/user';
// import { UserStorageInfosProvider } from '../../providers/user-storage-infos/user-storage-infos';

import { LoginPage } from '../login/login';
import { ProfilPage } from './../profil/profil';
import { CategoryProvider } from '../../providers/category/category';
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
  ionSelectSkills: any = [{ name: '', title: '' }];
  public kills = [];
  // private requestParams = { results: 40, Keywords: '', fromCrDat: ''};
  private lastFromCrDateValue: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform,
    public storage: Storage, private alertCtrl: AlertController, private category: CategoryProvider,
    public loadingCtrl: LoadingController, public modalCtrl: ModalController, public toastCtrl: ToastController,
    public freelanceProvider: FreelanceProvider, public userProvider: UserProvider,
    public events: Events) {
    //this.isAndroid = platform.is('android');
    this.initializeItems();

    events.subscribe('user.connection', () => this.whatClassIsIt());

    this.presentLoadingDefault();

    this.loadSkills();
  }

  goToNewArticlePage() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    if (!this.userProvider.isAuthenticated()) {
      // Lancement de la fenêtre modal
      let myModal: Modal = this.modalCtrl.create(LoginPage, {}, myModalOptions);
      myModal.present();
    } else if (this.userProvider.getUser().privs !== "4") {
      this.showAlert('Nouvelle annonce !', 'Droits insuffisants pour accéder à cette fonctionnalité.', () => { });
    } else {
      this.navCtrl.push(NewArticlePage).then(() => { });
    }
  }

  whatClassIsIt() {
    return (this.userProvider.isAuthenticated()) ? 'userColor-idendifer' : 'userColor-noconnect';
  }

  itemSelected(item: any) {
    let params = {
      freelance: item
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

  stpSelect() { }

  backToHomeButton() { }

  notificationSelect() { }

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
    // this.requestParams.Keywords = this.kills.join(',');    
    this.loadDatas();
  }

  ionViewDidLoad() {
    this.loadDatas();
  }

  loadSkills() {
    this.category.getAllSkills()
      .then((data) => this.ionSelectSkills = data)
      .catch((error) => console.error());
  }

  loadDatas() {
    // private requestParams = { results: 40, Keywords: '', fromCrDat: ''};
    let params: any = {
      Keywords: this.kills.join(',')
    };
    
    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(params)
      .then((data) => {
        this.freelancesData = data;
        let sizeOfData = this.freelancesData.length;
        // S'il y a des datas, je sauvegarde la dernière date de création
        if (sizeOfData) {
          this.lastFromCrDateValue = data[sizeOfData - 1]['Posted'];
        }
        console.log(this.freelancesData);
        
        this.loading.dismiss();
      })
      .catch((err) => this.loading.dismiss());
  }

  loadMoreDatas(evt) {
    // let requestParameters = this.requestParams;
    // requestParameters['fromCrDat'] = this.lastFromCrDateValue;
    let params: any = {
      results: 4,
      Keywords: this.kills.join(','),
      fromCrDat: this.lastFromCrDateValue
    };

    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(params)
      .then((data) => {
        let tmp: any = data;
        let sizeOfData = tmp.length;
        if(sizeOfData) {
          this.lastFromCrDateValue = tmp[sizeOfData - 1]['Posted'];
        }
        this.freelancesData = this.freelancesData.concat(data);
        evt.complete();
      })
      .catch((err) => evt.complete());
  }

  refreshScreen(evt) {
    let params: any = {
      Keywords: this.kills.join(',')
    };

    // Récupération des données
    this.freelanceProvider.getPersonalBusiness(params)
      .then((data) => {
        let tmp: any = data;
        let sizeOfData = tmp.length;
        if(sizeOfData) {
          this.lastFromCrDateValue = tmp[sizeOfData - 1]['Posted'];
        }
        this.freelancesData = tmp;
        evt.complete();
      })
      .catch((err) => evt.complete());
  }

  // doRefresh(evt) {
  //   // Récupération des données
  //   this.freelanceProvider.getPersonalBusiness(this.requestParams)
  //     .then((data) => {
  //       let tmp: any = data;
  //       this.isThereNoData = !tmp.length;
  //       this.freelancesData = tmp.concat(this.freelancesData);
  //       evt.complete();
  //     })
  //     .catch((err) => { evt.complete(); });
  // }


  showAlert(title: string, subTitle: string, callback) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: 'OK', handler: (data) => { callback(); } }]
    });
    alert.present();
  }

}
