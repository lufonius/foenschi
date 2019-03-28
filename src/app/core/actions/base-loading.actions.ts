import * as uuidv4 from 'uuid/v4';
import { Action } from '@ngrx/store';

/*
 * Actinos getting handled in layout.reducer
 * */

export enum BaseLoadingActionTypes {
	SetLoad = '[BaseLoading] SetLoad',
	SetLoadSuccess = '[BaseLoading] SetLoadSuccess',
	SetLoadFailure = '[BaseLoading] SetLoadFailure'
}

export class SetLoad {
	public request: { loading: boolean; id: string } = {
		loading: false,
		id: null
	};

	constructor(requestId?: string) {
		this.request.id = requestId ? requestId : uuidv4();
		this.request.loading = true;
	}
}

export class SetLoadSuccess extends SetLoad {
	constructor(requestId?: string) {
		super(requestId);
		this.request.loading = false;
	}
}

export class SetLoadFailure extends SetLoadSuccess {
	constructor(requestId?: string) {
		super(requestId);
	}
}

export class SetLoadAction {
	readonly type = BaseLoadingActionTypes.SetLoad;

	constructor(public payload: { loading: boolean; id: string }) {}
}
export class SetLoadSuccessAction {
	readonly type = BaseLoadingActionTypes.SetLoadSuccess;

	constructor(public payload: { loading: boolean; id: string }) {}
}

export class SetLoadFailureAction {
	readonly type = BaseLoadingActionTypes.SetLoadFailure;

	constructor(public payload: { loading: boolean; id: string }) {}
}
