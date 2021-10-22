import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { bookData } from '../interfaces/book-data.interface';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-addeditbook',
  templateUrl: './addeditbook.component.html',
  styleUrls: ['./addeditbook.component.scss']
})
export class AddeditbookComponent implements OnInit {

  private isEdit: boolean = false;

  public bookForm = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl(''),
    thumbnailUrl: new FormControl(''),
    authors: new FormControl(''),
    categories: new FormControl(''),
    status: new FormControl(''),
    isbn: new FormControl(''),
    pageCount: new FormControl(''),
    shortDescription: new FormControl(''),
    longDescription: new FormControl(''),
    publishedDate: new FormControl(''),
  });

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    document.getElementsByClassName('active')[0]?.classList.remove('active');
    this.isEdit = false;
    this.sharedService.editBook
      .subscribe((book: bookData) => {
        if (book) {
          this.bookForm.get('_id').setValue(book?._id);
          this.bookForm.get('title').setValue(book?.title);
          this.bookForm.get('authors').setValue(book?.authors?.toString());
          this.bookForm.get('thumbnailUrl').setValue(book?.thumbnailUrl);
          this.bookForm.get('status').setValue(book?.status);
          this.bookForm.get('categories').setValue(book?.categories?.toString());
          this.bookForm.get('isbn').setValue(book?.isbn);
          this.bookForm.get('pageCount').setValue(book?.pageCount);
          this.bookForm.get('shortDescription').setValue(book?.shortDescription);
          this.bookForm.get('longDescription').setValue(book?.longDescription);
          this.bookForm.get('publishedDate').setValue(new Date(book?.publishedDate.$date ? book?.publishedDate.$date : book?.publishedDate));
          this.isEdit = true;
        }
      });
  }

  onSubmit() {
    let bookData = this.bookForm.value;
    bookData['publishedDate']['$date'] = {};
    bookData['publishedDate']['$date'] = bookData['publishedDate']
    bookData['status'] = bookData['status'].toUpperCase();
    bookData['authors'] = bookData['authors'].split(',');
    bookData['categories'] = bookData['categories'].split(',');
    let booklist: bookData[] = JSON.parse(sessionStorage.getItem('booklist'));
    if (this.isEdit) {
      booklist[bookData['_id']] = { ...bookData };
    } else {
      booklist.push({ ...bookData });
    }
    sessionStorage.setItem('booklist', JSON.stringify([...booklist]));
    this.goToHome();
  }

  goToHome() {
    this.router.navigateByUrl('/landing-page/recent-books')
  }


}
