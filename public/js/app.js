// Assigning the form, input and messages to variables
const locationForm = document.querySelector("form");
const submitted = document.querySelector("input");
const firstMessage = document.querySelector("#firstMessage");
const secondMessage = document.querySelector("#secondMessage");

firstMessage.textContent = "";
secondMessage.textContent = "";

// What happens when you enter address and click submit
locationForm.addEventListener("submit", e => {
  // Prevents browser refreshing
  e.preventDefault();

  // Input value of the submit field
  const location = submitted.value;

  // Setting up a loading message while fetching data
  firstMessage.textContent = "Loading ...";
  secondMessage.textContent = "";

  // Get data from the server using fetch()
  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      // If response data contains error display error message (set by the server (me))
      if (data.error) {
        firstMessage.textContent = data.error;

        // Display results
      } else {
        console.log(data.location);
        firstMessage.textContent = data.location;
        secondMessage.textContent = data.forecast;
      }
    });
  });
});
