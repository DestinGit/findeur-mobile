import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindFreelancersByLocationPage } from './find-freelancers-by-location';

@NgModule({
  declarations: [
    FindFreelancersByLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(FindFreelancersByLocationPage),
  ],
})
export class FindFreelancersByLocationPageModule {}
