onst API_BASE = "https://intern-portal-backend.onrender.com";
let currentUser = null;

function showLogin() {
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("dashboard-section").classList.add("hidden");
  document.getElementById("leaderboard-section").classList.add("hidden");
  clearErrors();
}

function showSignup() {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.remove("hidden");
  document.getElementById("dashboard-section").classList.add("hidden");
  document.getElementById("leaderboard-section").classList.add("hidden");
  clearErrors();
}

function clearErrors() {
  document.getElementById("referralError").classList.add("hidden");
  document.getElementById("nameError").classList.add("hidden");
  document.getElementById("signupReferralError").classList.add("hidden");
}

function validateReferral(referral) {
  const regex = /^[a-zA-Z0-9]{5,20}$/;
  return regex.test(referral);
}

function validateName(name) {
  return name.trim().length >= 2;
}

async function loginIntern() {
  const referral = document.getElementById("referralInput").value.trim();
  const errorElement = document.getElementById("referralError");
  const spinner = document.getElementById("loginSpinner");

  if (!referral) {
    errorElement.textContent = "Referral code is required.";
    errorElement.classList.remove("hidden");
    return;
  }
  if (!validateReferral(referral)) {
    errorElement.textContent = "Referral code must be 5-20 alphanumeric characters.";
    errorElement.classList.remove("hidden");
    return;
  }

  errorElement.classList.add("hidden");
  spinner.style.display = "block";

  try {
    const response = await fetch(`${API_BASE}/intern?referral=${referral}`);
    const data = await response.json();
    console.log("API Response:", data);

    if (response.status !== 200) {
      throw new Error(data.error || "Login failed");
    }

    currentUser = data;
    showDashboard(data);
  } catch (error) {
    console.error("Login error:", error);
    errorElement.textContent = error.message || "Login failed. Please try again.";
    errorElement.classList.remove("hidden");
  } finally {
    spinner.style.display = "none";
  }
}

function signupIntern() {
  const name = document.getElementById("signupName").value.trim();
  const referral = document.getElementById("signupReferral").value.trim();
  const nameError = document.getElementById("nameError");
  const referralError = document.getElementById("signupReferralError");
  const spinner = document.getElementById("signupSpinner");

  let hasError = false;

  if (!name) {
    nameError.textContent = "Name is required.";
    nameError.classList.remove("hidden");
    hasError = true;
  } else if (!validateName(name)) {
    nameError.textContent = "Name must be at least 2 characters.";
    nameError.classList.remove("hidden");
    hasError = true;
  } else {
    nameError.classList.add("hidden");
  }

  if (!referral) {
    referralError.textContent = "Referral code is required.";
    referralError.classList.remove("hidden");
    hasError = true;
  } else if (!validateReferral(referral)) {
    referralError.textContent = "Referral code must be 5-20 alphanumeric characters.";
    referralError.classList.remove("hidden");
    hasError = true;
  } else {
    referralError.classList.add("hidden");
  }

  if (hasError) return;

  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    document.getElementById("signupName").value = "";
    document.getElementById("signupReferral").value = "";
    document.getElementById("referralInput").value = referral;
    showLogin();
    alert("Signup successful! Please login with your referral code.");
  }, 1000);
}

function showDashboard(data) {
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("signup-section").classList.add("hidden");
  document.getElementById("dashboard-section").classList.remove("hidden");

  document.getElementById("internName").textContent = data.name || "";
  document.getElementById("referralCode").textContent = data.referral_code || "";
  document.getElementById("donationAmount").textContent = data.donations ? `${data.donations.toLocaleString()} INR` : "0 INR";
  document.getElementById("referralCount").textContent = data.referrals || "0";
  document.getElementById("avgDonation").textContent = data.avg_donation ? `${Math.round(data.avg_donation).toLocaleString()} INR` : "0 INR";
  document.getElementById("goalCompletion").textContent = data.goal_completion ? `${Math.round(data.goal_completion)}%` : "0%";

  const initials = data.name ? data.name.split(" ").map(n => n[0]).join("").toUpperCase() : "";
  document.getElementById("avatarBox").textContent = initials;

  updateProgressBar(data.donations || 0);
  updateRewards(data.donations || 0);
}

function updateProgressBar(donations) {
  const target = 15000;
  const percentage = donations && target ? Math.min((donations / target) * 100, 100) : 0;
  document.getElementById("progressBar").style.width = `${percentage}%`;
  document.getElementById("progressText").textContent = donations && target ? `${donations.toLocaleString()} / ${target.toLocaleString()} INR raised` : "0 INR raised";
  document.getElementById("progressPercent").textContent = `${Math.round(percentage)}%`;
}

