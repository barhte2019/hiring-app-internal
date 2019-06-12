import axios, { AxiosInstance } from 'axios';

// const API_BASE = 'https://kie-hiring-kieserver-rhpam-user1.apps.9194.openshift.opentlc.com/services/rest/server';
const API_KEY = 'Basic YWRtaW5Vc2VyOmFkbWluMSE='

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
        create: job => api().post(
            '/services/rest/server/containers/hr-hiring/cases/hr-hiring.hiring-case-definition/instances',
            {
                "case-group-assignments": { "talent-acquisition": "admin" }
            })
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