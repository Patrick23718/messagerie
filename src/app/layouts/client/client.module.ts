import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { MailComponent } from './mail/mail.component';
import { DetailMessageComponent } from './component/detail-message/detail-message.component';
// import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ListMessageComponent } from './component/list-message/list-message.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProfileComponent } from './profile/profile.component';
import { NouveauMessageComponent } from './component/nouveau-message/nouveau-message.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MailComponent,
    ListMessageComponent,
    DetailMessageComponent,
    ProfileComponent,
    NouveauMessageComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    MatMenuModule,
    MatRippleModule,
    MatFormFieldModule,
    FormsModule,
  ],
})
export class ClientModule {}
