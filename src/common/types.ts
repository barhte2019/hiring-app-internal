export interface ICaseInstance {
    "case-id" : string,
    "case-description" : string,
    "case-owner" : string,
    "case-status" : number,
    "case-definition-id" : string,
    "container-id" : string,
    "case-started-at" : Date,
    "case-completed-at"?: Date,
    "case-completion-msg": string,
    "case-sla-compliance" : number,
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