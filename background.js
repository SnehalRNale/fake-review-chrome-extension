// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text) {
        // Send review text to the Python backend for fake review detection
        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ review: request.text }),
        })
        .then(response => response.json())
        .then(data => {
            // Send the prediction result back to content script
            sendResponse({ isFake: data.isFake });
        })
        .catch(error => {
            console.error('Error:', error);
            sendResponse({ isFake: false });
        });
    }
    // Keep the message channel open for asynchronous response
    return true;
});
