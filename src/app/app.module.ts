import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MyTeamsPage} from "../pages/my-teams/my-teams";
import {TournamentsPage} from "../pages/tournaments/tournaments";
import {GamePage} from "../pages/game/game";
import {TeamsPage} from "../pages/teams/teams";
import {TeamDetailPage} from "../pages/team-detail/team-detail";
import {StandingsPage} from "../pages/standings/standings";
import {TeamHomePage} from "../pages/team-home/team-home";
import {AngularFireDatabase} from "angularfire2/database/database";
import {AngularFireDatabaseModule} from "angularfire2/database/database.module";
import {AngularFireAuthModule} from "angularfire2/auth/auth.module";
import {DbApiService} from "../shared/db-api.service";
import {AngularFireModule} from "angularfire2/index";


export const firebaseConfig = {
  apiKey: "AIzaSyAwC1BSOn7UmPguOhJKsnx88DrMmFf6lXA",
  authDomain: "dawdeportes18-1d268.firebaseapp.com",
  databaseURL: "https://dawdeportes18-1d268.firebaseio.com",
  projectId: "dawdeportes18-1d268",
  storageBucket: "dawdeportes18-1d268.appspot.com",
  messagingSenderId: "598916970507"
};

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    GamePage,
    TeamHomePage,
    StandingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    GamePage,
    TeamHomePage,
    StandingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    DbApiService
  ]
})
export class AppModule {}
