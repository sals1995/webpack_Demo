import './style.scss';
function component(tag,content) {
    const element = document.createElement(tag);
//   
    element.innerHTML = content;
    element.classList.add('myDiv')
    return element;
};

document.body.appendChild(component("div","It is cool"));