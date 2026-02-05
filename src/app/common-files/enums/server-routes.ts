import { environment } from "../../../environments/environment.development"

const BASE_URL = environment.BASE_URL

export const ROUTES = {
    LOG_IN : `${BASE_URL}/auth/sign-user`,
    LOG_OUT: `${BASE_URL}/auth/logout`,
    PROFILE_SEARCH: `${BASE_URL}/devotee/profile-search`,
    PROFILE_DETAILS: `${BASE_URL}/devotee/profile`,
    VISITORS_DETAILS: `${BASE_URL}/devotee/visitors`,
    FC_DETAILS: `${BASE_URL}/devotee/fc`,
    PINCODE: `${BASE_URL}/common/pincode`,
    STATES: `${BASE_URL}/common/states`,
    BOOKING_DETAILS: `${BASE_URL}/booking/list`,
    BOOKING_ID: `${BASE_URL}/booking/details`,
    VISIT_DETAILS: `${BASE_URL}/booking/visits`,
    SEND_REQ_OTP: `${BASE_URL}/devotee/profile-req`
}