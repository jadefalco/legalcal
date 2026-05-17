/**
 * LegalCals Embed Script
 * Standalone widget loader for external sites.
 */
(function () {
  "use strict";

  var ORIGIN = location.origin; // e.g. https://legalcals.com
  var SELECTOR = "[data-legalcals-calculator]";

  function findWidgets() {
    return document.querySelectorAll(SELECTOR);
  }

  function buildUrl(el) {
    var calculator = el.getAttribute("data-legalcals-calculator");
    var state = el.getAttribute("data-state") || "";
    var province = el.getAttribute("data-province") || "";
    var country = el.getAttribute("data-country") || "";
    var city = el.getAttribute("data-city") || "";
    var theme = el.getAttribute("data-theme") || "light";
    var autosize = el.getAttribute("data-autosize") !== "false";

    var url = ORIGIN + "/embed/" + encodeURIComponent(calculator);
    var params = [];
    if (state) params.push("state=" + encodeURIComponent(state));
    if (province) params.push("province=" + encodeURIComponent(province));
    if (country) params.push("country=" + encodeURIComponent(country));
    if (city) params.push("city=" + encodeURIComponent(city));
    if (theme) params.push("theme=" + encodeURIComponent(theme));
    if (autosize) params.push("autosize=1");
    if (params.length) url += "?" + params.join("&");
    return url;
  }

  function createIframe(el) {
    var calculator = el.getAttribute("data-legalcals-calculator");
    var state = el.getAttribute("data-state") || "";
    var province = el.getAttribute("data-province") || "";
    var country = el.getAttribute("data-country") || "";
    var city = el.getAttribute("data-city") || "";

    var shadow = el.attachShadow({ mode: "open" });

    var container = document.createElement("div");
    container.style.width = "100%";
    container.style.minHeight = "200px";
    container.style.position = "relative";

    var iframe = document.createElement("iframe");
    iframe.src = buildUrl(el);
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.style.display = "block";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("title", "LegalCals " + calculator + " calculator");

    // Sandbox: allow scripts and same-origin communication, but no forms/popups
    iframe.setAttribute(
      "sandbox",
      "allow-scripts allow-same-origin allow-popups"
    );

    container.appendChild(iframe);
    shadow.appendChild(container);

    // Listen for postMessage from iframe
    window.addEventListener("message", function (event) {
      // Only accept messages from our origin
      if (event.origin !== ORIGIN) return;
      if (!event.data || typeof event.data !== "object") return;

      var data = event.data;
      var type = data.type;

      if (type === "resize" && typeof data.height === "number") {
        iframe.style.height = data.height + "px";
      }

      if (type === "event" && data.name) {
        // Forward analytics event to LegalCals
        sendAnalytics({
          calculator: calculator,
          state: state,
          province: province,
          country: country,
          city: city,
          eventType: data.name,
          payload: data.payload,
        });
      }
    });

    // Send view event
    sendAnalytics({
      calculator: calculator,
      state: state,
      province: province,
      country: country,
      city: city,
      eventType: "view",
    });
  }

  function sendAnalytics(event) {
    try {
      var payload = {
        calculator: event.calculator,
        country: event.country,
        eventType: event.eventType,
        metadata: event.payload || {},
      };

      if (event.country === "us" && event.state) {
        payload.state = event.state;
      }
      if (event.country === "ca" && event.province) {
        payload.province = event.province;
      }
      if (event.city) {
        payload.city = event.city;
      }

      var xhr = new XMLHttpRequest();
      xhr.open("POST", ORIGIN + "/api/widget/log", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(payload));
    } catch (e) {
      // Silently fail analytics on external sites
    }
  }

  function init() {
    var widgets = findWidgets();
    for (var i = 0; i < widgets.length; i++) {
      createIframe(widgets[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
