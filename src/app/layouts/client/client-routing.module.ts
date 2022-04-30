import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { DraftComponent } from './draft/draft.component';
import { MailComponent } from './mail/mail.component';
import { ProfileComponent } from './profile/profile.component';
import { SendComponent } from './send/send.component';
import { TrashComponent } from './trash/trash.component';

const routes: Routes = [
  { path: '', redirectTo: '/inbox', pathMatch: 'full' },
  {
    path: '',
    // canActivate: [!AuthGuard],
    component: ClientComponent,
    children: [
      { path: 'inbox', component: MailComponent },
      { path: 'send', component: SendComponent },
      { path: 'draft', component: DraftComponent },
      { path: 'trash', component: TrashComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
