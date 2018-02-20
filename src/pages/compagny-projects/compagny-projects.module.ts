import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompagnyProjectsPage } from './compagny-projects';

@NgModule({
  declarations: [
    CompagnyProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(CompagnyProjectsPage),
  ],
})
export class CompagnyProjectsPageModule {}
