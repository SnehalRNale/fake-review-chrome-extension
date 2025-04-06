// content.js
window.addEventListener("load", function() {
  // Identify review elements on the page (this depends on the structure of the page)
  let reviews = document.querySelectorAll('.review-text'); // Modify this selector based on your target page
  console.log('Found reviews:', reviews); 
  
  reviews.forEach(function(review) {
      let reviewText = review.innerText || review.textContent;
      console.log('Processing review:', reviewText);
      
      // Send the review text to the background script for processing
      chrome.runtime.sendMessage({ text: reviewText }, function(response) {
          console.log('Fake review detection response:', response);
          if (response.isFake) {
              // Optionally, you could highlight the review or show a message
              review.style.border = "2px solid red"; // Example: highlight fake review
              review.innerHTML += "<br><strong>Warning: Fake Review</strong>";
          }
          else {
            // Highlight genuine reviews and change text color to green
            review.style.border = "2px solid green";  // Highlight border for genuine reviews
            review.style.setProperty("color", "green", "important");  // Change text color to green
            review.innerHTML += "<br><strong>Genuine Review</strong>";  // Add a message for genuine reviews
        }
      });
  });
});
