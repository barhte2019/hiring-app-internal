import axios, { AxiosInstance } from 'axios';
import { IJob } from './jobs/types';
import { ICaseInstances, IApiJob, ITaskSummary } from 'src/common/types';

// const API_BASE = 'https://kie-hiring-kieserver-rhpam-user1.apps.9194.openshift.opentlc.com/services/rest/server';
// echo -n adminUser:r3dh4t1! | base64
const API_KEY = 'Basic YWRtaW5Vc2VyOnIzZGg0dDEh'

function api(): AxiosInstance {
  return axios.create({
    baseURL: process.env.NODE_ENV === "production"?process.env.REACT_APP_KIE_SERVER_URL:'',
    headers: {
      Accept: 'application/json',
      'Authorization': API_KEY,
      'Content-Type': 'application/json'
    },
    timeout: 10000,
  });
}

export interface ICaseMilestones {
  milestones: ICaseMilestone[]
}

export interface ICaseMilestone {
  "milestone-name": string,
  "milestone-id": string,
  "milestone-achieved": boolean,
  "milestone-status": string
}

export default {
  jobs: {
    create: (job: IJob) => {
      return api().post(
        '/services/rest/server/containers/hr-hiring/cases/com.myspace.hr_hiring.job-vacancy-lifecycle/instances',
        {
          "case-data": {
            "hiringPetition": { ...job }
          },
          "case-group-assignments": { "talent-acquisition": "talent-acquisition" },
          "case-user-assignments": { "owner": "adminUser" },
        }
      );
    },
    detail: (jobId: string) => {
      // services/rest/server/containers/hr-hiring/cases/instances/JOB-0000000001/caseFile?name=hiringPetition
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + jobId + '/caseFile';
      return api().get<IApiJob>(url, { params: { 'name': 'hiringPetition' } });
    },
    list: (page: number, pageSize: number) => api().get<ICaseInstances>(
      'services/rest/server/queries/cases/instances',
      {
        params: {
          page,
          'page_size': pageSize
        }
      }
    ),
    milestones: (jobId: string) => {
      // services/rest/server/containers/hr-hiring/cases/instances/JOB-0000000001/milestones?achievedOnly=false&page=0&pageSize=10
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + jobId + '/milestones';
      return api().get<ICaseMilestones>(url, {params: {'achievedOnly': true, page: 0, 'page-size':10, }})
    }
  },
  tasks: {
    listMine: (page: number, pageSize: number) => api().get<ITaskSummary>(
      'services/rest/server/queries/tasks/instances/owners', {
        params: {
          page,
          pageSize
        }
      }),
    listPot: (page: number, pageSize: number) => api().get<ITaskSummary>(
      'services/rest/server/queries/tasks/instances/pot-owners', {
        params: {
          page,
          pageSize
        }
      })
  }
}

/*
Example caseFile with variables and/or case role assignments
{
  "case-data" : {
    "car" : "ford"
  },
  "case-user-assignments" : {
    "insured" : "yoda",
    "insuranceRepresentative" : "john"
  },
  "case-group-assignments" : { },
  "case-data-restrictions" : { }
}

This starts an empty case:
{
  "case-group-assignments" : { "talent-acquisition":"admin" }
}


{
  "case-data" : {
    "hiringPetition" : {"jobTitle": "Javascript Frontend Developer", "jobDescription": "A nice job with a great company, are you ready for this challenge? This could be your next opportunity", "location": "remote Mexico"}
  },
  "case-group-assignments": { "talent-acquisition": "talent-acquisition" },
  "case-user-assignments" : { "owner" : "adminUser" }
}


 */