// import { Component, ViewChild, ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Modal, 
  ModalOptions, Events, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilPage } from './../profil/profil';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public userProvider: UserProvider,
    private alertCtrl: AlertController,
    public events: Events) {

      // @ViewChild('testid') myCard: ElementRef;

    events.subscribe('user.connection', () => this.whatClassIsIt());

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
      'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  coolSS() {
    if(!this.userProvider.isAuthenticated()) {
      this.presentPrompt();
    } else {
      console.info('On peut vir la suite pour postuler');
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
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
    let myPageView = (!this.userProvider.isAuthenticated()) ? LoginPage : ProfilPage;

    // Lancement de la fenêtre modal
    let myModal: Modal = this.modalCtrl.create(myPageView, { 'data': data }, myModalOptions);
    myModal.present();

    // Handler de l'évènement fermeture de la modal
    myModal.onDidDismiss((data) => {
    }
    );

  }




  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Connexion',
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
          handler: data => {
          console.log(data);
            this.userProvider.signIn(data)
            .then((res: any) => {
              console.log(res);
              if (res.success) {
                this.events.publish('user.connection', res.success);
                console.log('kolelelalalalallal');
              } else {
                console.log('Bololellllle mistik');
                this.coolSS();
              }
            })
            .catch((err) => {
              return false;
            });

          }
        }
      ]
    });
    alert.present();
  }  
}
