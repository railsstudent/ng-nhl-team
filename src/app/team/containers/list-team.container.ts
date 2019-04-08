import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TeamActions } from '../actions';
import { TeamWithPoints } from '../models';
import { HockeyState, selectAllTeamPoints } from '../reducers';

@Component({
  templateUrl: './list-team.container.html',
  styleUrls: ['./list-team.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingContainer implements OnInit {
  teams$: Observable<TeamWithPoints[]>;

  constructor(private store: Store<HockeyState>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.teams$ = this.store.pipe(select(selectAllTeamPoints));

    this.store.dispatch(new TeamActions.LoadTeams());
  }

  returnToMenu() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  trackByFunction(index: number, team: TeamWithPoints) {
    return team.id;
  }

  showTeamRoster(teamId: string) {
    this.store.dispatch(new TeamActions.LoadTeamRoster({ teamId }));
  }
}