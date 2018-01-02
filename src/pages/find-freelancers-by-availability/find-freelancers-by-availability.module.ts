import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindFreelancersByAvailabilityPage } from './find-freelancers-by-availability';

@NgModule({
  declarations: [
    FindFreelancersByAvailabilityPage,
  ],
  imports: [
    IonicPageModule.forChild(FindFreelancersByAvailabilityPage),
  ],
})
export class FindFreelancersByAvailabilityPageModule {}
