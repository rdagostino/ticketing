import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    const { headers } = req;

    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: headers,
    });
  }

  return axios.create({
    baseURL: '/',
  });
};

export default buildClient;
