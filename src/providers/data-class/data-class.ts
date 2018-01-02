//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataClassProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataClassProvider {

  private freelances = [{
    idUser: 1,
    image:'./assets/img/freelance/business-man.png',
    title:'Nine Inch Nails Live Montréal',
    description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
    job:'Developpeur backend',
    location: 'Paris',
    available:'now'
  }, {
    idUser: 2,
    image:'./assets/img/freelance/computer.jpg',
    title:'Nine Inch Nails Live Paris',
    description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
    job:'Developpeur frontend',
    location: 'Marseille',
    available:'tomorrow'
  }, {
    idUser: 3,
    image:'./assets/img/freelance/manager.jpg',
    title:'Nine Inch Nails Live Tokyo',
    description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
    job:'Fleuriste',
    location: 'Paris',
    available:'next week'
  }, {
    idUser: 4,
    image:'./assets/img/freelance/ruitenwas.jpg',
    title:'Nine Inch Nails Live New York',
    description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
    job:'Electricien',
    location: 'Paris',
    available:'now'
  }, {
    idUser: 5,
    image:'./assets/img/freelance/ruitenwas.jpg',
    title:'Nine Inch Nails Live New York',
    description:'The most popular industrial group ever, and largely responsible for bringing the music to a mass audience.',
    job:'Secretaire',
    location: 'Marseille',
    available:'tomorrow'
  }];

  constructor() {
    console.log('Hello DataClassProvider Provider');
  }
/*   constructor(public http: HttpClient) {
    console.log('Hello DataClassProvider Provider');
  }
 */
  addUser(item) {
    this.freelances.push(item);
  }

  getOneUser(idUser: number) {
    let data = this.freelances.find((item) => item.idUser == idUser);
    return data;
  }

  getAllUsers() {
    return this.freelances;
  }
}
