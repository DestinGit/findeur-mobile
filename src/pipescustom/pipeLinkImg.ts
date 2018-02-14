import { Pipe , PipeTransform} from '@angular/core';

@Pipe({
  name: 'pipelinkimg'
})
export class PipeLinkImg implements PipeTransform {
  transform(value, args) {
    let image = ['architect.jpg', 'office62.jpg', 'card-sf.jpg', 'card-saopaolo.jpg'];
    let localLink = './assets/img/';
    let findeurLink = 'http://findeur2017.findeur.fr/images/';

    return (value.length > 0) ?
      `${findeurLink}${value}t.jpg` :
      `${localLink}${image[this.entierAleatoire(0, 3)]}`;
  }

  /**
 * Return a random number
 * @param {number} min
 * @param {number} max 
 * @returns {number}
 */
  entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}