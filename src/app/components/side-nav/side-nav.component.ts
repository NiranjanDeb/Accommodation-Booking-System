import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { MENU_ITEMS } from '../../common-files/enums/menu.enum';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit{

  menuItems = MENU_ITEMS
  ngOnInit(): void {
  }

}
