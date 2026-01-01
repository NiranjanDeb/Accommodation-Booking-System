const BASE_URL = 'https://dev.op.acco.satsang.org.in/api/v1'

export const ROUTES = {
    LOG_IN : `${BASE_URL}/auth/sign`,
    PROFILE_SEARCH: `${BASE_URL}/devotee/profile-search`,
    PROFILE_DETAILS: `${BASE_URL}/devotee/profile`,
    PINCODE: `${BASE_URL}/common/pincode`,
    STATES: `${BASE_URL}/common/states`,
    BOOKING_DETAILS: `${BASE_URL}/booking/list`,
    BOOKING_ID: `${BASE_URL}/booking/details`,
    VISIT_DETAILS: `${BASE_URL}/booking/visits`
}