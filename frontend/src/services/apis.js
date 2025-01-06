const BASE_URL = "/api/v1";

export const authEndpoints = {
    LOGIN_API: `${BASE_URL}/auth/login`,
    SIGNUP_API: `${BASE_URL}/auth/sign-up`,
};

export const projectEndpoints = {
    CREATE_PROJECT_API: `${BASE_URL}/project/create-project`,
    PROJECT_DETAILS: `${BASE_URL}/project/project-details`,
    FIND_PROJECT: `${BASE_URL}/project/find-project`,
};

export const fileEndpoints = {
    CREATE_FILE_API: `${BASE_URL}/file/create-file`,
    GET_PROJECT_FILE_API: `${BASE_URL}/file/get-project-file`,
    UPDATE_FILE_API: `${BASE_URL}/file/update-file`,
    DELETE_FILE_API: `${BASE_URL}/file/delete-file`,
};
