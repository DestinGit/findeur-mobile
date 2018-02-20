import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailProvider } from '../../providers/email/email';

/**
 * Generated class for the EmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {
/**
    * @public
    * Property to assign a FormGroup object to
    */
   public form  : FormGroup;
   
   /**
    * @private
    * Property to assign an image file reference to
    */
   private _attachment : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _ALERT: AlertController, private view: ViewController,
    private _FORM: FormBuilder,
    private _EMAIL: EmailProvider) {

      // Create a FormGroup object to implement validation
      // on the template fields
      // VERY basic validation as you can see - I.e. NO empty fields!
      this.form = this._FORM.group({
        "to"            : ["", Validators.required],
        // "cc"            : ["", Validators.required],
        // "bcc"           : ["", Validators.required],
        "subject"       : ["", Validators.required],
        "message"       : ["", Validators.required]
     });    
     
     let email = navParams.get('email');
     this.form.controls['to'].setValue(email);
     this.form.controls['subject'].setValue(navParams.get('subject'));

     this.form.controls['message'].setValue(
      'Bonjour,\n\n\n' +  
      'Le lien vers la mission est : '+ navParams.get('message'));
  }

  closeModal() {
    this.view.dismiss();
  }

  /**
    *
    * @public
    * @method displayMessage
    * @param title    	{string}      Heading for the alert window
    * @param subTitle   {string}      Message for the alert window
    * @return {none}
    */
   displayMessage(title : string, subTitle : string, callback: Function) : void
   {
      let alert : any 		=  this._ALERT.create({
         title 		: title,
         subTitle 	: subTitle,
        //  buttons    : ['Got it']
         buttons: [{ text: 'OK', handler: (data) => { callback(); } }]
      });
      alert.present();
   }

   /**
    *
    * @public
    * @method sendMessage
    * @return {none}
    */
   sendMessage() : void
   {
      // Retrieve the validated form fields
      let to 		: string		= this.form.controls["to"].value,
          // cc 		: string		= this.form.controls["cc"].value,
          // bcc 		: string		= this.form.controls["cc"].value,
          subject 	: string		= this.form.controls["subject"].value,
          message 	: string		= this.form.controls["message"].value;

      // Has the user selected an attachment?
      // if(this._attachment.length > 1)
      // {
         // If so call the sendEmail method of the EmailProvider service, pass in
         // the retrieved form data and watch the magic happen! :)
        //  this._EMAIL.sendEmail(to, cc, bcc, this._attachment, subject, message);
         this._EMAIL.sendEmail(to, '', '', this._attachment, subject, message);
      // }
      // else
      // {
         // Inform the user that they need to add an attachment
      //    this.displayMessage('Error', 'You need to select an attachment');
      // }

      this.displayMessage('Email', 'Message envoyé', () => {this.closeModal();})
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailPage');
  }

}
