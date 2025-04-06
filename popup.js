document.getElementById('detectButton').addEventListener('click', async () => {
  const reviewText = document.getElementById('reviewText').value;

  if (!reviewText) {
    document.getElementById('result').innerText = "Please enter a review.";
    return;
  }

  const response = await fetch('http://localhost:5000/api/detect_review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ review: reviewText })
  });

  const data = await response.json();
  document.getElementById('result').innerText = `Result: ${data.result}`;
});
