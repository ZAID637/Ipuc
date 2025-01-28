document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star');
  let rating = 0;

  // Highlight stars on hover
  stars.forEach(star => {
      star.addEventListener('mouseover', function () {
          const value = parseInt(this.getAttribute('data-value'));
          stars.forEach(s => {
              s.classList.remove('selected');
              if (parseInt(s.getAttribute('data-value')) <= value) {
                  s.classList.add('selected');
              }
          });
      });

      star.addEventListener('mouseout', function () {
          stars.forEach(s => {
              s.classList.remove('selected');
              if (parseInt(s.getAttribute('data-value')) <= rating) {
                  s.classList.add('selected');
              }
          });
      });

      star.addEventListener('click', function () {
          rating = parseInt(this.getAttribute('data-value'));
          stars.forEach(s => s.classList.remove('selected'));
          for (let i = 0; i < rating; i++) {
              stars[i].classList.add('selected');
          }
      });
  });

  // Handle form submission
  const form = document.getElementById('feedbackForm');
  form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const feedback = document.getElementById('feedback').value;

      if (name && feedback && rating > 0) {
          const feedbackData = {
              name: name,
              rating: rating,
              feedback: feedback
          };

          let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
          feedbackList.push(feedbackData);
          localStorage.setItem('feedbackList', JSON.stringify(feedbackList));

          // Clear form and display feedback
          form.reset();
          displayFeedback();
      } else {
          alert('Please fill all fields and provide a rating.');
      }
  });

  // Display feedback
  function displayFeedback() {
      const feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
      const feedbackContainer = document.getElementById('feedbackList');
      feedbackContainer.innerHTML = '';

      feedbackList.forEach(item => {
          const feedbackElement = document.createElement('div');
          feedbackElement.classList.add('feedback-item');
          feedbackElement.innerHTML = `
              <strong>${item.name}</strong> rated the party <strong>${item.rating}</strong> stars
              <p>${item.feedback}</p>
          `;
          feedbackContainer.appendChild(feedbackElement);
      });
  }

  // Load stored feedback on page load
  displayFeedback();
});
