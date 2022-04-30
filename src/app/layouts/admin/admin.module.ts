import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { SideComponent } from './component/side/side.component';

@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    SideComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
