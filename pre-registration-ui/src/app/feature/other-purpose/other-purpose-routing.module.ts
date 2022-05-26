import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { OtherPurposeComponent } from './other-purpose/other-purpose/other-purpose.component';

const routes: Routes = [
  {
    path: '',
    component: OtherPurposeComponent,
    canActivate: [AuthGuardService]
  }
];

/**
 * @description This module defines the route path for the other purpose feature.
 * @author Mayura D
 *
 * @export
 * @class OtherPurposeRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherPurposeRoutingModule {}
