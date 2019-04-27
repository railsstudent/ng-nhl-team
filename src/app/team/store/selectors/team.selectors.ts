import { createSelector } from '@ngrx/store';
import { TeamWithPoints } from '../../models';
import * as fromFeature from '../reducers';
import * as fromTeam from '../reducers/team.reducer';

const THREE = 3;

export const getAllTeams = createSelector(
  fromFeature.getTeamsFeature,
  fromTeam.selectAll,
);

export const getAllTeamPoints = createSelector(
  getAllTeams,
  teams => teams.filter(t => !!t).map(fromTeam.calculateTeamPoints),
);

export const getTeamMessage = createSelector(
  fromFeature.getTeamsFeature,
  fromTeam.getMessage,
);

export const getTeamErrorMessage = createSelector(
  fromFeature.getTeamsFeature,
  fromTeam.getError,
);

export const getTeamEntities = createSelector(
  fromFeature.getTeamsFeature,
  state => state.entities,
);

export const getRouterInfo = createSelector(
  fromFeature.getRouterFeature,
  state => state.state,
);

export const getSelectedTeamByParam = createSelector(
  getTeamEntities,
  getRouterInfo,
  (entities, router) => router.params && router.params.teamId && entities[router.params.teamId],
);

export const getSelectedTeam = createSelector(
  getSelectedTeamByParam,
  fromTeam.calculateTeamPoints,
);

export const getCloseAlert = createSelector(
  fromFeature.getTeamsFeature,
  fromTeam.getCloseAlert,
);

export const getTeamsLoaded = createSelector(
  fromFeature.getTeamsFeature,
  fromTeam.getLoaded,
);

export const getTopThreeTeams = createSelector(
  getAllTeamPoints,
  teams => fromTeam.sortTeamsByPoints(teams).slice(0, THREE),
);

const getDivisionStanding = createSelector(
  getAllTeamPoints,
  fromTeam.divisionStanding,
);

export const getDivisionLeaders = createSelector(
  getDivisionStanding,
  divisionStandingMap => {
    const divisionLeaders = Object.keys(divisionStandingMap).reduce(
      (acc, division) => acc.concat(divisionStandingMap[division][0]),
      [] as TeamWithPoints[],
    );
    return divisionLeaders.sort((a, b) => b.points - a.points);
  },
);

export const getTopOffensiveTeams = createSelector(
  getAllTeams,
  teams => fromTeam.sortedOffensiveTeams(teams).slice(0, THREE),
);

export const getWorstOffensiveTeams = createSelector(
  getAllTeams,
  teams => fromTeam.sortedOffensiveTeams(teams).slice(-THREE),
);

export const getTopDefensiveTeams = createSelector(
  getAllTeams,
  teams => fromTeam.sortedDefensiveTeams(teams).slice(0, THREE),
);

export const getWorstDefensiveTeams = createSelector(
  getAllTeams,
  teams => fromTeam.sortedDefensiveTeams(teams).slice(-THREE),
);
