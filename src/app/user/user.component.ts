import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap, switchMap } from 'rxjs';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  users: User[] = [];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadUsers();
  }

  initForm() {
    this.form = this.fb.group({
      id: [],
      name: [''],
      email: ['']
    });
  }

  loadUsers() {
    this.userService.getUsers()
      .subscribe(data => this.users = data);
  }

  save() {
    const user = this.form.value;

    const request$ = user.id
      ? this.userService.updateUser(user)
      : this.userService.createUser(user);

    request$.pipe(
      tap(() => console.log('儲存成功')),
      switchMap(() => this.userService.getUsers())
    ).subscribe(data => {
      this.users = data;
      this.form.reset();
    });
  }

  edit(user: User) {
    this.form.patchValue(user);
  }

  delete(id: number) {
    this.userService.deleteUser(id)
      .pipe(switchMap(() => this.userService.getUsers()))
      .subscribe(data => this.users = data);
  }
}