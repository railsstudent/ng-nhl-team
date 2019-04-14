import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamWithPoints, UpdateTeamDelta } from '../models';

@Component({
  selector: 'team-stat-vertical-table',
  templateUrl: './team-stat-vertical-table.component.html',
  styleUrls: ['./team-stat-vertical-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamStatVerticalTableComponent {
  @Input()
  team: TeamWithPoints;

  @Output()
  updateWin = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateLoss = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateDraw = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateOvertimeWin = new EventEmitter<UpdateTeamDelta>();

  @Output()
  updateOvertimeLoss = new EventEmitter<UpdateTeamDelta>();
}
