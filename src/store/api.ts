import axios, { AxiosInstance } from 'axios';
import { IJob } from './jobs/types';

// const API_BASE = 'https://kie-hiring-kieserver-rhpam-user1.apps.9194.openshift.opentlc.com/services/rest/server';
// echo -n adminUser:r3dh4t1! | base64
const API_KEY = 'Basic YWRtaW5Vc2VyOnIzZGg0dDEh'

function api(): AxiosInstance {
    return axios.create({
        headers: {
            Accept: 'application/json',
            'Authorization': API_KEY,
            'Content-Type': 'application/json'
        },
        timeout: 10000,
    });
}

export default {
    jobs: {
        create: (job: IJob) => {
          return api().post(
            '/services/rest/server/containers/hr-hiring/cases/com.myspace.hr_hiring.job-vacancy-lifecycle/instances',
            {
              "case-data": {
                "hiringPetition": {...job}
              },
              "case-group-assignments": { "talent-acquisition": "talent-acquisition" },
              "case-user-assignments" : { "owner" : "adminUser" },
            }
          );
        }
    },
    recipes: {
        list: () => api().get('/recipes', { params: { page: 1, results_per_page: 15 } })
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


 */