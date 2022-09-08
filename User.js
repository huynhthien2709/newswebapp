"use strict";
// class User
class User {
  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
  }
}
class Task {
  constructor(taskInput, owner, isDone) {
    this.taskInput = taskInput;
    this.owner = owner;
    this.isDone = isDone;
  }
}
