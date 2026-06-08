const draggableItems = document.querySelectorAll(".draggable");

draggableItems.forEach((item) => {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let rotation = "";

  item.addEventListener("pointerdown", (e) => {
    e.preventDefault();

    isDragging = true;

    const rect = item.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    rotation = getComputedStyle(item).transform;

    item.style.left = `${rect.left}px`;
    item.style.top = `${rect.top}px`;

    item.setPointerCapture(e.pointerId);
    item.style.zIndex = "9999";
  });

  item.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.transform = rotation;
  });

  item.addEventListener("pointerup", (e) => {
    isDragging = false;
    item.releasePointerCapture(e.pointerId);
  });

  item.addEventListener("pointercancel", () => {
    isDragging = false;
  });
});

const modalData = {

menu: `

<h2>MENU</h2>

<h3>KAFFE</h3>

<div class="menu-row"><span>Bryggkaffe</span><span>32 kr</span></div>
<div class="menu-row"><span>Espresso</span><span>28 kr</span></div>
<div class="menu-row"><span>Americano</span><span>32 kr</span></div>
<div class="menu-row"><span>Cappuccino</span><span>38 kr</span></div>
<div class="menu-row"><span>Caffè Latte</span><span>42 kr</span></div>
<div class="menu-row"><span>Flat White</span><span>42 kr</span></div>
<div class="menu-row"><span>Macchiato</span><span>36 kr</span></div>
<div class="menu-row"><span>Mocha</span><span>46 kr</span></div>
<div class="menu-row"><span>Chai Latte</span><span>46 kr</span></div>
<div class="menu-row"><span>Varm Choklad</span><span>42 kr</span></div>
<div class="menu-row"><span>Extra Shot</span><span>+8 kr</span></div>
<div class="menu-row"><span>Havremjölk</span><span>+8 kr</span></div>

<h3>TE</h3>

<div class="menu-row"><span>Svart Te</span><span>32 kr</span></div>
<div class="menu-row"><span>Grönt Te</span><span>32 kr</span></div>
<div class="menu-row"><span>Örtte</span><span>32 kr</span></div>
<div class="menu-row"><span>Chai</span><span>36 kr</span></div>

<h3>KALLT</h3>

<div class="menu-row"><span>Iced Latte</span><span>46 kr</span></div>
<div class="menu-row"><span>Iskaffe</span><span>36 kr</span></div>
<div class="menu-row"><span>Lemonad</span><span>42 kr</span></div>
<div class="menu-row"><span>Äppeljuice</span><span>36 kr</span></div>
<div class="menu-row"><span>Fläderblomssaft</span><span>36 kr</span></div>

<h3>FRUKOST & LUNCH</h3>

<div class="menu-row"><span>Frukostbricka</span><span>98 kr</span></div>
<p class="menu-note">Yoghurt med granola, färsk frukt & honung</p>

<div class="menu-row"><span>Avokadomacka</span><span>98 kr</span></div>
<p class="menu-note">Rostat surdegsbröd, avokado & citron</p>

<div class="menu-row"><span>Räksmörgås</span><span>115 kr</span></div>
<p class="menu-note">Handskalade räkor, dill & ägg</p>

<div class="menu-row"><span>Soppa för dagen</span><span>95 kr</span></div>
<p class="menu-note">Serveras med bröd och smör</p>

<div class="menu-row"><span>Caesarsallad</span><span>115 kr</span></div>
<p class="menu-note">Kyckling, parmesan & krutonger</p>

<h3>SÖTT</h3>

<div class="menu-row"><span>Kanelbulle</span><span>42 kr</span></div>
<div class="menu-row"><span>Chokladboll</span><span>32 kr</span></div>
<div class="menu-row"><span>Morotskaka</span><span>46 kr</span></div>
<div class="menu-row"><span>Kladdkaka</span><span>46 kr</span></div>
<div class="menu-row"><span>Cheesecake</span><span>46 kr</span></div>

<p class="menu-thank-you">
TACK FÖR ATT DU STÖDJER<br>
LOKALA LEVERANTÖRER
</p>

`,

contact:`

<h2>HITTA OSS</h2>

<p>
📍 Gamla Vägen 12<br>
111 45 Stockholm
<br><br>

☎ 08-123 456 78

<br>

✉ hej@stockholmkaffe.se

</p>

`,


mail:`

<h2>HÅLL KONTAKT</h2>

<p>
Få nyheter, fika-erbjudanden och små överraskningar från vårt café.
</p>

<input placeholder="Din e-postadress">

<button class="join">
GÅ MED
</button>

`,


news:`

<h2>DAGENS NYHETER</h2>

<p>

☕ FIKA DEAL<br><br>

Köp valfri kaffe och få en nybakad kanelbulle för endast 25 kr.

<br><br>

Gäller hela veckan.

</p>


`

};



const overlay =
document.querySelector(".modal-overlay");

const modalContent =
document.querySelector(".modal-content");



document.querySelectorAll(".modal-trigger")
.forEach(item=>{

item.addEventListener("dblclick",()=>{

modalContent.innerHTML =
modalData[item.dataset.modal];

overlay.classList.add("active");

});


});



document.querySelector(".close-modal")
.onclick=()=>{

overlay.classList.remove("active");

}


overlay.onclick=e=>{

if(e.target===overlay){

overlay.classList.remove("active");

}

}
