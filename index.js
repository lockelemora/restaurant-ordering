import { menuArray } from './data.js';

let confirmBtn = document.getElementById("confirm-btn")
let modal = document.getElementById("modal")
const consentForm = document.getElementById('consent-form')
const orderView = document.getElementById("order-view")
const confirmationView = document.getElementById("confirmation-view")

let itemsAdded = ``
let totalPrice = 0
let myOrderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.item){
        createOrderArray(e.target.dataset.item)
    } else if(e.target.dataset.remove){
        removeOrderitem(e.target.dataset.remove)
    }
})

//Render initial menu
function getMenuHtml(){
    let menuHtml = ``
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="menu-item">
            <p class="emoji">${item.emoji}</p>
            <div class="descriptions">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="item-price">${item.price}</p>
            </div>
            <i class="fa-regular fa-plus add" data-item="${item.id}"></i>
        </div>        
        `
    })
    return menuHtml
}

// creates the initial array when clicking button
function createOrderArray(itemId){
    const targetMenuObj = menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    myOrderArray.push(targetMenuObj)
    totalPrice = 0
    myOrderArray.forEach(function(item){
        totalPrice += item.price
    })
    createOrderHtml(myOrderArray)
}

// removes element from the order array
function removeOrderitem(itemId){
    const targetMenuObj = menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    myOrderArray.splice(myOrderArray.indexOf(targetMenuObj), 1)
    totalPrice = 0
    myOrderArray.forEach(function(item){
        totalPrice += item.price
    })
    createOrderHtml(myOrderArray)
}


//renders the order view html
function createOrderHtml(orderArray){
    let orderHtml = ``
    orderArray.forEach(function(item){
        itemsAdded += `
        <div class="items-added">
            <div class="name-and-remove">
                <p class="item-name">${item.name}</p>
                <button class="remove-btn" data-remove="${item.id}">remove</button>
            </div>
            <p class="item-price">${item.price}</p>
        </div>
        `
        orderHtml = `
        <div class="container">
            <h3 class="order-title">Your order:</h3>
            <div class="items-list">
                ${itemsAdded}
            </div>
            <div class="total-price">
                <p class="total-price-title">Total price</p>
                <p class="item-price">${totalPrice}</p>
            </div>
        </div>
        `
        return orderHtml
    })
    itemsAdded = ``
    document.getElementById("order-view").innerHTML = orderHtml 
    confirmBtn.style.display = "block"   
}


//Render main menu function
function render(){
    document.getElementById("menu").innerHTML = getMenuHtml()
}

render()

//Modal section

confirmBtn.addEventListener("click", function(){
    modal.style.display = "block"
})

//Pay section

// click button. Clean modal. Clean Submit. Add confirmation view
consentForm.addEventListener("submit", function(e){
    e.preventDefault(e)
    
    const consentFormData = new FormData(consentForm)
    const fullNamme = consentFormData.get("fullName")
    modal.innerHTML = `
    <div class="modal-inner-loading">
        <img src="images/loading.svg" class="loading">
        <p id="upload-text">Confirming payment...</p>
    </div>` 
    
    //add loading
    setTimeout(function(){
        modal.style.display = "none"
        orderView.style.display = "none"
        confirmBtn.style.display = "none"
        
        confirmationView.innerHTML = `
        <div class="confirmation-message">
            <p>Thanks, ${fullNamme}! Your order is on the way!
        </div>
        `
    }, 3000)
})