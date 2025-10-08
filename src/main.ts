import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let count = 0;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <button id="lbutton"> 🦎
  <div id="counter"> 0 lizards </div>

`;

const button = document.getElementById("lbutton") as HTMLButtonElement;
const countDisplay = document.getElementById("counter") as HTMLDivElement;


button.addEventListener("click", () => {
  count++;
  countDisplay.textContent = `${count} lizards`
})
