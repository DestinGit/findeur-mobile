// Native ionic Libraries
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
// import {Http, HttpModule} from '@angular/http';

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
import { FindFreelancersBySkillPage } from '../pages/find-freelancers-by-skill/find-freelancers-by-skill';
import { FindFreelancersByLocationPage } from '../pages/find-freelancers-by-location/find-freelancers-by-location';
import { LoginPage } from '../pages/login/login';
import { ProfilPage } from './../pages/profil/profil';
import { RegisterPage } from '../pages/register/register';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Définition de la configuration globale de l'application
export const Config = {
   URL: 'http://10.1.34.106/slimsrv/public'
  //URL: 'http://localhost:8000'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SearchCompagnyPage,
    MyTabsPage,
    FindFreelancersBySkillPage,
    FindFreelancersByAvailabilityPage,
    FindFreelancersByLocationPage,
    LoginPage,
    ProfilPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__findeurdb',
         driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    SearchCompagnyPage,
    MyTabsPage,
    FindFreelancersBySkillPage,
    FindFreelancersByAvailabilityPage,
    FindFreelancersByLocationPage,
    LoginPage,
    ProfilPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataClassProvider,
    UserProvider,
    FreelanceProvider,
    UserStorageInfosProvider
  ]
})
export class AppModule {}
