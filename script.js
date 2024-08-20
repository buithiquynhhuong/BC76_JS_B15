const zones = {
  A: 2,
  B: 1,
  C: 0.5,
};

const candidates = {
  1: 2.5,
  2: 1.5,
  3: 1,
};

function priority(selectedZone, selectedCandidate) {
  return selectedCandidate + selectedZone;
}

function sum(num1, num2, num3) {
  return num1 + num2 + num3;
}

function check(num1, num2, num3) {
  if (num1 === 0 || num2 === 0 || num3 === 0) {
    document.getElementById("result1").innerHTML =
      "Since you scored a zero, you didn't pass.";
    return false;
  }
  return true;
}

// Function to compare total score with cut-off score
function compare(total, cutOffScore) {
  if (total >= cutOffScore) {
    document.getElementById("result1").innerHTML =
      `Congratulations! You passed. Your total score is ${total}`;
    document.getElementById("result1").style.display = "block";
  } else {
    document.getElementById("result1").innerHTML =
      `Sorry, you didn't pass. Your score is ${total}. It's less than the cut-off score is ${cutOffScore}.`;
    document.getElementById("result1").style.display = "block";
  }
}

// Event listener for calculating results
document.getElementById("calEx1").onclick = function () {
  // Get values from input fields and ensure they are numbers
  let cutOffScore = parseFloat(document.getElementById("cutOffScore").value);
  let num1 = parseFloat(document.getElementById("score1").value);
  let num2 = parseFloat(document.getElementById("score2").value);
  let num3 = parseFloat(document.getElementById("score3").value);

  // Check if any input is not a valid number
  if (isNaN(cutOffScore) || isNaN(num1) || isNaN(num2) || isNaN(num3)) {
    document.getElementById("result1").innerHTML =
      "Please enter valid numbers for all fields.";
    document.getElementById("result1").style.display = "block";
    return;
  }

  // Get selected zone and candidate
  let zone = document.getElementById("zoneSelect").value;
  let candidate = document.getElementById("candidateSelect").value;

  // Ensure that the selected zone and candidate are valid
  let selectedZone = zones[zone];
  let selectedCandidate = candidates[candidate];

  if (selectedZone === undefined || selectedCandidate === undefined) {
    document.getElementById("result1").innerHTML =
      "Invalid zone or candidate selected.";
    document.getElementById("result1").style.display = "block";
    return;
  }

  // Check scores and calculate total
  if (check(num1, num2, num3)) {
    let total = sum(num1, num2, num3);
    total += priority(selectedZone, selectedCandidate); // Add priority score to the total
    compare(total, cutOffScore);
  }
};

// ex2
const rate0to50 = 500;
const rate50to100 = 650;
const rate100to200 = 850;
const rate200to350 = 1100;
const rateUpTo350 = 1300;
let total = 0;
let result = "";

function elec0To50(numElectric) {
  return numElectric <= 50 ? numElectric * rate0to50 : 50 * rate0to50;
}

function elec50To100(numElectric) {
  if (50 < numElectric && numElectric <= 100)
    return (numElectric - 50) * rate50to100;
  else if (numElectric > 100) return 50 * rate50to100;
  return 0;
}

function elec100To200(numElectric) {
  if (100 < numElectric && numElectric <= 200)
    return (numElectric - 100) * rate100to200;
  else if (numElectric > 200) return 100 * rate100to200;
  return 0;
}

function elec200To350(numElectric) {
  if (200 < numElectric && numElectric <= 350) {
    return (numElectric - 200) * rate200to350;
  } else if (numElectric > 350) return 150 * rate200to350;
  return 0;
}

function extraElec350(numElectric) {
  return numElectric > 350 ? (numElectric - 350) * rateUpTo350 : 0;
}

function totalElectricity(numElectric) {
  total = 0;
  total += elec0To50(numElectric);
  total += elec50To100(numElectric);
  total += elec100To200(numElectric);
  total += elec200To350(numElectric);
  total += extraElec350(numElectric);
  return total;
}

document.getElementById("calEx2").onclick = function () {
  let name = document.getElementById("fullName").value;
  let numElectric = parseInt(document.getElementById("numElectric").value);

  if (isNaN(numElectric) || numElectric < 0 || name === "") {
    document.getElementById("result2").innerHTML =
      "Please do not enter number less than 0 or empty username !!!";
    document.getElementById("result2").style.display = "block";
  } else {
    totalElectricity(numElectric);
    result = `Electricity bill of <b>${name}</b> is <b style="color: rgba(251,73,117,0.88)">${total.toLocaleString(
      "it-IT",
      {
        style: "currency",
        currency: "VND",
      },
    )}</b> `;
    document.getElementById("result2").innerHTML = result;
    document.getElementById("result2").style.display = "block";
  }
};
// ex3
let personalDeduction = 4000000;
let dependentDeduction = 1600000;
const TAXRATE60 = 5 / 100;
const TAXRATE60TO120 = 10 / 100;
const TAXRATE120TO210 = 15 / 100;
const TAXRATE210TO384 = 20 / 100;
const TAXRATE384TO624 = 25 / 100;
const TAXRATE624TO960 = 30 / 100;
const TAXRATEUPTO960 = 35 / 100;

