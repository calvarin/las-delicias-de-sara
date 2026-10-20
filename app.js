"use strict";

const SPRITE_COLUMNS = 7;
const SPRITE_ROWS = 8;
const DOUBLE_TAP_MS = 300;
let cart = {};
let category = "Todos";
let ticketOpen = false;
let cardPaid = false;
let receiptDate = "";
let paymentState = "idle";
let paymentTimer = null;
let lastTap = { id: null, time: 0 };
let ignoreUntil = 0;
let toastTimer;
let audioContext = null;

const $ = (id) => document.getElementById(id);
const eur = (cents) => (cents / 100).toLocaleString("es-ES", {
  style: "currency",
  currency: "EUR"
});
const product = (id) => products.find((item) => item.id === id);
const total = () => Object.entries(cart).reduce(
  (sum, [id, quantity]) => sum + product(id).priceCents * quantity, 0
);
const count = () => Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

// Pitido sintetizado: no requiere archivos de audio ni conexión.
function playCardReadSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioContext || audioContext.state === "closed") {
      audioContext = new AudioContextClass();
    }
    const context = audioContext;
    const beep = () => {
      if (context.state !== "running") return;
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1800, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.13, now + 0.008);
      gain.gain.setValueAtTime(0.13, now + 0.095);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.17);
      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
      };
    };
    if (context.state === "running") beep();
    else context.resume().then(beep).catch(() => {});
  } catch (error) {
    // Si el navegador impide el audio, el pago continúa igualmente.
  }
}

function openModal(id) {
  $(id).showModal();
}

function closeModal(id) {
  $(id).close();
}

function notify(text) {
  $("toast").textContent = text;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $("toast").textContent = ""; }, 1600);
}

function spritePosition(index) {
  const column = index % SPRITE_COLUMNS;
  const row = Math.floor(index / SPRITE_COLUMNS);
  return `${column / (SPRITE_COLUMNS - 1) * 100}% ${row / (SPRITE_ROWS - 1) * 100}%`;
}

function update() {
  $("total").textContent = eur(total());
  $("view").textContent = "Ver comanda" + (count() ? ` (${count()})` : "");
  document.querySelectorAll(".product").forEach((button) => {
    const id = button.dataset.item;
    const quantity = cart[id] || 0;
    button.classList.toggle("selected", quantity > 0);
    button.setAttribute("aria-label",
      `${product(id).name}, ${eur(product(id).priceCents)}. ${quantity} unidades en la comanda`
    );
    const badge = button.querySelector(".units");
    badge.hidden = !quantity;
    badge.textContent = quantity === 1 ? "1 unidad" : `${quantity} unidades`;
  });
}

function render() {
  const scroll = $("nav").scrollLeft;
  const categories = ["Todos", ...new Set(products.map((item) => item.category))];
  $("nav").innerHTML = categories.map((name) => `
    <button class="${name === category ? "active" : ""}"
      data-cat="${name}" aria-current="${name === category ? "true" : "false"}">
      ${name}
    </button>
  `).join("");
  $("nav").scrollLeft = scroll;
  $("grid").innerHTML = products
    .filter((item) => category === "Todos" || item.category === category)
    .map((item) => `
      <button class="product" data-item="${item.id}">
        <span class="units" hidden></span>
        <span class="sprite" aria-hidden="true"
          style="background-position: ${spritePosition(item.spriteIndex)}"></span>
        <strong>${item.name}</strong>
        <span class="price">${eur(item.priceCents)}</span>
      </button>
    `).join("");
  update();
}

function lines(controls) {
  return Object.entries(cart).map(([id, quantity]) => `
    <div class="line">
      <span class="name">${product(id).name}</span>
      ${controls ? `<button data-minus="${id}" aria-label="Quitar unidad">−</button>` : ""}
      <b class="line-qty">${quantity}</b>
      ${controls ? `<button data-add="${id}" aria-label="Añadir unidad">+</button>` : ""}
      <span class="line-price">${eur(product(id).priceCents * quantity)}</span>
    </div>
  `).join("");
}

function showOrder() {
  ticketOpen = false;
  $("title").textContent = "Tu comanda";
  $("order").style.display = "block";
  $("ticket").style.display = "none";
  $("back").hidden = true;
  $("payTpv").hidden = true;
  $("pay").textContent = "Cobrar";
  $("pay").disabled = !count();
  $("order").innerHTML = lines(true) || "<p>¡Elige algo rico para empezar!</p>";
  $("sum").textContent = "Total: " + eur(total());
}

function showTicket() {
  ticketOpen = true;
  if (!receiptDate) receiptDate = new Date().toLocaleString("es-ES");
  $("title").textContent = "¡Gracias por tu visita!";
  $("order").style.display = "none";
  $("ticket").style.display = "block";
  $("ticket").innerHTML = `
    <h3>LAS DELICIAS DE SARA</h3>
    <p class="note">Tu comanda · ${receiptDate}</p>
    ${lines(false)}
    <p class="sum">${eur(total())}</p>
    ${cardPaid ? '<div class="badge">✓ Pagado con tarjeta</div>' : ""}
    <p class="note">Con mucho cariño</p>
  `;
  $("sum").textContent = "Total: " + eur(total());
  $("back").hidden = cardPaid;
  $("payTpv").hidden = false;
  $("payTpv").disabled = cardPaid;
  $("payTpv").textContent = cardPaid ? "✓ Pagado con TPV" : "Pagar con TPV";
  $("pay").disabled = false;
  $("pay").textContent = "Nueva comanda";
  $("orderScroll").scrollTop = 0;
}

