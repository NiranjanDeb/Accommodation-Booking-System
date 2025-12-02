import { Routes } from '@angular/router';
import { RequestMapper } from './request-mapper';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FilterAndSearchComponent } from './components/filter-and-search/filter-and-search.component';
import { HomeSearchComponent } from './components/home-search/home-search.component';
import { CompareDevoteeComponent } from './components/compare-devotee/compare-devotee.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },

    {
        path: RequestMapper.LOGIN, component: LoginPageComponent
    },

    {
        path:  RequestMapper.SIDENAV, component: SideNavComponent,
        children: [
            {
                path: RequestMapper.FILTERANDSEARCH, component: FilterAndSearchComponent
            },
            {
                path: RequestMapper.PROFILE_SEARCH, component: HomeSearchComponent
            },
            {
                path: RequestMapper.DEVOTEE_COMPARE, component: CompareDevoteeComponent
            }
        ]
    },

   
];
