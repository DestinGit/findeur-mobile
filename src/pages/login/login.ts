import { Component } from '@angular/core';
import {
  IonicPage, NavParams, ViewController, ModalController,
  Modal, ModalOptions, LoadingController, Loading
} from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';
import { Events } from 'ionic-angular/util/events';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private loading: Loading;
  public messageClassName: string = 'infosColor';
  credentials = {
    username: '',
    password: ''
  };

  public message: string;
  
  constructor(public navParams: NavParams, private viewCtrl: ViewController,
    public modalCtrl: ModalController, public loadingCtrl: LoadingController,
    public userProvider: UserProvider,
    public events: Events) {
      this.message = 'Merci de renseigner vos identifiants de connexion.';
  }

  signIn() {
    this.presentLoadingDefault();
    this.userProvider.signIn(this.credentials)
      .then((res: any) => {
        this.message = res.message;

        this.loading.dismiss();
        
        if (res.success) {
          this.events.publish('user.connection', res.success);
          this.dismiss();
        }
      })
      .catch((err) => {
        console.log(err);
        
        this.loading.dismiss();
        this.messageClassName = 'errorColor';
        this.message = `Erreur : le système empêche l'authentification.
        Vérifier vos paramètres réseau ou vos infos de connexion.`;
      });
  }

  dismiss() {
    const data = {};
    this.viewCtrl.dismiss(data);
  }

  openRegisterPage() {
    this.dismiss();

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    let myModal: Modal = this.modalCtrl.create(RegisterPage, {}, myModalOptions);
    myModal.present();

    myModal.onDidDismiss((data) => {});
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      // content: 'Patientez svp ...'
      /* content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>` */
    });

    this.loading.present();
  }
  
  ionViewWillLoad() {
    // let data = this.navParams.get('data');
    // console.log(data);
  }

  ionViewDidLoad() {}

}
