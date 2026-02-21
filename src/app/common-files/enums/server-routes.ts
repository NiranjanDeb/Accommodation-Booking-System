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
    SEND_REQ_OTP: `${BASE_URL}/devotee/profile-req`,
    EDIT_NAME: `${BASE_URL}/devotee/name`,
    CONTACT_NUMBERS: `${BASE_URL}/devotee/contact-numbers`,
    AVAILABLE_CONTACT_NUMBERS: `${BASE_URL}/devotee/contact-number-availability`,
    PRIMARY_REQ:`${BASE_URL}/devotee/primary-req`,
    PRIMARY_VERIFY:`${BASE_URL}/devotee/primary-verify`,
    DEVOTEE_ADDRESS: `${BASE_URL}/devotee/address`,
    UPDATE_DEVOTEE_FC: `${BASE_URL}/devotee/family-code-change-req`,
    VALIDATE_DEVOTEE_FC: `${BASE_URL}/devotee/validate-new-familycode`,
    UPDATE_DEVOTEE_AADHAR: `${BASE_URL}/devotee/aadhaar`,
    UPDATE_VISITOR_AADHAR: `${BASE_URL}/devotee/visitor-aadhaar-req`,
    UPDATE_CONTACT_DEVOTEE: `${BASE_URL}/devotee/contact-number`
}