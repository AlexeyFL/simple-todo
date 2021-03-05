export default class Item {
  constructor(id, text, check) {
    this.id = id;
    this.text = text;
    this.check = check;
  }

  toHtml() {
    // create item
    const item = document.createElement("div");
    item.className = "item";
    item.dataset.id = this.id;
    item.setAttribute("draggable", true);
    // create label
    const label = document.createElement("label");
    label.className = "item__label";
    // create input
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.className = "item__check";
    input.setAttribute("checked", this.check);
    // create button
    const button = document.createElement("button");
    button.className = "close";
    button.innerHTML = "&times;";
    // create item body
    const itemBody = document.createElement("div");
    itemBody.className = "item__body";
    itemBody.innerHTML = this.text;

    if (this.check) {
      item.className += " active";
      label.className += " active";
    }
    //
    label.append(input);

    item.append(label);
    item.append(button);
    item.append(itemBody);

    return item;
  }
}
