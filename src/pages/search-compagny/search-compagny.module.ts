import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchCompagnyPage } from './search-compagny';

@NgModule({
  declarations: [
    SearchCompagnyPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchCompagnyPage),
  ],
})
export class SearchCompagnyPageModule {}
