import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompagnyModalCandidatesListPage } from './compagny-modal-candidates-list';

@NgModule({
  declarations: [
    CompagnyModalCandidatesListPage,
  ],
  imports: [
    IonicPageModule.forChild(CompagnyModalCandidatesListPage),
  ],
})
export class CompagnyModalCandidatesListPageModule {}
