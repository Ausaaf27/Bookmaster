import { Component, OnInit } from '@angular/core';
import { Books } from '../books';
import { CrudService } from 'C:/Users/arsha/Book Master/bookmaster/src/app/crud/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Books[] = [];

  constructor(public crudService: CrudService) { }

  ngOnInit() {

    this.crudService.getAll().subscribe((data: Books[])=>{
      console.log(data);
      this.products = data;
    })  
  }

}