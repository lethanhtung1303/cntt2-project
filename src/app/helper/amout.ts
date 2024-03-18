export function convertAmount(amount: number): string {
  const million: number = Math.floor(amount / 1000000);
  const thousand: number = (amount % 1000000) / 1000;
  return million + ' triệu ' + thousand + ' nghìn';
}

export function convertAmountRequest(num: number) {

  switch (num) {
    case num = 1: {
      return [0, 1000000]
    }
    case num = 2: {
      return [1000000, 2000000]
    }
    case num = 3: {
      return [2000000, 3000000]
    }
    default: {
      return [null, null]
    }
  }
}

