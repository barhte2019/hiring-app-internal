export interface ICaseInstance {
    "case-id": string,
    "case-description": string,
    "case-owner": string,
    "case-status": number,
    "case-definition-id": string,
    "container-id": string,
    "case-started-at": Date,
    "case-completed-at"?: Date,
    "case-completion-msg": string,
    "case-sla-compliance": number,
    "case-sla-due-date"?: Date,
    "case-file"?: any,
    "case-milestones"?: any,
    "case-stages"?: any,
    "case-roles"?: any
}

export interface ICaseInstances {
    instances: ICaseInstance[]
}

export interface IHiringPetition {
    jobTitle: string,
    jobDescription: string,
    location: string
}

export interface IApiJob {
    hiringPetition: IHiringPetition
}

export interface ITaskSummary {
    "task-summary": ITask[]
}

export interface ITask {
    "task-id"?: number,
    "task-name"?: string,
    "task-subject"?: string,
    "task-description"?: string,
    "task-status"?: string,
    "task-priority"?: number,
    "task-is-skipable"?: boolean,
    "task-actual-owner"?: string,
    "task-created-by"?: string,
    "task-created-on"?: {
        "java.util.Date"?: Date
    },
    "task-activation-time"?: {
        "java.util.Date"?: Date
    },
    "task-proc-inst-id"?: number,
    "task-proc-def-id"?: string,
    "task-container-id"?: string,
    "task-parent-id"?: number
}