import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { bookData } from '../interfaces/book-data.interface';

@Component({
  selector: 'app-recently-deleted',
  templateUrl: './recently-deleted.component.html',
  styleUrls: ['./recently-deleted.component.scss']
})
export class RecentlyDeletedComponent implements OnInit {

  public deletedBooks: bookData[] = [];
  public dataSource = new MatTableDataSource<any>(this.deletedBooks);
  public displayedColumns = ['thumbnailUrl', 'title', 'authors', 'shortDescription'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.deletedBooks);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    document.getElementsByClassName('active')[0]?.classList.remove('active');
    document.getElementById('delete-tab').classList.add('active');
    this.deletedBooks = JSON.parse(sessionStorage.getItem('deleted-books'));
    this.dataSource = new MatTableDataSource<any>(this.deletedBooks);
    this.dataSource.paginator = this.paginator;
  }

}
