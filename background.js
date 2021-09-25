chrome.action.setBadgeText({ text: "NOPE" });
chrome.action.setBadgeBackgroundColor({ color: "#4125dd" });

let reloads_holder = {};

const YEP = "Yep";
const NOPE = "Nope";

// Main auto-reload function
// chrome.storage.onChanged.addListener((whatChanged, area) => {
//     if (area === "local") {
//         const currentKey = Object.keys(whatChanged)[0];
//         const currentVal = whatChanged[currentKey].newValue;

//         if (typeof currentVal.active === 'boolean') {
//             if (currentVal.active) {
//                 // Start reloading current tab
//                 const reloadInterval = currentVal.unit === 'min' ? currentVal.input * 60 * 1000 : currentVal.input * 1000;

//                 reloads_holder[currentKey] = chrome.alarms.create({

//                     delayInMinutes: reloadInterval / 60000,
//                     periodInMinutes: reloadInterval / 60000,
//                 });

//                 chrome.alarms.onAlarm.addListener((alarm) => {
//                     console.log('triggered')
//                     chrome.tabs.reload(parseInt(currentKey));
//                 });

//                 // reloads_holder[currentKey] = setInterval(() => {
//                 //     // Refresh page
//                 //     chrome.tabs.reload(parseInt(currentKey));
//                 // }, reloadInterval);
//             } else {
//                 // Stop reloading
//                 reloads_holder[currentKey].clear()
//                 // clearInterval(reloads_holder[currentKey]);
//             }
//         }
//     }
// });

// Update badge text
chrome.tabs.onActivated.addListener(() => {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		let tab = tabs[0];

		chrome.storage.local.get(tab.id.toString(), (items) => {
			if (items[tab.id] && items[tab.id].active) {
				chrome.action.setBadgeText({ text: YEP });
			} else {
				chrome.action.setBadgeText({ text: NOPE });
			}
		});
	});
});

// Catch tab removed and remove the related reloader.
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
	clearInterval(reloads_holder[tabId]);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			chrome.storage.local.get(tab.id.toString(), (items) => {
				if (items[tab.id] && items[tab.id].active) {
					chrome.action.setBadgeText({ text: YEP });
					reloads_holder[currentKey] = chrome.alarms.create({
						delayInMinutes: reloadInterval / 60000,
						periodInMinutes: reloadInterval / 60000,
					});

					chrome.alarms.onAlarm.addListener((alarm) => {
						console.log("triggered");
						chrome.tabs.reload(parseInt(currentKey));
					});
				} else {
					chrome.action.setBadgeText({ text: NOPE });
				}
			});
		});
	}
});

// chrome.action.setBadgeText({ text: "NOPE" });
// chrome.action.setBadgeBackgroundColor({ color: "#4125dd" });

// let reloads_holder = {};

// const YEP = 'Yep';
// const NOPE = "Nope";

// // Main auto-reload function
// chrome.storage.onChanged.addListener((whatChanged, area) => {
//     if(area === "local") {
//         const currentKey = Object.keys(whatChanged)[0];
//         const currentVal = whatChanged[currentKey].newValue;

//         if (typeof currentVal.active === 'boolean') {
//             if (currentVal.active) {
//                 // Start reloading current tab
//                 const reloadInterval = currentVal.unit === 'min' ? currentVal.input * 60 * 1000 : currentVal.input * 1000;

//                 reloads_holder[currentKey] = chrome.alarms.create({

// 									delayInMinutes: reloadInterval / 60000,
// 									periodInMinutes: reloadInterval / 60000,
//                 });

//                 chrome.alarms.onAlarm.addListener((alarm) => {
//                     console.log('triggered')
// 					chrome.tabs.reload(parseInt(currentKey));
// 			    });

//                 // reloads_holder[currentKey] = setInterval(() => {
//                 //     // Refresh page
//                 //     chrome.tabs.reload(parseInt(currentKey));
//                 // }, reloadInterval);
//             } else {
//                 // Stop reloading
//                 reloads_holder[currentKey].clear()
//                 // clearInterval(reloads_holder[currentKey]);
//             }
//         }
//     }
// });

// // Update badge text
// chrome.tabs.onActivated.addListener(() => {
//     chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//         let tab = tabs[0];

//         chrome.storage.local.get(tab.id.toString(), (items) => {
//             if (items[tab.id] && items[tab.id].active) {
//                 chrome.action.setBadgeText({ text: YEP });
//             } else {
//                 chrome.action.setBadgeText({ text: NOPE });
//             }
//         });
//       });
// });

// // Catch tab removed and remove the related reloader.
// chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
//     clearInterval(reloads_holder[tabId]);
// });
