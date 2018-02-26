import { NewArticlePage } from './../new-article/new-article';
import { UserProfilPage } from './../user-profil/user-profil';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalOptions, Modal, ModalController, AlertController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../login/login';
import { ProfilPage } from '../profil/profil';
import { FreelanceProvider } from '../../providers/freelance/freelance';

/**
 * Generated class for the CompagnyProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compagny-projects',
  templateUrl: 'compagny-projects.html',
})
export class CompagnyProjectsPage {
  // private aProject = {
  //   name: '',
  //   posted: '',
  //   image: ''
  // };
  public projectsData: any = [];

  private requestParams = { results: 40, Keywords: '', fromCrDat: '' };
  // private lastFromCrDateValue: string = '';

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
    public navParams: NavParams, public events: Events, private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    public userProvider: UserProvider, public freelanceProvider: FreelanceProvider) {

    events.subscribe('user.connection', () => this.whatClassIsIt());
    // Mise à jour d'une tâche
    // Inscription à l'événement 'task.create' 
    events.subscribe('project.update', (data) => {
      data = JSON.parse(data);
      data.article['LastMod'] = this.getDate();

      this.persistArticle(data.article, data.index);
    });
    // Création d'une nouvelle tâche
    // Inscription à l'événement 'task.create' 
    events.subscribe('project.create', (data) => {
      data = JSON.parse(data);
      data.article['Posted'] = this.getDate();
      // this.projectsData.push(data.article);  
      this.persistArticle(data.article, data.index);
    });

    this.loadDatas();
  }

  goToArticlePage(item: any, pos) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    if (!item) {
      item = {
        Title: '',
        Category1: '', // departement
        Keywords: '',  // metiers
        Body: '',     // texte
        custom_3: '' // mobilité    
      };
    } else if (typeof item.Keywords == 'string') {
      item.Keywords = item.Keywords.split(',');
    }

    if (!item.hasOwnProperty('Image')) {
      item.Image = "";
    }

    let params = {
      index: pos,
      article: item
    };

    console.log('params');
    console.log(params);
    
    if (!this.userProvider.isAuthenticated()) {
      // Lancement de la fenêtre modal
      let myModal: Modal = this.modalCtrl.create(LoginPage, {}, myModalOptions);
      myModal.present();
    } else if (this.userProvider.getUser().privs !== "4") {
      this.showAlert('Nouveau projet !', 'Droits insuffisants pour accéder à cette fonctionnalité.', () => { });
    } else {
      this.navCtrl.push(NewArticlePage, params).then(() => { });
    }

  }

  /**
   * Persist data
   * @param article 
   * @param pos 
   */
  persistArticle(article: any, pos?: number) {
    if (typeof article.Keywords != 'string') {
      article.Keywords = article.Keywords.join(',');
    }

    this.freelanceProvider.addNewMission(article).then((res) => {
      if ('error' in res) {
        let errMsg = res['message'].join();
        this.showAlert('<h5 class="error">Echec Nouveau projet</h5>', errMsg, () => {
          this.goToArticlePage(article, pos);
        });
      } else {
        this.showAlert('<h5 class="success">Nouveau projet OK !</h5>', 'Votre projet a bien été enregistré',
          () => {
            if (pos >= 0) {
              this.projectsData[pos] = article;
            } else {
              article['ID'] = res['ID'];
              this.projectsData.push(article);
            }
          });
      }
    })
      .catch(() => { });
  }

  loadDatas() {
    this.freelanceProvider.getMyProjectsList(this.requestParams)
      .then((data) => {
        this.projectsData = data;
        // let sizeOfData = this.projectsData.length;
        // if (sizeOfData) {
        //   this.lastFromCrDateValue = data[sizeOfData - 1]['Posted'];
        // }        
      })
      .catch((err) => { });
  }

  loadMoreDatas(evt) {
    // let requestParameters = this.requestParams;
    // requestParameters['fromCrDat'] = this.lastFromCrDateValue;

    // Récupération des données
    this.freelanceProvider.getMyProjectsList(this.requestParams)
      .then((data) => {
        this.projectsData = data;
        evt.complete();
      })
      .catch((err) => {
        evt.complete();
      });
  }

  doRefresh(evt) {
    // Récupération des données
    this.freelanceProvider.getMyProjectsList(this.requestParams)
      .then((data) => {
        this.projectsData = data;
        evt.complete();
      })
      .catch((err) => evt.complete());
  }

  whatClassIsIt() {
    // (this.userProvider.isAuthenticated()) ? this.loadDatas():this.projectsData=[];
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
    const data = {};
    // User est authentifié ?
    let myPageView = (!this.userProvider.isAuthenticated()) ? LoginPage : ProfilPage;

    // Lancement de la fenêtre modal
    let myModal: Modal = this.modalCtrl.create(myPageView, { 'data': data }, myModalOptions);
    myModal.present();

    // Handler de l'évènement fermeture de la modal
    myModal.onDidDismiss((data) => { }
    );

  }

  goToProfilPage(candidate: any) {
    // let sendReq = this.requestParams;
    // sendReq['name'] = candidate;
    if (candidate.length && candidate != 'postule_ae' && candidate != '-') {
      this.navCtrl.push(UserProfilPage, { param: candidate });
    }
  }

  getDate() {
    let date1 = new Date();
    return `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()} ${date1.getHours()}:${date1.getMinutes()}:${date1.getSeconds()}`;
  }

  showAlert(title: string, subTitle: string, callback) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: 'OK', handler: (data) => { callback(); } }]
    });
    alert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompagnyProjectsPage');
  }

}
