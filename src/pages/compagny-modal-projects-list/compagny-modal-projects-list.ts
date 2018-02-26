import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { FreelanceProvider } from '../../providers/freelance/freelance';

/**
 * Generated class for the CompagnyModalProjectsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compagny-modal-projects-list',
  templateUrl: 'compagny-modal-projects-list.html',
})
export class CompagnyModalProjectsListPage {
  public projectsData: any = [];
  private requestParams = { results: 40, Keywords: '' };

  constructor(private view: ViewController, public navParams: NavParams,
    public freelanceProvider: FreelanceProvider) {
      this.loadDatas();      
  }

  loadDatas() {
    this.freelanceProvider.getMyProjectsList(this.requestParams)
      .then((data) => {
        this.projectsData = data;
      })
      .catch((err) => { console.log(err);});
  }

  projectSelected(item:any) {
    this.closeModal(item);
  }

  ionViewDidLoad() {  }

  closeModal(item?:any) {
    const projectSelected = item;
    this.view.dismiss(projectSelected);
  }

}
