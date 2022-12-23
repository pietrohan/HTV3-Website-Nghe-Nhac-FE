import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SongService} from "../../service/song/song.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../security/service/token-storage.service";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css']
})
export class NavbarMenuComponent {

  isLoggedIn?: boolean;
  searchForm!: FormGroup;
  id? :string | null;
  user?: User;

  constructor(private songService: SongService,
              private router: Router,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group(
      {
        nameSearch: ['']
      });
    if (localStorage.getItem('auth-token')){
      this.isLoggedIn = true;
    }
    this.id = localStorage.getItem('idUser');
    // @ts-ignore
    this.userService.getUserById(this.id).subscribe(res => {
      this.user = res;
    });
  }

  search() {
    // @ts-ignore
    this.router.navigate(['/search'], { queryParams: { name: this.searchForm.value.nameSearch } });
  }

  changePage() {
    // @ts-ignore
    this.router.navigate(['/login'] );
  }
  logout(){
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
