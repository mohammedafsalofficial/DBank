import { dbank_backend } from "../../declarations/dbank_backend";

const update = async () => {
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);
};

addEventListener("load", async () => {
  update();
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = document.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawlAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank_backend.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank_backend.withDrawl(withdrawlAmount);
  }

  await dbank_backend.compound();

  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);

  update();

  button.removeAttribute("disabled");
});
