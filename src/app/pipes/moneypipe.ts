import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneypipe'
})
export class MoneyPipe implements PipeTransform {

    transform(amount : number): string {

        if (amount == 0) return '$0.00';

            let amountStr: string = String(amount);
            let decimalStr: string = '00';

            if (amountStr.includes(".")) {
               let splitStr = amountStr.split(".");
               amountStr = splitStr[0];
               decimalStr = splitStr[1];
            }


            let finalCommaStr: string = '';
            for (let i = amountStr.length - 1; i >= 0; i--) {
                finalCommaStr = finalCommaStr + amountStr.charAt(i);
                if ((amountStr.length - i)%3 == 0 && i !== 0)
                 finalCommaStr = finalCommaStr + ',';
            }

            let finalAmountStr: string = '';
            for (let i = finalCommaStr.length - 1; i >= 0; i--) {
                finalAmountStr = finalAmountStr + finalCommaStr.charAt(i);
            }
                
            finalAmountStr = finalAmountStr + '.' + decimalStr;

            return '$' + finalAmountStr;




    }

}
