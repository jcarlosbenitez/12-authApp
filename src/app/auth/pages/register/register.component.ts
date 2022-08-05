import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['carlos', [Validators.required, Validators.minLength(5)]],
    email: ['carlos@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  register() {
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
    const { nombre, email, password } = this.miFormulario.value;
    this.authService.register(nombre, email, password).subscribe((ok) => {
      if (ok === true) {
        Swal.fire('Usuario creado correctamente', ok, 'success');
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('error', ok, 'error');
      }
    });
  }
}
