import { Declarationtype } from '../models/declarationtypes';
import * as fromRoot from '../../state/app.state';
import { Badge } from '../models/badges';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeclarationTypeActions, DeclarationTypesActionTypes } from './declaration-type.actions';
import { NewAccountDialogComponent } from '../components/new-account-dialog/new-account-dialog.component';

export interface State extends fromRoot.State {
  declarationType: DeclarationTypeState;
}

export interface DeclarationTypeState {
  showDeclarationTypes: boolean;
  currentBadge: Badge;
  badges: Declarationtype[];
  currentDeclarationType: Declarationtype;
  declarationTypes: Declarationtype[];
  error: string;
}


const initialState: DeclarationTypeState = {
  showDeclarationTypes: false,
  currentBadge: null,
  badges: [],
  currentDeclarationType: null,
  declarationTypes: [],
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

export function reducer(state = initialState,  action: DeclarationTypeActions): DeclarationTypeState {

 switch (action.type) {
      case DeclarationTypesActionTypes.ToggleDeclaraionTypes:
      return {
        ...state,
        showDeclarationTypes: action.payload
      };

      case DeclarationTypesActionTypes.SetCurrentBadge:
      return {
        ...state,
        currentBadge: {...action.payload}
      };

      case DeclarationTypesActionTypes.ClearCurrentBadge:
      return {
        ...state,
        currentBadge: null
      };

      default:
      return state;
 }
}
