export function convertAmount(num: string): string {
  const amount = parseInt(num);
  var million = Math.floor(amount / 1000000);
  var thousand = (amount % 1000000) / 1000;
  return million + ' triệu ' + thousand + ' nghìn';
}

export function convertAmountRequest(num: number) {

  switch(num) {
    case num = 1: {
       return [0, 1000000]
       break;
    }
    case num = 2: {
       return [1000000, 2000000]
       break;
    }
    case num = 3: {
      return [2000000, 3000000]
      break;
   }
    default: {
       return [null, null]
       break;
    }
 }
}

