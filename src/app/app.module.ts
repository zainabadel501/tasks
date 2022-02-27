import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; 
import { AngularFireModule } from '@angular/fire/compat';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { DataService } from './shared/data.service';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    NewTaskComponent,
    EditTaskComponent,
    HomepageComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgMaterialModule,
    BrowserAnimationsModule,
    MatSelectModule
   
    
   
    
    
  ],
  providers: [ApiService , DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
