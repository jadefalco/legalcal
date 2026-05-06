/**
 * LegalCals Document Embed Script
 * Standalone script for embedding document generation workflows.
 */
(function () {
  "use strict";

  var ORIGIN = location.origin;
  var SELECTOR = "[data-legalcals-document]";

  function findWidgets() {
    return document.querySelectorAll(SELECTOR);
  }

  function createForm(el) {
    var template = el.getAttribute("data-legalcals-document");
    var jurisdiction = el.getAttribute("data-jurisdiction") || "us-ca";
    var topic = el.getAttribute("data-topic") || "";

    var shadow = el.attachShadow({ mode: "open" });

    var container = document.createElement("div");
    container.style.width = "100%";
    container.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    container.style.padding = "16px";
    container.style.border = "1px solid #e2e8f0";
    container.style.borderRadius = "8px";
    container.style.background = "#fff";

    var title = document.createElement("h3");
    title.textContent = "Generate Document: " + template;
    title.style.margin = "0 0 12px 0";
    title.style.fontSize = "16px";
    container.appendChild(title);

    var jurisdictionInput = createInput("Jurisdiction", jurisdiction);
    var topicInput = createInput("Topic", topic);
    container.appendChild(jurisdictionInput);
    container.appendChild(topicInput);

    var userInput = {};
    var fieldsDiv = document.createElement("div");
    fieldsDiv.id = "fields";
    container.appendChild(fieldsDiv);

    // Load template fields
    fetch(ORIGIN + "/api/documents/template-info?slug=" + encodeURIComponent(template))
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.requiredFields) {
          data.requiredFields.forEach(function (field) {
            var input = createInput(field.replace(/_/g, " "), "");
            input.querySelector("input").addEventListener("input", function (e) {
              userInput[field] = e.target.value;
            });
            fieldsDiv.appendChild(input);
          });
        }
      })
      .catch(function () {
        // ignore
      });

    var btn = document.createElement("button");
    btn.textContent = "Generate PDF";
    btn.style.marginTop = "12px";
    btn.style.padding = "8px 16px";
    btn.style.background = "#2563eb";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "14px";

    btn.addEventListener("click", function () {
      btn.textContent = "Generating...";
      btn.disabled = true;

      fetch(ORIGIN + "/api/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: template,
          jurisdiction: jurisdictionInput.querySelector("input").value,
          topic: topicInput.querySelector("input").value,
          userInput: userInput,
          format: "pdf",
        }),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Failed");
          return res.blob();
        })
        .then(function (blob) {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = template + ".pdf";
          a.click();
          window.URL.revokeObjectURL(url);
          btn.textContent = "Generate PDF";
          btn.disabled = false;
        })
        .catch(function () {
          btn.textContent = "Error — Try Again";
          btn.disabled = false;
        });
    });

    container.appendChild(btn);
    shadow.appendChild(container);
  }

  function createInput(label, value) {
    var div = document.createElement("div");
    div.style.marginBottom = "10px";

    var lbl = document.createElement("label");
    lbl.textContent = label;
    lbl.style.display = "block";
    lbl.style.fontSize = "12px";
    lbl.style.color = "#64748b";
    lbl.style.marginBottom = "4px";

    var input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.style.width = "100%";
    input.style.padding = "6px 8px";
    input.style.border = "1px solid #cbd5e1";
    input.style.borderRadius = "4px";
    input.style.fontSize = "14px";
    input.style.boxSizing = "border-box";

    div.appendChild(lbl);
    div.appendChild(input);
    return div;
  }

  function init() {
    var widgets = findWidgets();
    for (var i = 0; i < widgets.length; i++) {
      createForm(widgets[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
