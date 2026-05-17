import Link from "next/link";

export const metadata = {
  title: "LegalCals Widget Embed Guide",
  description: "How to embed LegalCals calculators on your website.",
};

export default function WidgetDeveloperPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Widget Embed Guide</h1>
          <p className="text-slate-600 mt-2">
            Add LegalCals calculators to any website with a single script tag.
          </p>
        </div>

        {/* Quick start */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Quick Start</h2>
          <p className="text-slate-600">
            Paste this script into your page, then add a{" "}
            <code className="text-sm bg-slate-100 px-1.5 py-0.5 rounded">div</code>{" "}
            wherever you want a calculator to appear.
          </p>
          <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-auto">
            <code>{`<script src="https://legalcals.com/embed.js"></script>

<div
  data-legalcals-calculator="security-deposit"
  data-state="ca"
></div>`}</code>
          </pre>
        </section>

        {/* Options */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Configuration Options</h2>
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Attribute</th>
                  <th className="px-4 py-3 text-left font-semibold">Required</th>
                  <th className="px-4 py-3 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">data-legalcals-calculator</td>
                  <td className="px-4 py-3 text-red-600 font-medium">Yes</td>
                  <td className="px-4 py-3 text-slate-600">Calculator slug, e.g. security-deposit</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">data-state</td>
                  <td className="px-4 py-3 text-red-600 font-medium">Yes (US)</td>
                  <td className="px-4 py-3 text-slate-600">Two-letter state code, e.g. ca</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">data-country</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                  <td className="px-4 py-3 text-slate-600">Country code: us or ca (default: us)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">data-province</td>
                  <td className="px-4 py-3 text-red-600 font-medium">Yes (CA)</td>
                  <td className="px-4 py-3 text-slate-600">Province code for Canadian provinces (e.g. bc)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">data-city</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                  <td className="px-4 py-3 text-slate-600">City slug for city-level overrides</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">data-theme</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                  <td className="px-4 py-3 text-slate-600">light or dark (default: light)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">data-lang</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                  <td className="px-4 py-3 text-slate-600">Language code (default: en)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">data-autosize</td>
                  <td className="px-4 py-3 text-slate-500">No</td>
                  <td className="px-4 py-3 text-slate-600">Auto-resize iframe (default: true)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Examples */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Example Integrations</h2>

          <div className="space-y-6">
            <ExampleBlock title="React">
              {`useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://legalcals.com/embed.js';
  script.async = true;
  document.body.appendChild(script);
  return () => document.body.removeChild(script);
}, []);

// In JSX (US):
<div data-legalcals-calculator="security-deposit" data-state="ca" />

// In JSX (Canada):
<div data-legalcals-calculator="bc-security-deposit" data-country="ca" data-province="bc" />`}
            </ExampleBlock>

            <ExampleBlock title="Vue">
{`<template>
  <!-- US -->
  <div data-legalcals-calculator="security-deposit" data-state="ca" />

  <!-- Canada (BC) -->
  <div
    data-legalcals-calculator="bc-security-deposit"
    data-country="ca"
    data-province="bc"
  ></div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://legalcals.com/embed.js';
  document.head.appendChild(script);
});
</script>`}
</ExampleBlock>
            <ExampleBlock title="WordPress">
              {`<!-- Paste into Custom HTML block -->
<script src="https://legalcals.com/embed.js"></script>
<div data-legalcals-calculator="bc-security-deposit" data-country="ca" data-province="bc"></div>`}
            </ExampleBlock>

            <ExampleBlock title="Webflow">
              {`1. Add an Embed element to your page.
2. Paste the script + div code.
3. Publish your site.`}
            </ExampleBlock>

            <ExampleBlock title="Wix">
              {`1. Add an HTML iframe element.
2. Switch to "Code" mode.
3. Paste the script + div code.`}
            </ExampleBlock>
          </div>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Security & Isolation</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600">
            <li>Widgets run inside a Shadow DOM for style isolation.</li>
            <li>The calculator is rendered in a sandboxed iframe.</li>
            <li>No access to parent DOM or cookies.</li>
            <li>Only API calls to LegalCals are permitted.</li>
            <li>Resize events are sent via postMessage with origin validation.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

function ExampleBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 space-y-3">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}
