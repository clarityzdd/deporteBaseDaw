import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";
import {Observable} from "rxjs/Rx";

@Injectable()

export class DbApiService {
  currentTourney: any = {};

  constructor(private fb: AngularFireDatabase) {

  }

  getTournaments():Observable<any> {
    return this.fb.list('tournaments').valueChanges();
  }

  getTournamentsData(tourneyId):Observable<any> {
    return this.fb.object(`tournaments-data/${tourneyId}`)
      .valueChanges()
      .map(resp => this.currentTourney = resp);
  }

}
