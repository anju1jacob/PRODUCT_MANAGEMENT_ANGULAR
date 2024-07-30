import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']  // Corrected styleUrl to styleUrls
})
export class CreateProductComponent implements OnInit {

  productForm!: FormGroup;

  constructor(private toastr: ToastrService, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe(
        () => {
          this.toastr.success('Product created successfully!', 'Success');
          this.router.navigate(['/']);
        },
        error => this.toastr.error('Failed to create product.', 'Error')
      );
    } else {
      this.toastr.error('Please fill in all required fields.', 'Error');
    }
  }
}

