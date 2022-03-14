let changeName = document.getElementById("changeName");

// chrome.browserAction.onClicked.addListener(() => {
// })

changeName.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: scrapeProfile,
  }, function (result) {
    document.getElementById("scrapedName").innerHTML = result[0].result[0];
    document.getElementById("scrapedPosition").innerHTML = result[0].result[1];
    document.getElementById("scrapedCompany").innerHTML = result[0].result[2];
    document.getElementById("scrapedHeadshot").src = result[0].result[3];
  });
})

openMenu.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: clickOpenMenu,
  });
});

goToLinkedin.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: goToLinkedinPage,
  });
});

function scrapeProfile() {
  let profilePic = document.getElementsByClassName("profile-topcard-content-container")[0].querySelector("img[data-anonymize='headshot-photo']").src;
  let name = document.getElementsByClassName("profile-topcard-person-entity__name")[0].innerHTML.trim();
  let currPosition = document.getElementsByClassName("profile-topcard__summary-position-title")[0].innerHTML.trim();
  let currCompany = document.querySelector("a[data-anonymize='company-name']").innerHTML;
  document.querySelector("a[data-anonymize='company-name']").click();
  return [name, currPosition, currCompany, profilePic];
}

function clickOpenMenu() {
  document.querySelector("button[data-test-account-actions-cta='OVERFLOW_MENU']").click();
}

function goToLinkedinPage() {
  document.querySelector("div[data-control-name='view_on_linkedin']").click();
  console.log(document.getElementsByTagName("title"));
}