import "./style.css";
const element = document.createElement("header");

element.innerHTML = "this is webpack demo";
element.classList.add('info')
document.body.appendChild(element);
// an extra comment

import photo from '../../assets/image.png'
const img = document.createElement("img");
img.style.width="50px"
img.style.height="50px"
img.src=photo;
element.appendChild(img);





