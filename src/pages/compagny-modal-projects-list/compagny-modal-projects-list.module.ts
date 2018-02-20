import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompagnyModalProjectsListPage } from './compagny-modal-projects-list';

@NgModule({
  declarations: [
    CompagnyModalProjectsListPage,
  ],
  imports: [
    IonicPageModule.forChild(CompagnyModalProjectsListPage),
  ],
})
export class CompagnyModalProjectsListPageModule {}
