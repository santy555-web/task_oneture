import { environment } from '../../environments/environment';

const GATEWAY = environment.apiUrl;


export const ApiConstant = {

  getFormURL: `${GATEWAY}dashboard/getUserResponce`,
  getFormByIdURL: `${GATEWAY}dashboard/getUserResponce/`,
  addFormURL: `${GATEWAY}dashboard/addUserResponce/`,
  deleteFormURL: `${GATEWAY}dashboard/deleteUserResponce/`
};

