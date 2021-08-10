import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { error } from 'protractor';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  public employees:Employee[];  
  public updateEmployee:Employee;  
  public id :number;
  public deleteEmployee: Employee;
  public viewEmployee:Employee;
  constructor (private employeeService : EmployeeService ){}
ngOnInit(){
this.getEmployees();
}



public getEmployees():void{
  this.employeeService.getEmployees().subscribe(
(response: Employee[])=>{
this.employees=response;
},
(error:HttpErrorResponse)=>{
  alert(error.message);
  
}

  );
}


public onAddEmployee(addForm:NgForm):void{
  document.getElementById('add-employee-form').click();
this.employeeService.addEmployee(addForm.value).subscribe(
(response:Employee)=>{ console.log(response);
  this.getEmployees();
addForm.reset();
},
(error:HttpErrorResponse)=>{  
  alert(error.message);
  addForm.reset();
}

);

}


public onUpdateEmployee(employee:Employee):void{

  document.getElementById('update-employee-form').click();

  this.employeeService.updateEmployee(employee).subscribe(
    (response:Employee)=>{console.log(response);
      this.getEmployees();
    },
(error:HttpErrorResponse)=>{
  alert(error.message);
  
}
  );
  

}


public onDeleteEmployee(employeeId:number):void{
document.getElementById('employee_delete-button').click();
  this.employeeService.deleteEmployee(employeeId).subscribe(
    (response:void)=>{console.log(response);
      this.getEmployees();
    },
(error:HttpErrorResponse)=>{
  alert(error.message);
  this.getEmployees();
}
  );

  

}


public search(key:string): void{
const result:Employee[]=[];
for(const employee of this.employees)
{
if(employee.name.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
employee.email.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
employee.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1 ||
employee.phone.toLowerCase().indexOf(key.toLowerCase())!==-1 )
result.push(employee);
}
this.employees=result // so this will display search result on the screen
// console.log(this.employees);
if(result.length===0 || !key ){
  this.getEmployees();
}
}

public onOpenModal(employee :Employee,mode: string):void{
  const container= document.getElementById('main-container');
const button = document.createElement('button');
button.type='button';
button.style.display='none';
button.setAttribute('data-toggle','modal'); //first attribute
if(mode ==='add'){

  button.setAttribute('data-target','#addemployee'); // second attribute 

}if(mode ==='edit'){
  this.updateEmployee=employee; 

  button.setAttribute('data-target','#updateEmployee1');

}if(mode ==='delete'){
  this.deleteEmployee=employee;
  button.setAttribute('data-target','#deleteEmployeeModal1');

}if(mode ==='view'){
  this.viewEmployee=employee;
  button.setAttribute('data-target','#viewEmployeeModal1');

}
container.appendChild(button);

button.click();

}
}
