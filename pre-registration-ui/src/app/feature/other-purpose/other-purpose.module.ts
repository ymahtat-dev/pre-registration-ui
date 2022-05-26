import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OtherPurposeRoutingModule } from './other-purpose-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OtherPurposeComponent } from './other-purpose/other-purpose/other-purpose.component';

/**
 * @description This is the feature module for other purpose component.
 * @author Mayura D
 *
 * @export
 * @class OtherPurposeModule
 */
@NgModule({
  declarations: [OtherPurposeComponent],
  imports: [CommonModule, OtherPurposeRoutingModule, FormsModule, ReactiveFormsModule, SharedModule]
})
export class OtherPurposeModule {}
