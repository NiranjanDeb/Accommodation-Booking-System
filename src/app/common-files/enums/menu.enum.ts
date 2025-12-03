import { RequestMapper } from "../../request-mapper";

export const MENU_ITEMS = [
    {label: 'Advance Search', route: RequestMapper.PROFILE_SEARCH, icon:'search.svg'},
    {label: 'Worker Details', route: RequestMapper.FILTERANDSEARCH, icon: 'changeDevotee.svg'},
    {label: 'Compare Devotee', route: RequestMapper.DEVOTEE_COMPARE, icon: 'icons8-compare-48.png'},
    {label: 'Change Primary Devotee', route: RequestMapper.CHANGE_PRIMARY_DEVOTEE, icon: 'menu-img.svg'},
    {label: 'Change Family Code', route: RequestMapper.CHANGE_FC, icon:'changefc-img.svg'},


    
    // {label: 'Master Search', route: 'filter-search-main'},
    

]