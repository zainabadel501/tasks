import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path : 'NewTask' , component: NewTaskComponent },
   { path : 'Edittask' , component: EditTaskComponent},
   { path : 'SignUp' , component: SignupComponent},
   { path : '' , redirectTo:'Edittask' , pathMatch : 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
