// Initialize button with user's preferred color
let missingOrders = document.getElementById("missingOrders");
let packagedOrders = "";


// When the button is clicked, inject setPageBackgroundColor into current page
missingOrders.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    packagedOrders = getPackagedOrder();
    console.log(packagedOrders);
    console.log(typeof packagedOrders);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: extractOrderId,
    }, findMissingOrder);
  });

function extractOrderId() {
    const orderIds = [...document.querySelectorAll(".order-id > a")].map(x => x.innerText);
    console.log(orderIds);
    return orderIds;
}

function getPackagedOrder() {
    return document.getElementById("orderIds").value.split("\n");
}

function findMissingOrder(resultsArray) {
    const totalOrders = resultsArray[0].result;
    const packages = packagedOrders;
    let missingOrders = totalOrders.filter(x => !packages.includes(x));
    console.log(missingOrders);
    var div = document.getElementById("result");
    div.innerHTML = missingOrders.join("</br>");
}