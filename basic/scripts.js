import qr from "https://cdn.jsdelivr.net/npm/qr-code-styling@1.6.0-rc.1/+esm";

let address = "bc1q6z4nspyadq0sdq3vkcdtxxzwlywfva557wfqsm0h5g5xnnzrmpdq4cmhe6";

let options = {
  width: 222,
  height: 222,
  type: "svg",
  data: address,
  dotsOptions: { color: "hotpink", type: "dots" },
  cornersSquareOptions: { type: "dot" },
  cornersDotOptions: { type: "dot" },
  backgroundOptions: { color: null },
  imageOptions: { crossOrigin: "anonymous", margin: 20 }
};

const qrCodeElem = document.getElementById("qr-code");
if (qrCodeElem) {
  const qrCode = new qr(options);
  qrCode.append(qrCodeElem);
}

const addressElem = document.getElementById("address");
if (addressElem) {
  addressElem.innerHTML = truncateAddress(address);
}

const copyBtn = document.getElementById("copy-btn");
if (copyBtn) {
  copyBtn.addEventListener("click", copyAddress);
}

function copyAddress() {
  if (!navigator.clipboard) return;
  copyBtn.disabled = true;

  navigator.clipboard
    .writeText(address)
    .then(() => {
      if (addressElem) {
        addressElem.innerHTML = "Address Copied ✅";
        setTimeout(() => {
          addressElem.textContent = truncateAddress(address);
          copyBtn.disabled = false;
        }, 2222);
      }
    })
    .catch((err) => {
      console.error("Clipboard write failed:", err);
      copyBtn.disabled = false;
    });
}

function truncateAddress(address) {
  const screenWidth = window.innerWidth;
  return screenWidth < 500
    ? address.slice(0, 6) + "..." + address.slice(-6)
    : address;
}

function updateAddress() {
  if (addressElem) addressElem.textContent = truncateAddress(address);
}

window.addEventListener("resize", updateAddress);
window.addEventListener("load", updateAddress);