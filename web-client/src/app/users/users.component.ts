import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['id', 'username', 'firstName', 'lastName', 'role'];
  usersIcon: string;
  usersTitle: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.reloadUsers();
    this.usersIcon = "people";
    this.usersTitle = "All registered users";
  }

  reloadUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
    });
  }
}
