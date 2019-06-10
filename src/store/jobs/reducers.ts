import {
    IJobState,
    JobActionTypes,
    INPUT_CHANGE
} from './types';

const initialState: IJobState = {
    newJob: { jobPostTitle: '' }
}

export function jobsReducer(
    state = initialState,
    action: JobActionTypes
): IJobState {
    switch (action.type) {
        case INPUT_CHANGE: {
            return {
                ...state,
                newJob: { jobPostTitle: action.value }
            }
        }
        default: return state;
    }
}