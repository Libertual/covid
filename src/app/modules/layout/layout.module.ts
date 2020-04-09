import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MatIconModule
   ]
})
export class LayoutModule { }
