import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';

@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HomepageComponent,
    RouterModule,
    MenuComponent, 
    AppComponent, 
    HeroComponent, 
    FooterComponent, 
    ArticleComponent, 
    LoginComponent, 
    AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-budget';
}
