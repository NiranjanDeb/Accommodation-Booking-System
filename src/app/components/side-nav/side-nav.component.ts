import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { MENU_ITEMS } from '../../common-files/enums/menu.enum';
import { AuthServiceService } from '../../services/auth-service.service';
import { SsoAuthService } from '../../../SsoAuth/Service/sso-auth.service';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit{
  constructor(
    private authService: AuthServiceService,
    private ssoService: SsoAuthService
  ){

  }

  name: string | null = null

  menuItems = MENU_ITEMS
  ngOnInit(): void {
    this.name = localStorage.getItem('fullName')
  }

  logOut(){
    this.authService.logoutUser().subscribe({
      next: (res)=>{
        localStorage.clear()
        this.ssoService.logOut(true)
        console.log('logout');
        
      }
    })
  }

}
