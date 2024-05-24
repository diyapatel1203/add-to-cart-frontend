
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let ProductData = []

function FetchData() {
    fetch("https://add-to-cart-backend-1-pf9e.onrender.com/pitches")
        .then((res) => res.json())
        .then((data) => {
            CardList(data)
            ProductData = data
        })
        .catch((err) => console.log(err))
}
FetchData()

function CardList(data) {
    const store = data.map((el) => SingleCard(el.image, el.title, el.price, el.founder, el.category, el.id, el.description))
    document.getElementById("data-list-wrapper").innerHTML = store.join("")
}

function SingleCard(image, title, price, founder, category, id, description) {
    let Card = `
    <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}&id=${encodeURIComponent(id)}&description=${encodeURIComponent(description)}">
    <div class="card" data-id="${id}">
    <div class="card-img">
      <img src="${image}" alt="">
    </div>
    <div class="card-body">
      <h4 class="card-title">Title :${title}</h4>
      <p class="card-founder">Founder :${founder}</p>
      <p class="card-category">Category :${category}</p>
      <p class="card-price">Price :${price}</p>
      <a href="" data-id="${id}" class="card-link">Edit</a>
      <button data-id="${id}" class="card-button">Delete</button>
    </div>
  </div>
  </a>
    `

    return Card;
}

// ADD DATA

pitchCreateBtn.addEventListener("click", () => {

    let Product = {
        image: pitchImageInput.value,
        title: pitchTitleInput.value,
        price: pitchPriceInput.value,
        founder: pitchfounderInput.value,
        category: pitchCategoryInput.value
    }

    // console.log(Product)

    fetch('https://add-to-cart-backend-1-pf9e.onrender.com/pitches',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Product),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            alert("Product Added...")
        })
        .catch((err) => {
            console.log(err)
            alert("Something Went Wrong")
        })
})

// Delete 

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-button")) {
        DeleteData(e.target.dataset.id);
    }
})

function DeleteData(id) {
    fetch(`https://add-to-cart-backend-1-pf9e.onrender.com/pitches/${id}`, {
        method: 'DELETE',
    })

        .then((res) => res.json())
        .then((data) => {
            alert("Deleted..")
            console.log(data)
        })
        .catch((err) => console.log(err))
}

// Filter Food

filterFood.addEventListener("click", () => {

    let Filterdata = ProductData.filter((el) => el.category == "Food")
    console.log(Filterdata)
    CardList(Filterdata)
})

// Filter Electronic

filterElectronics.addEventListener("click", () => {
    let FilterEle = ProductData.filter((el) => el.category == "Electronics")
    console.log(FilterEle)
    CardList(FilterEle)
})

// Filter Personal-care

filterPersonalCare.addEventListener("click", () => {
    let FilterCare = ProductData.filter((el) => el.category == "Personal Care")
    console.log(FilterCare)
    CardList(FilterCare)
})

// Sort Low to High

sortAtoZBtn.addEventListener("click", () => {

    let sortAtoZ = ProductData.sort((a, b) => a.price - b.price)
    CardList(sortAtoZ)
})

// Sort High to Low

sortZtoABtn.addEventListener("click", () => {

    let sortZtoA = ProductData.sort((a, b) => b.price - a.price)
    CardList(sortZtoA)
})

// Update All data

document.addEventListener("click", (e) => {
    // e.preventDefault()                                                                                                       
    if (e.target.classList.contains("card-link")) 
    {
        let id = (e.target.dataset.id)
        Populatedata(id)
    }
})

function Populatedata(id)
{
    fetch(`https://add-to-cart-backend-1-pf9e.onrender.com/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)

        updatePitchIdInput.value=data.id,
        updatePitchTitleInput.value=data.title,
        updatePitchImageInput.value=data.image,
        updatePitchfounderInput.value=data.founder,
        updatePitchCategoryInput.value=data.category,
        updatePitchPriceInput.value=data.price
        
    })
    .catch((err)=>console.log(err))
}

updatePitchBtn.addEventListener("click",()=>{
    console.log(updatePitchPriceInput.value)

    let UpdateData={
        title:updatePitchTitleInput.value,
        image:updatePitchImageInput.value,
        founder:updatePitchfounderInput.value,
        category:updatePitchCategoryInput.value,
        price:updatePitchPriceInput.value,
        id:updatePitchIdInput.value
    }

    console.log(UpdateData)

    fetch(`https://add-to-cart-backend-1-pf9e.onrender.com/pitches/${UpdateData.id}`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(UpdateData)
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        alert("Data Updated...")
    })
    .catch((err)=>console.log(err))
})

// Update Only Price

document.addEventListener("click", (e) => {
    // e.preventDefault()
    if (e.target.classList.contains("card-link")) 
    {
        let id = (e.target.dataset.id)
        UpdatePrice(id)
    }
})

function UpdatePrice(id)
{
    fetch(`https://add-to-cart-backend-1-pf9e.onrender.com/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)

        updatePricePitchId.value=data.id,
        updatePricePitchPrice.value=data.price
        updatePitchTitleInput.value=data.title,
        updatePitchImageInput.value=data.image,
        updatePitchfounderInput.value=data.founder,
        updatePitchCategoryInput.value=data.category
        
    })
    .catch((err)=>console.log(err))
}

updatePricePitchPriceButton.addEventListener("click",()=>{

    let UpdatePriceData={
        price:updatePricePitchPrice.value,
        id:updatePricePitchId.value,
        title:updatePitchTitleInput.value,
        image:updatePitchImageInput.value,
        founder:updatePitchfounderInput.value,
        category:updatePitchCategoryInput.value,
    }

    console.log(UpdatePriceData)

    fetch(`https://add-to-cart-backend-1-pf9e.onrender.com/pitches/${UpdatePriceData.id}`,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(UpdatePriceData)
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        alert("Price Data Updated...")
    })
    .catch((err)=>console.log(err))
})
