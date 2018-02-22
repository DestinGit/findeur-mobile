import { EmailPage } from './../email/email';
import { CompagnyModalProjectsListPage } from './../compagny-modal-projects-list/compagny-modal-projects-list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalOptions, Modal, ModalController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
// import { EmailComposer } from '@ionic-native/email-composer';
/**
 * Generated class for the FreelanceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-freelance-detail',
  templateUrl: 'freelance-detail.html',
})
export class FreelanceDetailPage {
  private image = ['architect.jpg', 'office62.jpg', 'card-sf.jpg', 'card-saopaolo.jpg'];
  affImg: string;
  freeDetail = {
    Image: '',
    Title: '',
    Body: '',
    Posted: '',
  };
  phone: string = '';
  email: string = 'bak1tino@gmail.com';
  private id = '';
  private url_title = '';

  projectAssociated: string = 'Contacter';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController,
    private callNumber: CallNumber, ) {
    this.freeDetail = navParams.get('freelance');
    this.affImg = this.image[this.entierAleatoire(0, 3)];
    // console.log(this.affImg);   
    // console.log(this.freeDetail);

  }

  goToModalProjectsList() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };

    let myModal: Modal = this.modalCtrl.create(CompagnyModalProjectsListPage, {}, myModalOptions);
    // let myModal: Modal = this.modalCtrl.create(CompagnyModalProjectsListPage, {}, myModalOptions);
    myModal.present();

    myModal.onDidDismiss((data) => {
      if (data) {
        // console.log(data);
        
        this.projectAssociated = data['Title'];
        this.phone = this.freeDetail['custom_4'];

        this.url_title = data['url_title'];
        this.id = data['ID'];
      }
    });
  }

  contactFreelanceByPhone() {
    if (this.phone) {
      this.callNumber.callNumber(this.phone, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
    }
  }

  contactFreelanceByMail() {
    let myModal: Modal = this.modalCtrl.create(EmailPage, {
      email:this.email,
      subject: `Proposition de la mission : ${this.projectAssociated}`,
      message:`http://findeur2017.findeur.fr/auto-entrepreneur/${this.id}/${this.url_title}`
    });
    myModal.present();
  }
  
  /**
   * Return a random number
   * @param {number} min
   * @param {number} max 
   * @returns {number}
   */
  entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FreelanceDetailPage');
  }

}
