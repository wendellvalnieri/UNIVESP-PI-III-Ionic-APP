import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
  standalone: false
})
export class HeaderAdminComponent implements OnInit {
  @Input() showMenuButton: boolean = true;
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;
  @Input() showCloseButton: boolean = false;
  @Input() showLogoutButton: boolean = true;
  @Input() defaultBackUrl: string = '/';
  @Output() btnCloseAction = new EventEmitter<string>();

  constructor(
    private menu: MenuController,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  close() {
    this.btnCloseAction.emit();
  }
  logout() {
    this.authService.logout();
  }

  openEnd() {
    const menu = document.getElementsByTagName("ion-menu")[0];
    menu.hidden = !menu.hidden;
  }
}
