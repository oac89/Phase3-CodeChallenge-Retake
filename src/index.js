// Code here
const BASE_URL = "http:localhost:3000";
const FIRST_BEER_URL = `${BASE_URL}/beers/1`;

function generalFetch(url, options = {}) {
    return fetch(url, options)
    .then(res => res.json());
}

function fetchFirstBeer() {
    return generalFetch(FIRST_BEER_URL);
}

function makeOptions(method, body = {}) {
    return {
        method, 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };
}

function patchBeerDescriptions(id, description) {
    return generalFetch(FIRST_BEER_URL(id), makeOptions("PATCH", { description })); 

}

function setBeerName(name) {
    const beerName = document.querySelector("h2")
    beerName.innerText = name;
}
function setBeerImage(image) {
    const beerImage = document.querySelector("img")
    beerImage.src = "https://i.ibb.co/wQ4G0w1/flatiron-brew.png";
}

function setBeerDescription(description) {
    const beerDescription = document.querySelector("textarea")
    beerDescription.textContent = description
}

function createSingleReview(reviews) {
    const li = document.createElement("li"); 
    li.textContent = reviews;

    return li; 
}

function setBeerReviews(reviews) {
    const beerReviews = document.querySelector("ul")
    beerReviews.textContent = reviews 
}

const reviewUl = document.querySelector("li")

function setBeerDetails({name, image, description, reviews, id}) {
    setBeerName(name)
    setBeerImage(image)
    setBeerDescription(description)
 
    reviewUl.textContent = ""
    reviews.forEach((rv) => {
        reviewUl.append(setBeerReviews(rv.reviews))
        })
    }
    fetchFirstBeer()
    .then(setBeerDetails)



// //change the description of the beer 
const updateBeerButton = document.querySelector("button");

updateBeerButton.addEventListener("click", (e) => {

const beerId = e.currentTarget.dataset.beerId;


patchBeerDescriptions(beerId, description) //this updates backend 
   .then(beer => {
     setBeerDescription(beer, description);
   })

 });

///add a review no persistence needed 
const feedbackForm = document.querySelector("form");
const feedbackInput = document.querySelector("textarea")

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault(); 

  reviewUl.append(createSingleReview(feedbackInput.value));
  e.currentTarget.reset();
});

