const form = document.querySelector("#payment-form");
const transactionList = document.querySelector("#transaction-list");
const emptyState = document.querySelector("#empty-state");
const toast = document.querySelector("#toast");
const clearButton = document.querySelector("#clear-button");

const formatPhone = (phone) => `254 ${phone.slice(0, 3)} *** ${phone.slice(-3)}`;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const submitButton = form.querySelector("button[type='submit']");
  const reference = String(data.get("reference"));
  const phone = String(data.get("phone"));
  const amount = Number(data.get("amount"));

  submitButton.disabled = true;
  submitButton.firstChild.textContent = "Sending request... ";

  window.setTimeout(() => {
    const row = document.createElement("tr");
    const referenceCell = row.insertCell();
    const referenceLabel = document.createElement("strong");
    const timestamp = document.createElement("small");
    const status = document.createElement("span");

    referenceLabel.textContent = reference;
    timestamp.textContent = "Just now";
    referenceCell.append(referenceLabel, timestamp);
    row.insertCell().textContent = formatPhone(phone);
    row.insertCell().textContent = `KES ${amount.toLocaleString()}`;
    status.className = "status pending";
    status.textContent = "Pending";
    row.insertCell().append(status);
    transactionList.prepend(row);
    emptyState.hidden = true;
    toast.hidden = false;
    submitButton.disabled = false;
    submitButton.firstChild.textContent = "Send payment request ";

    window.setTimeout(() => {
      row.querySelector(".status").className = "status success";
      row.querySelector(".status").textContent = "Completed";
      toast.querySelector("small").textContent = "Sandbox callback received successfully.";
    }, 1400);

    window.setTimeout(() => { toast.hidden = true; }, 4400);
  }, 500);
});

clearButton.addEventListener("click", () => {
  transactionList.replaceChildren();
  emptyState.hidden = false;
});
