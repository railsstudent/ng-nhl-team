import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NavigationActions } from 'src/app/store';
import { getOverallStanding, getTeamLoading, LeagueState, TeamActions } from '../store';

@Component({
  selector: 'team-statistics-container',
  templateUrl: './team-statistics.container.html',
  styleUrls: ['./team-statistics.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatisticsContainer {
  overallStanding$ = this.store.pipe(select(getOverallStanding));
  loading$ = this.store.pipe(select(getTeamLoading));

  constructor(private store: Store<LeagueState>) {}

  gotoTeam(teamId: string) {
    const url = '/team/roster';
    const pathParams = [teamId];
    this.store.dispatch(NavigationActions.NextRoute(url, pathParams));
  }

  createTeam() {
    const url = '/team/new';
    this.store.dispatch(NavigationActions.NextRoute(url));
  }
}
