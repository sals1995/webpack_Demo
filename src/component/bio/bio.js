import './style.scss';
function component() {
    const element = document.createElement("div");
  
    element.innerHTML = "and it is cool";
    element.classList.add('myDiv')
    return element;
};

document.body.appendChild(component());