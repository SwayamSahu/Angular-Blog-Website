import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

import { TravelComponent } from './categories/travel/travel.component';
import { LifestyleComponent } from './categories/lifestyle/lifestyle.component';
import { ScienceComponent } from './categories/science/science.component';
import { ArtComponent } from './categories/art/art.component';
import { AddNewBlogComponent } from './add-new-blog/add-new-blog.component';
import { BlogDataComponent } from './blog-data/blog-data.component';
import { MyBlogComponent } from './my-blog/my-blog.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {
        path:'',
        component:HomeComponent

    },
    {
path:'login',
component:LoginComponent
    ,
},
{
    path:'main',
    component:MainComponent,
    canActivate:[authGuard]
},

{
    path:'art',
    component:ArtComponent,
    canActivate:[authGuard]
},
{
    path:'science',
    component:ScienceComponent,
    canActivate:[authGuard] 
},
{
    path:'lifestyle',
    component:LifestyleComponent,
    canActivate:[authGuard]
},
{
    path:'travel',
    component:TravelComponent,
    canActivate:[authGuard]
},
{
    path:'add-new-blog',
    component:AddNewBlogComponent,
    canActivate:[authGuard]
},

{
    path:'blog-data',
    component:BlogDataComponent,
    canActivate:[authGuard]
},{
    path:'main/my-blog',
    component:MyBlogComponent,
    canActivate:[authGuard]
}



];
