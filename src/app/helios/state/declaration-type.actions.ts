import { Action } from '@ngrx/store';
import { Badge } from '../models/badges';

export enum DeclarationTypesActionTypes {
  ToggleDeclaraionTypes = '[Declaration Types] Toggle Declaration Types',
  SetCurrentBadge = '[Declaration Types] Set Current Badge',
  ClearCurrentBadge = '[Declaration Types] Clear Current Declaration Badge',
  LoadBadge = '[Declaration Types] Load Badge',
  LoadBadgeSuccess = '[Declaration Types] Load Badge Success',
  LoadBagdeFail = '[Declaration Types] Load Badge Fail',
  SetTraderReference = '[Declaration Types] Set Trader Reference',
}

//#region Action Creators
export class ToggleDeclarationTypes implements Action {
  readonly type = DeclarationTypesActionTypes.ToggleDeclaraionTypes;

  constructor(public payload: boolean) {}
}

export class SetCurrentBadge implements Action {
  readonly type = DeclarationTypesActionTypes.SetCurrentBadge;

  constructor(public payload: Badge) {}
}

export class ClearCurrentBadge implements Action {
  readonly type = DeclarationTypesActionTypes.ClearCurrentBadge;

  constructor() {}
}

export class SetTraderReference implements Action {
  readonly type = DeclarationTypesActionTypes.SetTraderReference;

  constructor(public payload: string) {}
}

//#endregion

export type DeclarationTypeActions =
  | ToggleDeclarationTypes
  | SetCurrentBadge
  | ClearCurrentBadge
  | SetTraderReference;
