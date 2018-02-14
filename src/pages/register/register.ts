import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private phoneRegExPattern = /^((\+|00)33\s?|0)[67](\s?\d{2}){4}$/;
  private emailRegExPattern = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;

  public userAccount = {
    'name': '',
    'first_name': '',
    'last_name': '',
    'email': '',
    'phone': '',
    privs: '',
    'entreprise': '',
    'web': '',
    'detail': '',
  };
  constructor(public navCtrl: NavController, private viewCtrl: ViewController,
    public navParams: NavParams, private userProvider: UserProvider,
    private alertCtrl: AlertController) {
    // this.userProvider.register()
    // .then((res) => console.log(res))
    // .catch((err) => console.info(err));
  }

  dismiss() {
    const data = {
      login: 'Register',
      pass: 'toto'
    };

    this.viewCtrl.dismiss(data);
  }

  signup() {
    let msg = 'Remplissez correctement tous les champs';
    let msg2 = 'Consultez cette adresse <b> ' + this.userAccount.email + '</b> pour récupérer vos informations de connexion';

    if (!this.checkAllFieldsAreCorrectlyFilled()) {
      this.showAlert('Echec Inscription !', msg, () => { });
    } else {
      this.userProvider.register(this.userAccount)
        .then((res) => {
          if ('error' in res) {
            let errMsg = res['message'].join();
            this.showAlert('Echec Inscription !', errMsg, () => { });

          } else {
            this.showAlert('Inscription OK !', msg2, () => { this.dismiss(); });
          }
        })
        .catch((err) => {
          console.log(err);

          this.showAlert('Echec Inscription !', 'Connexion failed', () => { });
        });
    }
  }

  showAlert(title: string, subTitle: string, callback) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{ text: 'OK', handler: (data) => { callback(); } }]
    });
    alert.present();
  }


  checkAllFieldsAreCorrectlyFilled() {
    let isOk = true;
    if (this.userAccount.last_name.length < 1) {
      isOk = false;
    }

    if (this.userAccount.first_name.length < 1) {
      isOk = false;
    }

    if (this.userAccount.detail.length < 1) {
      isOk = false;
    }

    if (this.userAccount.name.indexOf(' ') != -1 || this.userAccount.name.length < 1) {
      isOk = false;
    }

    if (!this.checkPhoneField()) {
      isOk = false;
    }

    if (!this.checkEmailField()) {
      isOk = false;
    }
    return isOk;
  }


  checkPhoneField() {
    return this.phoneRegExPattern.test(this.userAccount.phone);
  }

  checkEmailField() {
    return this.emailRegExPattern.test(this.userAccount.email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
