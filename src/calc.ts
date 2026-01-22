type Props = {
    price: number;
    discount?: number;
    isInstallment?: boolean;
    months?: number;
}

const totalPrice = ({ price, discount = 0, isInstallment, months = 12 }: Props):number => {
  if (discount > 1) {
    discount = discount / 100;
  }

  const discountPrice = price - price * discount;
  const result = discountPrice

  return isInstallment ? discountPrice / months : result;
};

const price = totalPrice({ price: 100000, discount: 25, isInstallment: true, months: 12 });
console.log(price); // 6250