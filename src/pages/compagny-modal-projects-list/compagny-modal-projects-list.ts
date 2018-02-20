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
      console.log('load');
      
  }

  loadDatas() {
    this.freelanceProvider.getMyProjectsList(this.requestParams)
      .then((data) => {
        let tmpData: any = data;
        this.projectsData = tmpData;
        console.log('load2');
      })
      .catch((err) => { console.log(err);});
  }

  projectSelected(item:any) {
    //console.log(item);
    this.closeModal(item);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompagnyModalProjectsListPage');
  }

  closeModal(item?:any) {
    const projectSelected = item;

    this.view.dismiss(projectSelected);
  }
}
