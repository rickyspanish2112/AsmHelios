import { Action } from '@ngrx/store';
import { Badge } from '../models/badges';
import { Declarationtype } from '../models/declarationtypes';

export enum DeclarationTypesActionTypes {
  ToggleDeclaraionTypes = '[Declaration Types] Toggle Declaration Types',
  SetCurrentBadge = '[Declaration Types] Set Current Badge',
  SetTraderReference = '[Declaration Types] Set Trader Reference',
  SetCurrentDeclarationType = '[Declaration Types] Set Declaration Type',
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

export class SetTraderReference implements Action {
  readonly type = DeclarationTypesActionTypes.SetTraderReference;

  constructor(public payload: string) {}
}

export class SetCurrentDeclarationType implements Action {
  readonly type = DeclarationTypesActionTypes.SetCurrentDeclarationType;

  constructor(public payload: Declarationtype) {}
}


//#endregion

export type DeclarationTypeActions =
  | ToggleDeclarationTypes
  | SetCurrentBadge
  | SetTraderReference
  | SetCurrentDeclarationType;
