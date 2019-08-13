import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IJob } from './jobs/types';
import { ICaseInstances, IApiJob, ITaskSummary } from 'src/common/types';
import { IProcessInstances } from 'src/common/process-instance-types';

function api(): AxiosInstance {
  const tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Authorization': 'Bearer ' + tokens.token,
      'Content-Type': 'application/json'
    },
    timeout: 10000,
  };

  if (process.env.NODE_ENV === "production") {
    // tslint:disable-next-line:no-string-literal
    axiosConfig.baseURL = window['_env_'].KIE_URL;
  }

  return axios.create(axiosConfig);
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
    create: (job: IJob, owner: string) => {
      return api().post(
        '/services/rest/server/containers/hr-hiring/cases/com.myspace.hr_hiring.job-vacancy-lifecycle/instances',
        {
          "case-data": {
            "hiringPetition": { ...job }
          },
          "case-group-assignments": { 
            "benefits-compensation": "talent-acquisition",
            "talent-acquisition": "talent-acquisition",  
            "vacancy-department": "talent-acquisition",
          },
          "case-user-assignments": { "owner": owner },
        }
      );
    },
    detail: (jobId: string) => {
      // services/rest/server/containers/hr-hiring/cases/instances/JOB-0000000001/caseFile?name=hiringPetition
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + jobId + '/caseFile';
      return api().get<IApiJob>(url, {
        params: { 'name': 'hiringPetition' }
      });
    },
    list: (page: number, pageSize: number) => api().get<IProcessInstances>(
      'services/rest/server/containers/hr-hiring_1.0.0/processes/instances', {
        params: {
          page,
          pageSize
        }
      }),
    /*
    FIXME:
    - services/rest/server/queries/cases/instances
    - services/rest/server/containers/{containerId}/cases/{caseDefId}/instances
    Are returning an empty list, I had to replace by: 
    - services/rest/server/containers/hr-hiring_1.0.0/processes/instances?page=0&pageSize=10&sortOrder=true
    list: (page: number, pageSize: number) => api().get<ICaseInstances>(
      'services/rest/server/queries/cases/instances',
      {
        params: {
          page,
          'page_size': pageSize
        }
      }
    ),*/
    milestones: (jobId: string) => {
      // services/rest/server/containers/hr-hiring/cases/instances/JOB-0000000001/milestones?achievedOnly=false&page=0&pageSize=10
      const url = 'services/rest/server/containers/hr-hiring/cases/instances/' + jobId + '/milestones';
      return api().get<ICaseMilestones>(url, {
        params: { 'achievedOnly': true, page: 0, 'page-size': 10, }
      })
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