import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TeamHomePage} from "../team-home/team-home";
import {DbApiService} from "../../shared/db-api.service";

/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams = [];
  selectedTourney: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    this.selectedTourney = this.navParams.data;
    this.dbapi.getTournamentsData(this.selectedTourney.id).subscribe(
      data => {
        this.teams = data.teams;
        console.log("Torneo en teams", data);
      }
    );
  }

  teamTapped(team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
