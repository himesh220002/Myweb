/**
 * Utility for isolated, flawless receipt printing and downloading.
 * Bypasses mobile browser whole-page printing issues by generating
 * a standalone, pure receipt document inside an isolated sandbox iframe.
 */

export interface ReceiptData {
  paymentId: string;
  orderId: string;
  amount: number | string;
  planName: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  date?: string;
  paymentMethod?: string;
}

export function generatePrintableReceiptHtml(data: ReceiptData): string {
  const formattedDate = data.date
    ? new Date(data.date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

  const numericAmount = Number(data.amount) || 0;
  const formattedAmount = numericAmount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Receipt_${data.paymentId}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 12px;
      line-height: 1.5;
      padding: 16px;
      -webkit-font-smoothing: antialiased;
    }
    .receipt-container {
      max-width: 620px;
      margin: 0 auto;
      border: 1.5px solid #0f172a;
      border-radius: 8px;
      padding: 24px;
      background: #ffffff;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #0f172a;
      text-transform: uppercase;
    }
    .brand-subtitle {
      font-size: 10px;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 1.5px;
      margin-top: 1px;
    }
    .merchant-info {
      margin-top: 6px;
      font-size: 11px;
      color: #475569;
      line-height: 1.4;
    }
    .merchant-info strong {
      color: #0f172a;
    }
    .header-right {
      text-align: right;
    }
    .status-badge {
      display: inline-block;
      background: #ecfdf5;
      color: #065f46;
      border: 1px solid #10b981;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .invoice-title {
      font-size: 11px;
      font-weight: 700;
      color: #334155;
      text-transform: uppercase;
    }
    .timestamp {
      font-size: 11px;
      color: #64748b;
      margin-top: 2px;
    }
    .total-banner {
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 6px;
      padding: 14px 18px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .total-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #475569;
    }
    .total-note {
      font-size: 10.5px;
      color: #64748b;
      margin-top: 2px;
    }
    .total-amount {
      font-size: 26px;
      font-weight: 900;
      color: #047857;
      text-align: right;
      line-height: 1.1;
    }
    .currency-tag {
      font-size: 10px;
      color: #64748b;
      font-weight: 700;
    }
    .section-title {
      font-size: 10.5px;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #64748b;
      margin-bottom: 6px;
      padding-left: 2px;
    }
    .detail-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
      font-size: 11.5px;
    }
    .detail-table tr {
      border-bottom: 1px solid #f1f5f9;
    }
    .detail-table tr:last-child {
      border-bottom: none;
    }
    .detail-table tr:nth-child(even) {
      background: #fafafa;
    }
    .detail-table td {
      padding: 8px 12px;
      vertical-align: top;
    }
    .detail-table td.label-col {
      width: 35%;
      color: #64748b;
      font-weight: 600;
    }
    .detail-table td.val-col {
      width: 65%;
      color: #0f172a;
      font-weight: 600;
    }
    .font-mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-weight: 700;
      word-break: break-all;
    }
    .compliance-footer {
      border-top: 1.5px dashed #cbd5e1;
      padding-top: 14px;
      margin-top: 16px;
      text-align: center;
      font-size: 10px;
      color: #64748b;
      line-height: 1.6;
    }
    .compliance-footer strong {
      color: #1e293b;
    }
    .policy-links {
      margin-top: 4px;
      color: #2563eb;
    }
    .policy-links a {
      color: #2563eb;
      text-decoration: underline;
      margin: 0 4px;
    }
    .disclaimer {
      margin-top: 6px;
      font-size: 9.5px;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header-row">
      <div>
        <div class="brand-title">CypherTech</div>
        <div class="brand-subtitle">DIGITAL SOLUTIONS</div>
        <div class="merchant-info">
          Merchant Legal Entity: <strong>CypherTech</strong><br/>
          Support: <strong>satyamhimesh@gmail.com</strong>
        </div>
      </div>
      <div class="header-right">
        <div class="status-badge">&#10003; PAID &amp; CAPTURED</div>
        <div class="invoice-title">Digital Tax Invoice</div>
        <div class="timestamp">${formattedDate}</div>
      </div>
    </div>

    <div class="total-banner">
      <div>
        <div class="total-label">Total Amount Received</div>
        <div class="total-note">Includes applicable digital services tax (18% GST)</div>
      </div>
      <div>
        <div class="total-amount">&#8377;${formattedAmount}</div>
        <div class="currency-tag" style="text-align: right;">INR (Indian Rupee)</div>
      </div>
    </div>

    <div class="section-title">Transaction Identifiers</div>
    <table class="detail-table">
      <tr>
        <td class="label-col">Transaction Reference ID</td>
        <td class="val-col font-mono">${data.paymentId}</td>
      </tr>
      <tr>
        <td class="label-col">Razorpay Order ID</td>
        <td class="val-col font-mono">${data.orderId}</td>
      </tr>
      <tr>
        <td class="label-col">Security Verification</td>
        <td class="val-col">Razorpay 256-Bit SSL Encrypted &bull; PCI-DSS Level 1</td>
      </tr>
    </table>

    <div class="section-title">Payer &amp; Billing Details</div>
    <table class="detail-table">
      <tr>
        <td class="label-col">Payer Full Name</td>
        <td class="val-col">${data.customerName || "Valued Client"}</td>
      </tr>
      <tr>
        <td class="label-col">Billing Email Address</td>
        <td class="val-col">${data.customerEmail || "N/A"}</td>
      </tr>
      ${
        data.customerPhone
          ? `<tr>
        <td class="label-col">Contact Phone</td>
        <td class="val-col">${data.customerPhone}</td>
      </tr>`
          : ""
      }
      <tr>
        <td class="label-col">Item / Scope Milestone</td>
        <td class="val-col" style="color: #1e3a8a; font-weight: 700;">${data.planName}</td>
      </tr>
    </table>

    <div class="compliance-footer">
      <div>Merchant Legal Entity: <strong>CypherTech</strong> &bull; Policy Update: <strong>Sep 18th 2025</strong></div>
      <div class="policy-links">
        <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/terms" target="_blank">Terms</a> &bull;
        <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/privacy" target="_blank">Privacy</a> &bull;
        <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/refund" target="_blank">Refund Policy</a> &bull;
        <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/shipping" target="_blank">Shipping</a> &bull;
        <a href="https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/contact_us" target="_blank">Contact Us</a>
      </div>
      <div class="disclaimer">
        This is an official computer-generated digital tax receipt. No physical signature is required.
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Triggers printing of ONLY the isolated receipt document.
 * Creates a clean hidden iframe containing pure receipt HTML.
 * Completely immune to mobile browser whole-page printing bugs.
 */
export function printReceiptIsolated(data: ReceiptData): void {
  try {
    const existingIframe = document.getElementById("receipt-print-iframe");
    if (existingIframe) {
      document.body.removeChild(existingIframe);
    }

    const iframe = document.createElement("iframe");
    iframe.id = "receipt-print-iframe";
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    const html = generatePrintableReceiptHtml(data);
    doc.open();
    doc.write(html);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (printErr) {
        console.warn("Iframe print fallback to window.print:", printErr);
        window.print();
      } finally {
        setTimeout(() => {
          const frame = document.getElementById("receipt-print-iframe");
          if (frame) document.body.removeChild(frame);
        }, 3000);
      }
    }, 300);
  } catch (err) {
    console.error("Print receipt isolated error:", err);
    window.print();
  }
}

