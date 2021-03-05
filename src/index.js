import "./styles/styles.scss";
import { v4 as uuidv4 } from "uuid";
import Item from "./item";

let items = [];

function drugNdrop() {
  const dropItems = document.querySelectorAll(".item");
  function dragStart(ev) {
    console.log(ev);
    ev.target.classList.add("draggable");
    ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("Text", ev.target.getAttribute("id"));
    // ev.dataTransfer.setDragImage(ev.target, 100, 100);
    return true;
  }
  function dragEnter(ev) {
    ev.preventDefault();
    return true;
  }
  function dragOver(ev) {
    ev.preventDefault();
  }
  function dragDrop(ev) {
    let data = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(data));
    ev.stopPropagation();
    return false;
  }

  if (items) {
    dropItems.forEach((dropItem) => {
      console.log(dropItem);
      dropItem.addEventListener("drag", dragStart);
    });
  }
}

function checkItem() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("item__check")) {
      const itemParent = e.target.closest(".item");
      const itemId = e.target.closest(".item").dataset.id;
      e.target.closest(".item__label").classList.toggle("active");
      itemParent.classList.toggle("active");
      if (e.target.checked) {
        items.forEach((item, index) => {
          if (item.id === itemId) {
            item.check = !item.check;
            localStorage.setItem("storageItems", JSON.stringify(items));
          }
        });
      } else {
        items.forEach((item, index) => {
          if (item.id === itemId) {
            item.check = !item.check;
            localStorage.setItem("storageItems", JSON.stringify(items));
          }
        });
      }
    }
  });
}

function showItems(arr) {
  const itemsBody = document.querySelector(".todo__body");
  arr.forEach((item) => {
    itemsBody.append(new Item(uuidv4(), item.content, item.check).toHtml());
  });
}

function addItem() {
  const itemsBody = document.querySelector(".todo__body");
  const input = document.querySelector(".todo__input");
  const addBtn = document.querySelector(".add");

  addBtn.addEventListener("click", () => {
    if (/^ *$/.test(input.value)) {
      input.value = "";
      alert("add some text");
      return;
    }
    const itemId = uuidv4();
    itemsBody.append(new Item(itemId, input.value, false).toHtml());
    items.push({ id: itemId, content: input.value, check: false });
    input.value = "";
    localStorage.setItem("storageItems", JSON.stringify(items));

    drugNdrop();
  });
}

function removeItem() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("close")) {
      const parentItem = e.target.closest(".item");
      const parentItemId = e.target.closest(".item").dataset.id;
      parentItem.remove();
      items.forEach((item, index) => {
        if (item.id === parentItemId) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem("storageItems", JSON.stringify(items));
      drugNdrop();
    }
  });
}

removeItem();
addItem();
checkItem();
if (localStorage.getItem("storageItems")) {
  const itemBody = document.querySelector(".todo__body");
  items = [...JSON.parse(localStorage.getItem("storageItems"))];
  JSON.parse(localStorage.getItem("storageItems")).forEach((item) => {
    itemBody.append(new Item(item.id, item.content, item.check).toHtml());
  });
} else {
  showItems(items);
}
drugNdrop();
