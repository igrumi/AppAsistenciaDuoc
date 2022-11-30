import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoPageRoutingModule } from './foro-routing.module';

import { ForoPage } from './foro.page';
import { ForumComponent } from 'src/app/components/forum/forum.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoPageRoutingModule
  ],
  declarations: [ForoPage, ForumComponent]
})
export class ForoPageModule {}
