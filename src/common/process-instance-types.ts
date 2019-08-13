export interface IProcessInstance {
    "process-instance-id" : number,
    "process-id" : string,
    "process-name" : string,
    "process-version" : string,
    "process-instance-state" : number,
    "container-id" : string,
    "initiator" : string,
    "start-date" : {
        "java.util.Date" : Date
    },
    "process-instance-desc" : string,
    "correlation-key" : string,
    "parent-instance-id" : number,
    "sla-compliance" : number
}

export interface IProcessInstances {
    "process-instance": IProcessInstance[]
}