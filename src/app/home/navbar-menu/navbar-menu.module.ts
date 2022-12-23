import {NgModule} from "@angular/core";
import {NavbarMenuComponent} from "./navbar-menu.component";
import {MatLegacyMenuModule} from "@angular/material/legacy-menu";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


@NgModule({
  declarations: [
    NavbarMenuComponent
  ],
  exports: [
    NavbarMenuComponent,

  ],

  imports: [
    MatLegacyMenuModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ]
})
export class NavbarMenuModule {
}
