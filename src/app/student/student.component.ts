import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { studentdata } from './student.model';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  username:string='';
  password:string='';
  message:string='';
  data:any

  showadd!:boolean;
  showupdate!:boolean;
  studentmodelobj:studentdata=new studentdata
  formValue!:FormGroup
  allstudentdata:any;
  constructor(private formBuilder:FormBuilder,private api:ApiService,private router:Router) { }

  ngOnInit(): void
  {
    this.formValue=this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      dob:['',Validators.required],
      height:['',Validators.required],
      weight:['',Validators.required],
      })
      this.getdata()
  }

  add()
  {
    this.showadd=true;
    this.showupdate=false
  }
  edit (data:any)
  {
    this.showupdate=true;
    this.showadd=false;
    this.studentmodelobj.id=data.id;
    this.formValue.controls['name'].setValue(data.name)
    this.formValue.controls['email'].setValue(data.email)
    this.formValue.controls['dob'].setValue(data.dob)
    this.formValue.controls['height'].setValue(data.height)
    this.formValue.controls['weight'].setValue(data.weight)

  }

  update()
  {
    this.studentmodelobj.name=this.formValue.value.name;
    this.studentmodelobj.email=this.formValue.value.email;
    this.studentmodelobj.dob=this.formValue.value.dob;
    this.studentmodelobj.height=this.formValue.value.height;
    this.studentmodelobj.weight=this.formValue.value.weight;

    this.api.updatestudent(this.studentmodelobj,this.studentmodelobj.id).subscribe(res=>{
      this.formValue.reset();
      this.getdata();
      alert("Record Updated Successfully !!!!")
    },
    err=>{
      alert("Something Went Wrong !!!!")
    })
  }

  addstudent()
  {
    this.studentmodelobj.name=this.formValue.value.name;
    this.studentmodelobj.email=this.formValue.value.email;
    this.studentmodelobj.dob=this.formValue.value.dob;
    this.studentmodelobj.height=this.formValue.value.height;
    this.studentmodelobj.weight=this.formValue.value.weight;

    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
      console.log(res)
      this.formValue.reset()
      this.getdata()
      alert("Record Added Successfully !!!!")
    },
    err=>{
      alert("Something Went Wrong !!!!")
    }) 
  }

  getdata()
  {
    this.api.getstudent()
    .subscribe(res=>{
      this.allstudentdata=res;
    })
  }
  deletestudent(data:any)
  {
    if(confirm('Are You Sure Want To Delete ? '))
    this.api.deletestudent(data.id)
    .subscribe(res=>{
      alert("Record Deleted Successfully !!!!");
      this.getdata(); 
    })
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