function updateRewards(donations) {
  const bronzeCard = document.getElementById("bronzeCard");
  const silverCard = document.getElementById("silverCard");
  const goldCard = document.getElementById("goldCard");

  bronzeCard.classList.remove("bg-yellow-50", "border-yellow-300");
  bronzeCard.classList.add("bg-white", "border-yellow-200");
  bronzeCard.querySelector("div:last-child").textContent = "LOCKED";
  bronzeCard.querySelector("div:last-child").classList.remove("text-green-500", "font-bold");
  bronzeCard.querySelector("div:last-child").classList.add("text-gray-400");

  silverCard.classList.remove("bg-gray-50", "border-gray-300");
  silverCard.classList.add("bg-white", "border-gray-200");
  silverCard.querySelector("div:last-child").textContent = "LOCKED";
  silverCard.querySelector("div:last-child").classList.remove("text-green-500", "font-bold");
  silverCard.querySelector("div:last-child").classList.add("text-gray-400");

  goldCard.classList.remove("bg-yellow-50", "border-yellow-300");
  goldCard.classList.add("bg-white", "border-yellow-200");
  goldCard.querySelector("div:last-child").textContent = "LOCKED";
  goldCard.querySelector("div:last-child").classList.remove("text-green-500", "font-bold");
  goldCard.querySelector("div:last-child").classList.add("text-gray-400");

  if (donations >= 5000) {
    bronzeCard.classList.add("bg-yellow-50", "border-yellow-300");
    bronzeCard.querySelector("div:last-child").textContent = "UNLOCKED";
    bronzeCard.querySelector("div:last-child").classList.add("text-green-500", "font-bold");
    bronzeCard.querySelector("div:last-child").classList.remove("text-gray-400");
  }
  if (donations >= 10000) {
    silverCard.classList.add("bg-gray-50", "border-gray-300");
    silverCard.querySelector("div:last-child").textContent = "UNLOCKED";
    silverCard.querySelector("div:last-child").classList.add("text-green-500", "font-bold");
    silverCard.querySelector("div:last-child").classList.remove("text-gray-400");
  }
  if (donations >= 15000) {
    goldCard.classList.add("bg-yellow-50", "border-yellow-300");
    goldCard.querySelector("div:last-child").textContent = "UNLOCKED";
    goldCard.querySelector("div:last-child").classList.add("text-green-500", "font-bold");
    goldCard.querySelector("div:last-child").classList.remove("text-gray-400");
  }
}

async function showLeaderboard() {
  const table = document.getElementById("leaderboardTable");
  const emptyState = document.getElementById("emptyLeaderboard");

  try {
    const response = await fetch(`${API_BASE}/leaderboard`);
    const data = await response.json();
    console.log("Leaderboard Response:", data);

    if (response.status !== 200 || !data || data.length === 0) {
      table.innerHTML = "";
      emptyState.classList.remove("hidden");
      document.getElementById("dashboard-section").classList.add("hidden");
      document.getElementById("leaderboard-section").classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");
    table.innerHTML = "";

    data.forEach((intern, index) => {
      const row = document.createElement("tr");
      row.className = index % 2 === 0 ? "bg-white" : "bg-gray-50";
      if (currentUser && intern.referral_code === currentUser.referral_code) {
        row.classList.add("bg-indigo-100");
      }
      row.innerHTML = `
        <td class="px-6 py-4 font-medium">${index + 1}</td>
        <td class="px-6 py-4">${intern.name || ""}</td>
        <td class="px-6 py-4 text-gray-600">${intern.referral_code || ""}</td>
        <td class="px-6 py-4 font-semibold text-green-600">${intern.donations ? intern.donations.toLocaleString() + " INR" : "0 INR"}</td>
      `;
      table.appendChild(row);
    });

    document.getElementById("dashboard-section").classList.add("hidden");
    document.getElementById("leaderboard-section").classList.remove("hidden");
  } catch (error) {
    console.error("Leaderboard error:", error);
    table.innerHTML = "";
    emptyState.classList.remove("hidden");
    emptyState.textContent = "Failed to load leaderboard. Please try again.";
    document.getElementById("dashboard-section").classList.add("hidden");
    document.getElementById("leaderboard-section").classList.remove("hidden");
  }
}

function backToDashboard() {
  document.getElementById("leaderboard-section").classList.add("hidden");
  document.getElementById("dashboard-section").classList.remove("hidden");
}

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');
  if (refCode) {
    document.getElementById("referralInput").value = refCode;
  }
});