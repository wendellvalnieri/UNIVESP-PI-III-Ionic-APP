import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SettingsPage } from 'src/app/pages/admin/settings/settings.page';
import { AppService } from 'src/app/services/app.service';

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
  @Input() showCloseModal: boolean = false;
  @Output() btnCloseAction = new EventEmitter<string>();

  private titleSubscription: Subscription;

  constructor(
    private appService: AppService,
    private modalController: ModalController
  ) {
    this.titleSubscription = this.appService.title$.subscribe(
      (newTitle) => (this.title = newTitle)
    );
  }

  ngOnInit() { }

  close() {
    this.btnCloseAction.emit();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  openEnd() {
    const menu = document.getElementsByTagName("ion-menu")[0];
    menu.hidden = !menu.hidden;
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }

  async openSettings() {
    const modal = await this.modalController.create({
      component: SettingsPage,
      componentProps: {
      },
      showBackdrop: true,
      backdropDismiss: true
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) { }
    });

    return await modal.present();
  }
}
