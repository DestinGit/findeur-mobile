import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissionDetailsPage } from './mission-details';

@NgModule({
  declarations: [
    MissionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MissionDetailsPage),
  ],
})
export class MissionDetailsPageModule {}
