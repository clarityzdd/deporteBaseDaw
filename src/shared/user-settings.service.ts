import {Injectable} from "@angular/core/core";
import {Storage} from "@ionic/storage";
@Injectable()

export class UserSettingsService {
  constructor (private storage: Storage) {

  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    }
    this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavouriteTeam(team) {
    this.storage.remove(team.id.toString());
  }

  ifFavouriteTeam(teamId) {
    return this.storage.get(teamId.toString()).then(
      value => value ? true : false);
  }
}
