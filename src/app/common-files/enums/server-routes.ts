const BASE_URL = 'https://dev.op.acco.satsang.org.in/api/v1'

export const ROUTES = {
    LOG_IN : `${BASE_URL}/auth/sign`,
    PROFILE_SEARCH: `${BASE_URL}/devotee/profile-search`,
    PROFILE_DETAILS: `${BASE_URL}/devotee/profile/{fc}`,
    PINCODE: `${BASE_URL}/common/pincode/{pincode}`
}