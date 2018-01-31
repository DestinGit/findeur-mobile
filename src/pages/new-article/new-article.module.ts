import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewArticlePage } from './new-article';

@NgModule({
  declarations: [
    NewArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(NewArticlePage),
  ],
})
export class NewArticlePageModule {}
