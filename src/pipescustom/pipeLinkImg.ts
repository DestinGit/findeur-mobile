import { Pipe , PipeTransform} from '@angular/core';

@Pipe({
  name: 'pipelinkimg'
})
export class PipeLinkImg implements PipeTransform {
  transform(value, args) {
    value = (value) ? value:'';
    let image = ['architect.jpg', 'office62.jpg', 'card-sf.jpg', 'card-saopaolo.jpg'];
    let localLink = './assets/img/';
    // let findeurLink = 'http://findeur2017.findeur.fr/images/';
    let findeurLink = 'http://findtest.findeur.fr/images/';
    let value2 = value.replace(' ','');

    let ext = 'jpg';
    if(args) {
      let splitNameOfImg = args.split('.');
      ext = splitNameOfImg[1];
    }

    return (value.length > 0) ?
      `${findeurLink}${value2}.${ext}` :
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