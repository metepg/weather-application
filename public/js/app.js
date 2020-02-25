// Assigning the form, input and messages to variables
const locationForm = document.querySelector("form");
const submitted = document.querySelector("input");
const firstMessage = document.querySelector("#firstMessage");
const secondMessage = document.querySelector("#secondMessage");

// Emptying the text fields under the search bar just before every search (after user has clicked search and when the user enters the page)
firstMessage.textContent = "";
secondMessage.textContent = "";

// Eventhandler for submit button
locationForm.addEventListener("submit", e => {

  // Prevents browser page from refreshing when button is clicked (defaultValue = true)
  e.preventDefault();

  // Input value of the submit field
  const location = submitted.value;

  // Setting up a loading message for the user while fetching data
  firstMessage.textContent = "Loading ...";
  secondMessage.textContent = "";

  // Get data from the server using fetch(value from form + location (using geocode function )
  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      // If response data contains error display error message (set by the server (me))
      if (data.error) {
        firstMessage.textContent = data.error;

        // Display results on the text fields below the search field
      } else {
        console.log(data.location);
        firstMessage.textContent = data.location;
        secondMessage.textContent = data.forecast;
      }
    });
  });
});
