import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TournamentsPage} from "../tournaments/tournaments";
import {TeamHomePage} from "../team-home/team-home";
import {DbApiService} from "../../shared/db-api.service";

/**
 * Generated class for the MyTeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favorites =  [
    {team: {"id": 6149,"name": "Cyclones  3rd","coach": "Glenn Nelson ","division": "3rd"},
      tournament: {"name": "March Madness Tournament","id": "89e13aa2-ba6d-4f55-9cc2-61eba6172c63"}
    },
    {team:{"id": 6147,"name": "HC ELITE  Dreish 2nd","coach": "Frank Dreisch","division": "3rd"},
      tournament: {"name": "March Madness Tournament","id": "89e13aa2-ba6d-4f55-9cc2-61eba6172c63"}
    }
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbApi: DbApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event,item){
    let loader = this.loadingController.create({
      content: 'Accediendo a los datos. .',
      dismissOnPageChange: true
    });
    loader.present();
    this.dbApi.getTournamentData(item.tournament.id)
      .subscribe(t => this.navCtrl.push(TeamHomePage,item.team));
  }

}