/**
 * Downloads a standalone .html receipt file.
 */
export function downloadReceiptHtml(data: ReceiptData): void {
  const html = generatePrintableReceiptHtml(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Invoice_${data.paymentId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a compact, official .txt receipt file.
 */
export function downloadReceiptTxt(data: ReceiptData): void {
  const formattedDate = data.date
    ? new Date(data.date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

  const numericAmount = Number(data.amount) || 0;

  const content = `============================================================
              OFFICIAL PAYMENT RECEIPT
             CYPHERTECH DIGITAL SOLUTIONS
           Merchant Legal Entity: CypherTech
============================================================
Payment Status: VERIFIED & CAPTURED
Date & Time:    ${formattedDate}
Transaction ID: ${data.paymentId}
Order Reference:${data.orderId}
------------------------------------------------------------
PAYER DETAILS:
Full Name:      ${data.customerName || "Valued Client"}
Billing Email:  ${data.customerEmail || "N/A"}
${data.customerPhone ? `Contact Phone:  ${data.customerPhone}\n` : ""}------------------------------------------------------------
TRANSACTION BREAKDOWN:
Item / Scope:   ${data.planName}
Amount Paid:    INR ${numericAmount.toFixed(2)}
Payment Method: Razorpay Online Gateway (256-Bit SSL)
Tax / GST:      Included (18% Digital Invoicing)
------------------------------------------------------------
MERCHANT & COMPLIANCE DETAILS:
Legal Entity:   CypherTech
Last Updated:   Sep 18th 2025
Support Email:  satyamhimesh@gmail.com
Terms:          https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/terms
Privacy:        https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/privacy
Refund Policy:  https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/refund
Shipping:       https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/shipping
Contact Us:     https://merchant.razorpay.com/policy/OCnAcIcFs79Xzt/contact_us
============================================================
This is an authentic computer-generated digital transaction receipt.
Please retain this file for your tax and accounting records.`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Receipt_${data.paymentId}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
