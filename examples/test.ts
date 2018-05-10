class Person {

  private firstName: string;
  private lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export = Person;


// 在其它文件中使用 test.coffee 实例
import Person from './test.ts'

var homer = new Person('Homer', 'Simpson')
var name = homer.getFullName()

console.log(name)
