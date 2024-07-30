import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];

  constructor(private toastr: ToastrService, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      data => this.products = data,
      error => this.toastr.error('Failed to load products.', 'Error')
    );
  }

  navigateToCreate() {
    this.router.navigate(['/create-product']);
  }

  viewProduct(id: string) {
    this.router.navigate([`/view-product/${id}`]);
  }

  navigateToEdit(id: string) {
    this.router.navigate([`/edit-product/${id}`]);
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.toastr.success('Product deleted successfully!', 'Success');
          this.loadProducts();
        },
        error => this.toastr.error('Failed to delete product.', 'Error')
      );
    }
  }
}