const draggableItems = document.querySelectorAll(".draggable");

let highestZ = 100;

const CLICK_MOVE_LIMIT = 6;
const mobileQuery = window.matchMedia("(max-width: 650px)");

const originalPositions = new Map();

draggableItems.forEach(item => {
  originalPositions.set(item, {
    left: item.style.left,
    top: item.style.top,
    zIndex: window.getComputedStyle(item).zIndex
  });
});

function isMobileLayout() {
  return mobileQuery.matches;
}

draggableItems.forEach(item => {
  let dragging = false;
  let hasMoved = false;

  let startX;
  let startY;

  let pointerStartX;
  let pointerStartY;

  item.addEventListener("pointerdown", e => {
    e.preventDefault();

    hasMoved = false;

    pointerStartX = e.clientX;
    pointerStartY = e.clientY;

    if (isMobileLayout()) {
      return;
    }

    dragging = true;

    const rect = item.getBoundingClientRect();

    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    highestZ++;
    item.style.zIndex = highestZ;

    item.classList.add("is-dragging");
    item.setPointerCapture(e.pointerId);
  });

  item.addEventListener("pointermove", e => {
    if (isMobileLayout()) return;
    if (!dragging) return;

    const moveX = Math.abs(e.clientX - pointerStartX);
    const moveY = Math.abs(e.clientY - pointerStartY);

    if (moveX > CLICK_MOVE_LIMIT || moveY > CLICK_MOVE_LIMIT) {
      hasMoved = true;
    }

    const scene = document
      .querySelector(".kaffe-scene")
      .getBoundingClientRect();

    const x = e.clientX - scene.left - startX;
    const y = e.clientY - scene.top - startY;

    item.style.left = x + "px";
    item.style.top = y + "px";
  });

  item.addEventListener("pointerup", e => {
    if (!isMobileLayout() && dragging) {
      dragging = false;
      item.classList.remove("is-dragging");

      if (item.hasPointerCapture(e.pointerId)) {
        item.releasePointerCapture(e.pointerId);
      }
    }

    if (!hasMoved && item.classList.contains("modal-trigger")) {
      openModal(item.dataset.modal);
    }
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

  contact: `

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

  mail: `

<h2>HÅLL KONTAKT</h2>

<p>
Få nyheter, fika-erbjudanden och små överraskningar från vårt café.
</p>

<input placeholder="Din e-postadress">

<button class="join">
GÅ MED
</button>

`,

  news: `

<div class="newspaper-modal">

<p class="paper-kicker">STOCKHOLM KAFÉ JOURNAL</p>

<h2>DAGENS NYHETER</h2>

<p class="paper-date">FIKA · KAFFE · LOKALA SMAKER</p>

<div class="paper-divider"></div>

<div class="paper-lead">
  <h3>NYBAKAT IDAG</h3>
  <p>
    Våra kanelbullar bakas färska varje morgon med kardemumma,
    smör och långsam jäsning för en mjukare, rikare smak.
  </p>
</div>

<div class="paper-columns">

  <div>
    <h3>VECKANS BÖNA</h3>
    <p>
      En rund och mjuk mellanrost med toner av choklad,
      nötter och torkad frukt. Rostad i små omgångar här i Sverige.
    </p>
  </div>

  <div>
    <h3>FIKA DEAL</h3>
    <p>
      Köp valfri kaffe och få en nybakad kanelbulle för endast 25 kr.
      Gäller hela veckan.
    </p>
  </div>

</div>

<div class="paper-divider"></div>

<p class="paper-footer">
  TACK FÖR ATT DU STÖDJER LOKALA BAGARE, ROSTARE OCH LEVERANTÖRER.
</p>

</div>

`,

  about: `

<h2>VÅR HISTORIA</h2>

<p class="about-intro">
En liten plats för långsamma morgnar,
varma samtal och riktigt gott kaffe.
</p>

<div class="about-section">

<h3>KAFFET</h3>

<p>
På Stockholm Kafé väljer vi våra bönor med omsorg.
Vårt kaffe är etiskt framtaget från odlare runt om i världen
och rostas i små omgångar här i Sverige.
</p>

<h3>LOKALA RÖTTER</h3>

<p>
Vi tror på att stötta människorna nära oss.
Därför samarbetar vi med lokala bagerier och leverantörer
för att servera färska råvaror efter säsong.
</p>

<h3>VÅR FILOSOFI</h3>

<p>
Inspirerade av svensk fika skapar vi en plats där kvalitet,
hållbarhet och gemenskap får ta tid.
</p>

</div>

<p class="menu-thank-you">
BRYGGT MED OMTANKE<br>
I STOCKHOLM
</p>

`
};

const overlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeModal = document.querySelector(".close-modal");

function openModal(modalType) {
  if (!modalData[modalType]) return;

  modalContent.innerHTML = modalData[modalType];

  modal.classList.remove("has-scroll-hint", "hide-scroll-hint");

  if (modalType === "menu") {
    modal.classList.add("has-scroll-hint");
  }

  overlay.classList.add("active");

  modalContent.scrollTop = 0;
}

function closeActiveModal() {
  overlay.classList.remove("active");
}

closeModal.addEventListener("click", closeActiveModal);

overlay.addEventListener("click", e => {
  if (e.target === overlay) {
    closeActiveModal();
  }
});

modalContent.addEventListener("scroll", () => {
  if (
    modal.classList.contains("has-scroll-hint") &&
    modalContent.scrollTop > 10
  ) {
    modal.classList.add("hide-scroll-hint");
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeActiveModal();
  }
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

modalContent.addEventListener("scroll", () => {
  const modal = document.querySelector(".modal");

  if (modal.classList.contains("has-scroll-hint") && modalContent.scrollTop > 10) {
    modal.classList.add("hide-scroll-hint");
  }
});

const resetButton = document.querySelector(".reset-table");

resetButton.addEventListener("click", () => {
  draggableItems.forEach(item => {
    item.classList.add("resetting");

    const original = originalPositions.get(item);

    item.style.left = original.left;
    item.style.top = original.top;
    item.style.zIndex = original.zIndex;

    setTimeout(() => {
      item.classList.remove("resetting");
    }, 850);
  });

  highestZ = 100;
});