function reset() {
  cart = {};
  cardPaid = false;
  ticketOpen = false;
  receiptDate = "";
  lastTap = { id: null, time: 0 };
  ignoreUntil = 0;
  update();
}

function prepareEdit() {
  if (cardPaid) {
    cart = {};
    cardPaid = false;
    lastTap = { id: null, time: 0 };
  }
  receiptDate = "";
}

// Toques en productos y controles de cantidad.
document.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-cat]");
  if (categoryButton) {
    category = categoryButton.dataset.cat;
    lastTap = { id: null, time: 0 };
    render();
    $("productsScroll").scrollTop = 0;
    return;
  }
  const itemButton = event.target.closest("[data-item]");
  if (itemButton) {
    const now = performance.now();
    if (now < ignoreUntil) return;
    const id = itemButton.dataset.item;
    prepareEdit();
    if (event.detail !== 0 && lastTap.id === id && now - lastTap.time < DOUBLE_TAP_MS) {
      delete cart[id];
      lastTap = { id: null, time: 0 };
      ignoreUntil = now + 250;
      notify(product(id).name + " eliminado de la comanda");
    } else {
      cart[id] = (cart[id] || 0) + 1;
      lastTap = { id, time: event.detail === 0 ? 0 : now };
    }
    update();
    return;
  }
  const add = event.target.closest("[data-add]");
  const minus = event.target.closest("[data-minus]");
  if (add || minus) {
    prepareEdit();
    lastTap = { id: null, time: 0 };
    const id = add ? add.dataset.add : minus.dataset.minus;
    cart[id] = (cart[id] || 0) + (add ? 1 : -1);
    if (cart[id] <= 0) delete cart[id];
    const scroll = $("orderScroll").scrollTop;
    update();
    showOrder();
    $("orderScroll").scrollTop = scroll;
  }
});

$("grid").addEventListener("dblclick", (event) => {
  if (event.target.closest("[data-item]")) event.preventDefault();
});
$("view").onclick = () => {
  lastTap = { id: null, time: 0 };
  if (cardPaid) showTicket();
  else showOrder();
  openModal("dialog");
  $("orderScroll").scrollTop = 0;
};
$("close").onclick = () => closeModal("dialog");
$("clear").onclick = reset;
$("back").onclick = () => {
  showOrder();
  $("orderScroll").scrollTop = 0;
};
$("showQr").onclick = () => openModal("qrDialog");
$("closeQr").onclick = $("doneQr").onclick = () => closeModal("qrDialog");
$("pay").onclick = () => {
  if (ticketOpen) {
    reset();
    closeModal("dialog");
  } else if (count()) showTicket();
};

function openPayment() {
  if (cardPaid || !count()) return;
  paymentState = "waiting";
  $("paymentAmount").textContent = eur(total());
  $("paymentStatus").textContent = "Acerca tu tarjeta";
  $("paymentHint").textContent = "Toca el símbolo para acercar la tarjeta.";
  $("paymentScreen").classList.remove("success");
  $("paymentFeedback").innerHTML = "";
  $("tapCard").hidden = false;
  $("tapCard").disabled = false;
  $("tapCard").classList.add("waiting");
  $("fakeCard").classList.remove("used");
  $("fakeCard").hidden = false;
  $("donePayment").hidden = true;
  $("cancelPayment").hidden = false;
  $("closePayment").disabled = false;
  openModal("paymentDialog");
}

function closePayment() {
  if (paymentState === "processing") return;
  clearTimeout(paymentTimer);
  closeModal("paymentDialog");
  if (cardPaid) showTicket();
  paymentState = "idle";
}

$("payTpv").onclick = openPayment;
$("closePayment").onclick = closePayment;
$("cancelPayment").onclick = closePayment;
$("donePayment").onclick = closePayment;
$("paymentDialog").addEventListener("cancel", (event) => {
  event.preventDefault();
  closePayment();
});
$("tapCard").onclick = () => {
  if (paymentState !== "waiting") return;
  paymentState = "processing";
  playCardReadSound();
  $("tapCard").disabled = true;
  $("tapCard").classList.remove("waiting");
  $("fakeCard").classList.add("used");
  $("paymentStatus").textContent = "Procesando…";
  $("paymentHint").textContent = "Un momento, por favor";
  $("paymentFeedback").innerHTML = '<span class="spinner"></span>';
  $("cancelPayment").hidden = true;
  $("closePayment").disabled = true;
  paymentTimer = setTimeout(() => {
    paymentState = "success";
    cardPaid = true;
    $("paymentStatus").textContent = "Pago aceptado";
    $("paymentHint").textContent = "¡Gracias por tu visita!";
    $("paymentFeedback").innerHTML = '<div class="success-icon">✓</div>';
    $("paymentScreen").classList.add("success");
    $("tapCard").hidden = true;
    $("fakeCard").hidden = true;
    $("donePayment").hidden = false;
    $("closePayment").disabled = false;
    showTicket();
  }, 1800);
};

render();
