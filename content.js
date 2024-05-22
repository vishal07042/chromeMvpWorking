console.log(" hello from content.js");

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
	if (request.message) {
		console.log("Total problems solved: " + request.message);
		console.log("Starting point is set to: " + request.message2);
		console.log("hui execute");

		let totalSolved = request.message;

		let startingPoint = await request.message2;
		console.log("hui execute");

		if (
			totalSolved < startingPoint &&
			location.hostname != "leetcode.com" &&
			location.hostname != "chatgpt.com" &&
			
			location.hostname != "chatgpt.com" &&
			location.hostname != "www.codehelp.in" &&
			location.hostname != "learn.codehelp.in" &&
			location.hostname != "www.google.com" &&
			location.hostname != "takeuforward.org" &&
			location.hostname != "www.geeksforgeeks.org"
		) {
			sendResponse({ message: "close tab" });
			console.log("closing tab msg send");
		}

        console.log('hui exexute')
	}
});
