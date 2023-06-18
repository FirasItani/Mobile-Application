import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
  databaseURL: "https://playground-96cbe-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
const shoppingListEl = document.getElementById("shopping-list")

addBtn.addEventListener("click", function () {
  let inputValue = inputEl.value

  push(shoppingListInDB, inputValue)

  clearInputField()
})

//fetching database item from realtime by using onValue function
onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let convertToArray = Object.entries(snapshot.val())

    clearshoppingList()

    for (let i = 0; i < convertToArray.length; i++) {
      let currentItem = convertToArray[i]
      // let currentItemID = currentItem[0]
      // let currentItemValue = currentItem[1]

      appendItems(currentItem)
    }
  } else {
    shoppingListEl.innerHTML = `<p>Ops! There are no items here...yet</p>`
  }
})

function clearInputField() {
  inputEl.value = ""
}

function clearshoppingList() {
  shoppingListEl.innerHTML = ""
}

function appendItems(item) {
  // shoppingListEl.innerHTML += `<li>${inputItem}</li>`

  //replacing innerHTML with creatElement
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")

  newEl.textContent = itemValue

  newEl.addEventListener("click", function () {
    let exactLocationOfShoppingList = ref(database, `shoppingList/${itemID}`)

    remove(exactLocationOfShoppingList)
  })

  shoppingListEl.append(newEl)
}


















// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSetting = {
//   databaseURL: "https://playground-96cbe-default-rtdb.europe-west1.firebasedatabase.app/"
// }
// const app = initializeApp(appSetting)
// const database = getDatabase(app)
// const moviesInDB = ref(database, "movies")

// push(moviesInDB, inputValue)