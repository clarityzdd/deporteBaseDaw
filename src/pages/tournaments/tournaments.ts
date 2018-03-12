import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {TeamsPage} from "../teams/teams";
import {DbApiService} from "../../shared/db-api.service";

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbservice: DbApiService,
              private loadingController: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TournamentsPage');

    let loader = this.loadingController.create({
      content: 'Accediendo a los datos...'
    });
    loader.present().then(() => {
      this.dbservice.getTournaments().subscribe(
        (data) => {this.tournaments = data;
                    loader.dismiss();
        }
      );
    });

  }

  itemTapped(item) {
    this.navCtrl.push(TeamsPage, item);
  }

}
