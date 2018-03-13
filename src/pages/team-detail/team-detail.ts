import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import * as _ from 'lodash';
import {DbApiService} from "../../shared/db-api.service";
import {TeamHomePage} from "../team-home/team-home";
import * as moment from 'moment';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  team:any={};
  games:any[];
  private tourneyData:any;
  teamStanding:any={};
  dateFilter:string;
  allGames:any[];
  useDateFilter:boolean=true;
  isFollowing:boolean=false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi:DbApiService,
              private toastController:ToastController) {
    this.team = (this.navCtrl as any).rootParams;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
  }

  ionViewWillEnter() {
    this.tourneyData=this.dbapi.getCurrentTourney();
    this.games= _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
      };
    })
      .value();

    this.allGames = this.games;
    this.teamStanding= _.find(this.tourneyData.standings, {'teamId':this.team.id});

    console.log("partidos", this.games);
  }

  goHome() {
    this.navCtrl.parent.parent.popToRoot();
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  dateChanged() {
    if (this.useDateFilter)
      this.games = _.filter(this.allGames, g =>
        moment(g.time).isSameOrAfter(this.dateFilter, 'day')
      );
    else
      this.game=this.allGames;
  }

  toggleFollow() {
    this.isFollowing = !this.isFollowing;
    let toast = this.toastController.create({
      message: `Ahora following es ${this.isFollowing}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  goToTeam(game) {
    let opponent = this.tourneyData.teams.find(g => g.name == game.opponent);
    this.navCtrl.parent.parent.push(TeamHomePage, opponent);
  }

}
