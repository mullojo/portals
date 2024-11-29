import qr from "https://cdn.jsdelivr.net/npm/qr-code-styling@1.6.0-rc.1/+esm";

let address = "bc1q6z4nspyadq0sdq3vkcdtxxzwlywfva557wfqsm0h5g5xnnzrmpdq4cmhe6";

let options = {
  width: 222,
  height: 222,
  type: "svg",
  data: address,
  dotsOptions: {
    color: "hotpink",
    type: "dots"
  },
  cornersSquareOptions: {
    type: "dot"
  },
  cornersDotOptions: {
    type: "dot"
  },
  backgroundOptions: {
    color: null
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
};

let qrCode = new qr(options);

qrCode.append(document.getElementById("qr-code"));

let addressElem = document.getElementById("address");
addressElem.innerHTML = truncateAddress(address);

document.getElementById("copy-btn").addEventListener("click", copyAddress);

function copyAddress() {
  const button = document.getElementById("copy-btn");
  button.disabled = true; // Disable the button
  navigator.clipboard
    .writeText(address)
    .then(() => {
      addressElem.innerHTML = "Address Copied ✅";

      setTimeout(() => {
        addressElem.textContent = truncateAddress(address);
        button.disabled = false; // Re-enable the button after reset
      }, 2222);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
      button.disabled = false; // Re-enable in case of an error
    });
}

function truncateAddress(address) {
  const screenWidth = window.innerWidth;

  if (screenWidth < 500) {
    // For narrow screens, show the truncated address
    return address.slice(0, 6) + "..." + address.slice(-6);
  } else {
    // Return full address for wider screens
    return address;
  }
}

function updateAddress() {
  addressElem.textContent = truncateAddress(address);
}

window.addEventListener("resize", updateAddress);
window.addEventListener("load", updateAddress);