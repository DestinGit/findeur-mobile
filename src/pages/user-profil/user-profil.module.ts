import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProfilPage } from './user-profil';

@NgModule({
  declarations: [
    UserProfilPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProfilPage),
  ],
})
export class UserProfilPageModule {}
