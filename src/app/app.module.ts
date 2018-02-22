import { EmailPage } from './../pages/email/email';
import { CompagnyModalProjectsListPage } from './../pages/compagny-modal-projects-list/compagny-modal-projects-list';
import { UserProfilPage } from './../pages/user-profil/user-profil';
import { MysplashscreenPage } from './../pages/mysplashscreen/mysplashscreen';
import { PipeLinkImg } from './../pipescustom/pipeLinkImg';
import { Application } from './../pipescustom/application';
// Native ionic Libraries
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
// import {Http, HttpModule} from '@angular/http';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pluggin of storage
import { IonicStorageModule } from '@ionic/storage';

// My providers imports
import { DataClassProvider } from '../providers/data-class/data-class';
import { UserProvider } from '../providers/user/user';
import { FreelanceProvider } from '../providers/freelance/freelance';
import { UserStorageInfosProvider } from '../providers/user-storage-infos/user-storage-infos';

// My app's pages and component
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SearchCompagnyPage } from './../pages/search-compagny/search-compagny';

import { MyTabsPage } from '../pages/my-tabs/my-tabs';
import { FindFreelancersByAvailabilityPage } from '../pages/find-freelancers-by-availability/find-freelancers-by-availability';
import { CompagnyProjectsPage } from './../pages/compagny-projects/compagny-projects';
import { FindFreelancersBySkillPage } from '../pages/find-freelancers-by-skill/find-freelancers-by-skill';
import { FindFreelancersByLocationPage } from '../pages/find-freelancers-by-location/find-freelancers-by-location';
import { FreelanceDetailPage } from './../pages/freelance-detail/freelance-detail';
import { MissionDetailsPage } from './../pages/mission-details/mission-details';
import { LoginPage } from '../pages/login/login';
import { ProfilPage } from './../pages/profil/profil';
import { RegisterPage } from '../pages/register/register';
import { NewArticlePage } from '../pages/new-article/new-article';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalDataProvider } from '../providers/local-data/local-data';

import { NgArrayPipesModule, NgStringPipesModule } from 'angular-pipes';
import { EmailProvider } from '../providers/email/email';
import { CategoryProvider } from '../providers/category/category';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Définition de la configuration globale de l'application
export const Config = {
  URL: 'https://findtest.alwaysdata.net/api'
  //  URL: 'https://yemeialways.alwaysdata.net/api'
  //URL: 'http://localhost:8000'
};

@NgModule({
  declarations: [
    MyApp,
    MysplashscreenPage,
    HomePage,
    ListPage,
    SearchCompagnyPage,
    MyTabsPage,
    FindFreelancersBySkillPage,
    CompagnyModalProjectsListPage,
    CompagnyProjectsPage,
    FindFreelancersByAvailabilityPage,
    FindFreelancersByLocationPage,
    FreelanceDetailPage,
    MissionDetailsPage,
    LoginPage,
    ProfilPage,
    RegisterPage,
    NewArticlePage,
    Application,
    PipeLinkImg,
    UserProfilPage,
    EmailPage
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__findeurdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    HttpModule,
    NgArrayPipesModule,
    NgStringPipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MysplashscreenPage,
    HomePage,
    ListPage,
    SearchCompagnyPage,
    MyTabsPage,
    FindFreelancersBySkillPage,
    CompagnyModalProjectsListPage,
    CompagnyProjectsPage,
    FindFreelancersByAvailabilityPage,
    FindFreelancersByLocationPage,
    FreelanceDetailPage,
    MissionDetailsPage,
    LoginPage,
    ProfilPage,
    RegisterPage,
    NewArticlePage,
    UserProfilPage,
    EmailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataClassProvider,
    UserProvider,
    FreelanceProvider,
    UserStorageInfosProvider,
    InAppBrowser,
    LocalDataProvider,

    CallNumber,
    EmailComposer,
    EmailProvider,
    CategoryProvider
  ]
})
export class AppModule { }
