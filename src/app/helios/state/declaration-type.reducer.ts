import { Declarationtype } from '../models/declarationtypes';
import * as fromRoot from '../../state/app.state';
import { Badge } from '../models/badges';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeclarationTypeActions, DeclarationTypesActionTypes } from './declaration-type.actions';

export interface State extends fromRoot.State {
  declarationType: DeclarationTypeState;
}

export interface DeclarationTypeState {
  showDeclarationTypes: boolean;
  currentBadge: Badge;
  badges: Badge[];
  currentDeclarationType: Declarationtype;
  declarationTypes: Declarationtype[];
  traderTreference: string;
  error: string;
}


const initialState: DeclarationTypeState = {
  showDeclarationTypes: false,
  currentBadge: null,
  badges: [],
  currentDeclarationType: null,
  declarationTypes: [],
  traderTreference: '',
  error: ''
};

const getDeclarationTypeState = createFeatureSelector<DeclarationTypeState>('declarationType');

export const getDisplayDeclarationType = createSelector(
  getDeclarationTypeState,
  state => state.showDeclarationTypes
);

export const getCurrentBadge = createSelector(
  getDeclarationTypeState,
  state => state.currentBadge
);

export const getBadges = createSelector(
  getDeclarationTypeState,
  state => state.badges
);

export const getCurrentDeclarationType = createSelector(
  getDeclarationTypeState,
  state => state.currentDeclarationType
);

export const getDeclarationTypes = createSelector(
  getDeclarationTypeState,
  state => state.declarationTypes
);

export const getTraderReference = createSelector(
  getDeclarationTypeState,
  state => state.traderTreference
);

export function reducer(state = initialState,  action: DeclarationTypeActions): DeclarationTypeState {

 switch (action.type) {
      case DeclarationTypesActionTypes.ToggleDeclaraionTypes:
      return {
        ...state,
        showDeclarationTypes: action.payload
      };

      case DeclarationTypesActionTypes.SetCurrentDeclarationType:
      return {
        ...state,
        currentDeclarationType: {...action.payload}
      };

      case DeclarationTypesActionTypes.SetCurrentBadge:
      return {
        ...state,
        currentBadge: {...action.payload}
      };

      case DeclarationTypesActionTypes.SetTraderReference:
      return {
        ...state,
        traderTreference: action.payload
      };

      default:
      return state;
 }
}
