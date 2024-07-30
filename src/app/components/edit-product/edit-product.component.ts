import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']  // Corrected styleUrl to styleUrls
})
export class EditProductComponent implements OnInit {

  productForm!: FormGroup;
  productId!: string;

  constructor(private toastr: ToastrService, private router: Router, private productService: ProductService, private route: ActivatedRoute) { 
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this.productId).subscribe(
      product => this.productForm.setValue({
        name: product.name,
        description: product.description,
        price: product.price
      }),
      error => this.toastr.error('Failed to load product.', 'Error')
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe(
        () => {
          this.toastr.success('Product updated successfully!', 'Success');
          this.router.navigate(['/']);
        },
        error => this.toastr.error('Failed to update product.', 'Error')
      );
    }
    else {
      this.toastr.error('Please fill in all required fields.', 'Error');
    }
  }
}
