import { MONEY } from "./../constants/constants";
export const updateMoneyLeftBy = (change: number) => {
  MONEY.amount += change;
  document.getElementById("money-left").textContent = MONEY.amount.toString();
};
