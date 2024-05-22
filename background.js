// let startingPoint = 2;  //--	 chala gaya content js mein

chrome.runtime.onInstalled.addListener(async () => {
	console.log("extension installed ");

	let startingPoint = await getleetcode();

	await chrome.storage.local.set(
		{ startingPoint: startingPoint },
		function () {
			console.log("starting point ki value set ho gayi");
			getFirstvalue();
		}
	);

	await chrome.storage.local.get(["startingPoint"]).then((result) => {
		console.log("Value is " + result.startingPoint);
	});
});

chrome.runtime.onMessage.addListener(async function (
	message,
	sender,
	sendResponse
) {
	console.log(message);
	console.log("message received from popup");

	if (message.startingValueadd) {
		console.log("in to if condition");

		let startingPoint = await getleetcode();
		await chrome.storage.local.set(
			{
				startingPoint: startingPoint + Number(message.startingValueadd),
			},
			async function () {
				console.log(" new starting point set");

				await chrome.storage.local
					.get(["startingPoint"])
					.then((result) => {
						getFirstvalue();
						console.log(
							" starting point ki value is " +
								result.startingPoint
						);
					});
			}
		);
	}
});

async function getFirstvalue() {
	let vvalue = 0;

	await chrome.storage.local.get(["startingPoint"]).then((result) => {
		console.log(" starting point ki value is " + result.startingPoint);

		vvalue = result.startingPoint;
	});

	return vvalue;
}
getFirstvalue();

async function getleetcode() {
	try {
		const apiEndpoint =
			"https://leetcode-api-faisalshohag.vercel.app/professionalprovishal";
		const apiResponse = await fetch(apiEndpoint);
		const { totalSolved } = await apiResponse.json();

		console.log(totalSolved, "got total from api");

		return totalSolved;
	} catch (error) {
		console.log(error);
		return null;
	}
}

chrome.tabs.onUpdated.addListener(function (activeInfo) {
	console.log("tab activated");

	chrome.tabs.query(
		{ active: true, lastFocusedWindow: true },
		async function (tabs) {
			let totalSolved = await getleetcode();
			let gettingStarted = await getFirstvalue();

			console.log(gettingStarted);

			let activeTab = tabs[0];
			await chrome.tabs.sendMessage(
				activeTab.id,
				{ message: totalSolved, message2: gettingStarted },
				function (response) {
					console.log("isse fn me tab clsoe karna hai", response);

					if (response.message === "close tab") {
						chrome.tabs.query(
							{ active: true, currentWindow: true },
							(tabs) => {
								chrome.tabs.remove(tabs[0].id);
							}
						);
					}
				}
			);
		}
	);
});

let lifeline;
// Disconnect and reconnect
function keepAliveForced() {
	lifeline?.disconnect();
	lifeline = null;
	keepAlive();
}
async function keepAlive() {
	if (lifeline) {
		return;
	}
}
