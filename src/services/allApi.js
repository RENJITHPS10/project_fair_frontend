import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//register request
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody, "")

}
// login api
export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}
// upload project
export const uploadProjectApi = async (reqBody, reqHeaders) => {
    return await commonApi('POST', `${serverUrl}/add-project`, reqBody, reqHeaders)
}

export const gethomeprojectsApi = async () => {
    return await commonApi('GET', `${serverUrl}/home-project`)
}

export const getallprojectsApi = async (searchkey, reqHeaders) => {
    // query parameter=baseurl?key=value
    // query paramter=baseurl/id=>baseurl/:id
    return await commonApi('GET', `${serverUrl}/all-project?search=${searchkey}`, "", reqHeaders)

}

export const getuserprojectsApi = async (reqHeaders) => {
    return await commonApi('GET', `${serverUrl}/user-project`, "", reqHeaders)
}

export const deleteuserprojectApi = async (id, reqHeaders) => {
    return await commonApi('DELETE', `${serverUrl}/remove-userproject/${id}`, {}, reqHeaders)
}
// update the project

export const updateuserprojectApi = async (id, reqBody, reqHeaders) => {
    return await commonApi('PUT', `${serverUrl}/update-userproject/${id}`, reqBody, reqHeaders)

}

// update profile

export const updateuserprofileApi=async(reqBody,reqHeaders)=>{
    return await commonApi('PUT',`${serverUrl}/update-userprofile`,reqBody,reqHeaders)

}