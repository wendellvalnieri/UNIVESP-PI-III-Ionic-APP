import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() showSetttingButton: boolean = true;
  @Input() defaultBackUrl: string = '/';
  @Output() btnCloseAction = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  close() {
    this.btnCloseAction.emit();
  }


  openEnd() {
    const menu = document.getElementsByTagName("ion-menu")[0];
    menu.hidden = !menu.hidden;
  }
}
