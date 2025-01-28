document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent form from submitting the traditional way
  
    // Get user input values
    const name = document.getElementById("name").value;
    const seniorName = document.getElementById("seniorName").value;
    const rating = document.getElementById("rating").value;
    const feedback = document.getElementById("feedback").value;
  
    // Create a feedback object
    const feedbackObject = {
      name: name,
      seniorName: seniorName,
      rating: rating,
      feedback: feedback
    };
  
    // Store feedback in localStorage (this is for demo, ideally you'd save it to a database)
    let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
    feedbackList.push(feedbackObject);
    localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
  
    // Display feedback on the page
    displayFeedback();
  
    // Clear the form fields
    document.getElementById("feedbackForm").reset();
  });
  
  // Function to display all feedback
  function displayFeedback() {
    const feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];
    const feedbackContainer = document.getElementById("feedbackList");
    feedbackContainer.innerHTML = "";
  
    feedbackList.forEach(function(feedback) {
      const feedbackDiv = document.createElement("div");
      feedbackDiv.classList.add("feedback-item");
      feedbackDiv.innerHTML = `
        <h4>${feedback.name} rated the Farewell Party for ${feedback.seniorName}</h4>
        <p>Rating: ${feedback.rating} Stars</p>
        <p>Feedback: ${feedback.feedback}</p>
      `;
      feedbackContainer.appendChild(feedbackDiv);
    });
  }
  
  // Display feedback when the page loads
  window.onload = displayFeedback;
  