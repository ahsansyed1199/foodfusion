import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs-compat/Subscription';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService, 
    private authService: AuthService){}

  ngOnInit(){
      this.userSub = this.authService.user.subscribe(user =>{
        this.isAuthenticated = !user ? false: true;
      });
  }
  onLogOut(){
    this.authService.logout();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(){
      this.userSub.unsubscribe();
  }
}