function totalIncome(totalYear, totalDependents) {
  let total =
    totalYear - personalDeduction - totalDependents * dependentDeduction;

  // Kiểm tra nếu tổng thu nhập chịu thuế âm không cần nộp thuế
  if (total <= 0) {
    return 0;
  }
  return total;
}

function taxPayable(total) {
  if (total === 0) {
    return 0;
  }

  const taxBrackets = [
    { limit: 60000000, rate: TAXRATE60 },
    { limit: 120000000, rate: TAXRATE60TO120 },
    { limit: 210000000, rate: TAXRATE120TO210 },
    { limit: 384000000, rate: TAXRATE210TO384 },
    { limit: 624000000, rate: TAXRATE384TO624 },
    { limit: 960000000, rate: TAXRATE624TO960 },
  ];

  for (let i = 0; i < taxBrackets.length; i++) {
    if (total <= taxBrackets[i].limit) {
      return total * taxBrackets[i].rate;
    }
  }

  return total * TAXRATEUPTO960;
}

document.getElementById("calEx3").onclick = function () {
  let name = document.getElementById("nameTax").value;
  let totalYear = parseFloat(document.getElementById("totalYear").value);
  let totalDependents = parseInt(document.getElementById("peopleDepend").value);

  // Kiểm tra điều kiện đầu vào ô input
  if (
    isNaN(totalYear) ||
    totalYear < 0 ||
    isNaN(totalDependents) ||
    totalDependents < 0 ||
    name === ""
  ) {
    document.getElementById("result3").innerHTML =
      "Please enter positive numbers and do not leave any fields empty !!!";
    document.getElementById("result3").style.display = "block";
    return;
  } else {
    let total = totalIncome(totalYear, totalDependents);
    let taxPayables = taxPayable(total);

    result = `Tax payable of <b>${name}</b> is <b style="color: rgba(251,73,117,0.88)">${taxPayables.toLocaleString(
      "it-IT",
      {
        style: "currency",
        currency: "VND",
      },
    )}</b>`;

    document.getElementById("result3").innerHTML = result;
    document.getElementById("result3").style.display = "block";
  }
};
// EX4
// DÂN: PHÍ HÓA ĐƠN + PHÍ CƠ BẢN + PHÍ CAO CẤP * SỐ KÊNH

// DOANH NGHIỆP: PHÍ HÓA ĐƠN + PHÍ CƠ BẢN + PHÍ CAO CẤP * SỐ KÊNH (VỚI CASE CƠ BẢN LÀ <= 10 ĐẦU KẾT NỐI )
// NẾU NHƯ > 10 ĐẦU THÌ TỔNG PHÍ SẼ TĂNG LÊN VỚI 1 ĐẦU LÀ 5$
const FEE_PERSONAL = 4.5;
const SERVICE_FEE = 20.5;
const FEE_CHANNEL_PERSONAL = 7.5;
const FEE_BUSINESS = 15;
const SERVICE_FEE_BUSINESS = 75;
const SERVICE_FEE_BUSINESS_EXTRA = 5;
const FEE_CHANNEL_BUSINESS = 50;

function calPersonal(chanelPrime) {
  return FEE_PERSONAL + SERVICE_FEE + FEE_CHANNEL_PERSONAL * chanelPrime;
}

function calBusiness(chanelPrime, channelConnect) {
  let total =
    FEE_BUSINESS + SERVICE_FEE_BUSINESS + FEE_CHANNEL_BUSINESS * chanelPrime;
  if (channelConnect > 10) {
    total += (channelConnect - 10) * SERVICE_FEE_BUSINESS_EXTRA;
  }
  return total;
}

document
  .getElementById("typeCustomers")
  .addEventListener("change", function () {
    let valueSelect = document.getElementById("typeCustomers").value;
    let channelConnectDiv = document.querySelector(".channelConnect");
    let channelConnectInput = document.getElementById("channelConnect");

    if (valueSelect === "business") {
      channelConnectDiv.style.display = "block";
    } else {
      channelConnectDiv.style.display = "none";
      channelConnectInput.value = "";
    }
  });

document.getElementById("calEx4").onclick = function () {
  let valueSelect = document.getElementById("typeCustomers").value;
  let codeNumber = parseInt(document.getElementById("codeNumber").value);
  let channelPrime = parseInt(document.getElementById("channelPrime").value);
  let channelConnect = parseInt(
    document.getElementById("channelConnect").value,
  );

  // Kiểm tra các điều kiện đầu vào
  if (valueSelect !== "personal" && valueSelect !== "business") {
    alert("Please enter type of customers.");
    return;
  }
  if (isNaN(codeNumber) || codeNumber < 0) {
    alert("Please enter a valid code number.");
    return;
  }
  if (isNaN(channelPrime) || channelPrime < 0) {
    alert("Please enter a valid number of prime channels.");
    return;
  }
  if (
    valueSelect === "business" &&
    (isNaN(channelConnect) || channelConnect < 0)
  ) {
    alert("Please enter a valid number of connected channels.");
    return;
  }

  let result;
  if (valueSelect === "personal") {
    result = calPersonal(channelPrime);
  } else {
    result = calBusiness(channelPrime, channelConnect);
  }

  document.getElementById("result4").innerHTML =
    `Your code is ${codeNumber} - Total fee is <b style="color: rgba(251,73,117,0.88)">${result.toLocaleString(
      "US",
      {
        style: "currency",
        currency: "USD",
      },
    )}</b>`;
};
