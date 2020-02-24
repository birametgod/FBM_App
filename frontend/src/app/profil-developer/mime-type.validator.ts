import { AbstractControl } from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';
// property name binding
export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{ [key: string]: any }>) => {
    if (typeof file === 'string') {
      return of(null);
    }
    // WITH LOADEND WE HAVE MORE INFORMATION ABOUT A FILE
    fileReader.addEventListener('loadend', () => {
      const array = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      let isValid = false;
      for (let index = 0; index < array.length; index++) {
        header += array[index].toString(16);
      }
      // find valid png or jpeg file
      switch (header) {
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file); // ALLOW US TO ACCESS THE MIME TYPE
  });
  return frObs;
};
