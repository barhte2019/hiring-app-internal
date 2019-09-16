import {
    INTERVIEWER_FEEDBACK_REVIEW_TOGGLE,
    INTERVIEWER_FEEDBACK_LIST_LOADING, INTERVIEWER_FEEDBACK_LIST_SUCCEED, INTERVIEWER_FEEDBACK_LIST_FAILED
} from './types';

import api from 'src/store/api';
import { IInterviewerFeedback } from '../interviewer-feedback/types';

export function interviewerFeedbackReviewModalToggle() {
    return { type: INTERVIEWER_FEEDBACK_REVIEW_TOGGLE }
}

export function interviewerFeedbackReviewModalOpen(taskId: number) {
    return dispatch => {
        dispatch({ type: INTERVIEWER_FEEDBACK_LIST_LOADING });
        return api.tasks.detail(taskId)
            .then(response => {
                const responseFeedbacks: any[] = response.data.interviewerFeedbackList;
                const feedbacks: IInterviewerFeedback[] = responseFeedbacks.map<IInterviewerFeedback>(item => {
                    if (item['com.myspace.hr_hiring.InterviewerFeedback']) {
                        return { ...item['com.myspace.hr_hiring.InterviewerFeedback'] }
                    } else {
                        return { ...item }
                    }
                })

                dispatch(interviewerFeedbackReviewModalToggle());
                return dispatch({ type: INTERVIEWER_FEEDBACK_LIST_SUCCEED, feedbacks })
            })
            .catch(err => {
                return dispatch({ type: INTERVIEWER_FEEDBACK_LIST_FAILED, serverErrors: err })
            });
    }
}