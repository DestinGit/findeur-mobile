import { Pipe } from '@angular/core';
 
@Pipe({
  name: 'application'
})
export class Application {
  transform(value, args) {
    value = (value) ? value:'';
      let ret = false;
      let result = value.split(',');
      // console.log(args);
      ret = (result.indexOf(args) > -1) ? true : false;
      
    return ret;
  }
}