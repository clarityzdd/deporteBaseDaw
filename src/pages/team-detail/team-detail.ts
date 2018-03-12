import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import {DbApiService} from "../../shared/db-api.service";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dbapi:DbApiService) {
    this.team = (this.navCtrl as any).rootParams;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
  }

  ionViewWillEnter() {
    this.tourneyData=this.dbapi.getCurrentTourney();
  }

  goHome() {
    this.navCtrl.parent.parent.popToRoot();
  }

}
