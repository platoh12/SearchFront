// Sample data for search results (you can replace this with actual data from your backend)
const searchResults = [
 {
   name: "Property 1",
   verified: true,
   imageUrl: "property1.jpg",
   info: "Other renters information (if applicable)",
 },
 {
   name: "Property 2",
   verified: true,
   imageUrl: "property2.jpg",
   info: "Other renters information (if applicable)",
 },
 {
   name: "Property 3",
   verified: true,
   imageUrl: "property3.jpg",
   info: "Other renters information (if applicable)",
 },
 // Add more properties here...
];

// Function to display search results
function displayResults(results) {
 const searchResultsContainer = document.querySelector(".search-results");

 // Clear previous results
 searchResultsContainer.innerHTML = "";

 // Display each property in the results
 results.forEach((property) => {
   const propertyDiv = document.createElement("div");
   propertyDiv.classList.add("property");

   const thumbnailDiv = document.createElement("div");
   thumbnailDiv.classList.add("thumbnail");

   const thumbnailImg = document.createElement("img");
   thumbnailImg.src = property.imageUrl;
   thumbnailImg.alt = property.name;

   thumbnailDiv.appendChild(thumbnailImg);

   const propertyInfoDiv = document.createElement("div");
   propertyInfoDiv.classList.add("property-info");

   const propertyName = document.createElement("h3");
   propertyName.textContent = property.name;

   const ownerVerified = document.createElement("p");
   ownerVerified.textContent = property.verified ? "Owner Verified" : "";

   const otherInfo = document.createElement("p");
   otherInfo.textContent = property.info;

   const viewDetailsBtn = document.createElement("button");
   viewDetailsBtn.classList.add("btn-view-details");
   viewDetailsBtn.textContent = "View Details";
   viewDetailsBtn.addEventListener("click", () => {
     // Implement the action when the View Details button is clicked
     // For example, open a modal with property details
     console.log(`View details of ${property.name}`);
   });

   propertyInfoDiv.appendChild(propertyName);
   propertyInfoDiv.appendChild(ownerVerified);
   propertyInfoDiv.appendChild(otherInfo);
   propertyInfoDiv.appendChild(viewDetailsBtn);

   propertyDiv.appendChild(thumbnailDiv);
   propertyDiv.appendChild(propertyInfoDiv);

   searchResultsContainer.appendChild(propertyDiv);
 });

 // Display "View More" button if there are more results to show
 const viewMoreBtn = document.querySelector(".btn-view-more");
 if (results.length < searchResults.length) {
   viewMoreBtn.style.display = "block";
 } else {
   viewMoreBtn.style.display = "none";
 }
}

// Function to handle form submission
function handleFormSubmit(event) {
 event.preventDefault();

 // Get form input values
 const locationInput = document.querySelector("#location");
 const priceRangeInput = document.querySelector("#priceRange");
 const bedroomsInput = document.querySelector("#bedrooms");
 const bathroomsInput = document.querySelector("#bathrooms");

 const location = locationInput.value;
 const priceRange = parseInt(priceRangeInput.value);
 const bedrooms = bedroomsInput.value;
 const bathrooms = bathroomsInput.value;

 // Apply filters to search results
 const filteredResults = searchResults.filter((property) => {
   let meetsCriteria = true;

   // Filter by location
   if (location && property.name.toLowerCase().indexOf(location.toLowerCase()) === -1) {
     meetsCriteria = false;
   }

   // Filter by price range
   if (priceRange && priceRange < 100 && priceRange < property.price) {
     meetsCriteria = false;
   }

   // Filter by bedrooms
   if (bedrooms && bedrooms !== "Any" && bedrooms !== property.bedrooms) {
     meetsCriteria = false;
   }

   // Filter by bathrooms
   if (bathrooms && bathrooms !== "Any" && bathrooms !== property.bathrooms) {
     meetsCriteria = false;
   }

   return meetsCriteria;
 });

 // Display filtered results
 displayResults(filteredResults);
}

// Function to handle filter application
function handleFilterApplication() {
 // Get selected filter options
 const propertyTypes = Array.from(document.querySelectorAll("input[type='checkbox'][id^='propertyType']:checked")).map((input) => input.value);
 const amenities = Array.from(document.querySelectorAll("input[type='checkbox'][id^='amenities']:checked")).map((input) => input.value);
 const availability = document.querySelector("#availability").checked;
 const sorting = document.querySelector("#sorting").value;

 // Apply filters to search results
 let filteredResults = searchResults;

 if (propertyTypes.length > 0) {
   filteredResults = filteredResults.filter((property) => propertyTypes.includes(property.propertyType));
 }

 if (amenities.length > 0) {
   filteredResults = filteredResults.filter((property) => property.amenities.some((amenity) => amenities.includes(amenity)));
 }

 if (availability) {
   filteredResults = filteredResults.filter((property) => property.availability);
 }

 // Apply sorting
 switch (sorting) {
   case "priceAsc":
     filteredResults.sort((a, b) => a.price - b.price);
     break;
   case "priceDesc":
     filteredResults.sort((a, b) => b.price - a.price);
     break;
   case "rating":
     filteredResults.sort((a, b) => b.rating - a.rating);
     break;
   case "newest":
     filteredResults.sort((a, b) => b.dateAdded - a.dateAdded);
     break;
 }

 // Display filtered results
 displayResults(filteredResults);
}

// Function to handle "View More" button click
function handleViewMore() {
 // Implement the action when the "View More" button is clicked
 // For example, load and display additional search results
 console.log("Load more search results");
}

// Add event listeners
const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleFormSubmit);

const applyFiltersBtn = document.querySelector(".btn-apply-filters");
applyFiltersBtn.addEventListener("click", handleFilterApplication);

const viewMoreBtn = document.querySelector(".btn-view-more");
viewMoreBtn.addEventListener("click", handleViewMore);

// Initial display of search results
displayResults(searchResults);
