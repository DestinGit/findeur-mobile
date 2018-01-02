import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, ModalController, Modal, ModalOptions } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { UserProvider } from '../../providers/user/user';

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
  credentials = {
    username: '',
    password: ''
  };

  public message: string;

  constructor(private navParams: NavParams, private viewCtrl: ViewController,
    public modalCtrl: ModalController, public userProvider: UserProvider) {
  }

  signIn() {
    console.log(this.credentials);

    this.userProvider.signIn(this.credentials)
      .then((res: any) => {
        this.message = res.message;
//        this.message = (res.success) ? 'Connexion réussi' : res.message;
      })
      .catch((err) => {
        this.message = 'Une erreur : le système empêche l\'authentification';
      });
  }

  dismiss() {
    const data = {
      login: 'Login',
      pass: 'toto'
    };

    this.viewCtrl.dismiss(data);
  }

  openRegisterPage() {
    this.dismiss();

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    console.log('Login page');
    let myModal: Modal = this.modalCtrl.create(RegisterPage, {}, myModalOptions);
    myModal.present();

    myModal.onDidDismiss((data) => console.log(data));

  }

  ionViewWillLoad() {
    let data = this.navParams.get('data');
    console.log(data);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
