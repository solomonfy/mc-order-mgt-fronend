export default function currencyFormat(num) {
  return "$" + `${num.toFixed(2)}`;
}
