import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
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
  private allTeams: any;
  private  allTeamDivisions: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi: DbApiService,
              private loaderController: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamsPage');
    this.selectedTourney = this.navParams.data;

    let loader = this.loaderController.create({
      content : "Accediendo a los datos..."
    });

    loader.present().then( () =>
      this.dbapi.getTournamentsData(this.selectedTourney.id).subscribe(
        data => {
          this.allTeams = data.teams;
          this.allTeamDivisions =
            _.chain(data.teams)
              .groupBy('division')
              .toPairs()
              .map(item =>
                _.zipObject(['divisionName','divisionTeams'],item)
              )
              .value();

          this.teams = this.allTeamDivisions;
          console.log("Division Teams", this.allTeamDivisions);
          loader.dismiss();
        })
    );
}

  teamTapped(team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
