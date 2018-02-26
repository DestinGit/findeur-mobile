// import { MysplashscreenPage } from './../pages/mysplashscreen/mysplashscreen';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { UserStorageInfosProvider } from '../providers/user-storage-infos/user-storage-infos';
/* import { ListPage } from '../pages/list/list';
import { SearchCompagnyPage } from './../pages/search-compagny/search-compagny';
 */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private events: Events, private userProvider: UserProvider,
    private userStorageProvider: UserStorageInfosProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Accueil', component: HomePage },
/*       { title: 'List', component: ListPage },
      { title: 'Seach Compagny', component: SearchCompagnyPage }
 */    ];


    this.signupUser();
  }

  private signupUser() {
    this.userStorageProvider.getUserStorageInfos()
      .then((credentials: any) => this.userProvider.signIn(credentials))
      .then((res: any) => {
        if (res.success) {
          this.events.publish('user.connection', res.success);
        }
      })
      .catch((err) => console.log(err));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // let splash = this.modalCtrl.create(MysplashscreenPage);
      //       splash.present();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
