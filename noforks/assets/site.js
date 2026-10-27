(function () {
  // Add the live DoorDash URL here when delivery launches.
  var deliveryUrl = "";
  document.querySelectorAll("[data-doordash-link]").forEach(function (link) {
    if (!deliveryUrl) return;
    link.href = deliveryUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.removeAttribute("aria-disabled");
    link.removeAttribute("tabindex");
    link.classList.remove("disabled");
    link.textContent = "Order on DoorDash";
  });

  window.dataLayer = window.dataLayer || [];
  function track(name, detail) {
    var payload = { event: name };
    if (detail) payload.detail = detail;
    window.dataLayer.push(payload);
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-event]");
    if (!el) return;
    track(el.getAttribute("data-event"), {
      label: el.getAttribute("data-label") || el.textContent.trim(),
      href: el.getAttribute("href") || ""
    });
  });
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  document.querySelectorAll("[data-open-order]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var modal = document.getElementById("order-modal");
      if (!modal) return;
      modal.hidden = false;
      var close = modal.querySelector("[data-close-order]");
      if (close) close.focus();
    });
  });
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-close-order]")) {
      var modal = document.getElementById("order-modal");
      if (modal) modal.hidden = true;
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var modal = document.getElementById("order-modal");
      if (modal) modal.hidden = true;
    }
  });
})();
