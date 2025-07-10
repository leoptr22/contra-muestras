# 🧪 Contra-Muestras – Batch Registration App

A lightweight web application built with React to register and manage product batches (contra-samples) in production or quality control processes. Ideal for labs or manufacturing environments that need quick, centralized traceability.

## ✅ Features

- Register product data: name, format, packaging date, batch number, box, pallet number, and observations.
- View the most recently registered batch.
- Access the complete batch log via a public Google Spreadsheet (read-only).
- Clean and responsive interface accessible from any device.

🔗 [View the spreadsheet (read-only)](https://docs.google.com/spreadsheets/d/e/2PACX-1vS5a4boHpF-FkSVH6HqawmLRBF7g7YP_SVD92i_zwq2xAH6Lkk1EV5u1TDQx3jp5X9nmmg5m0KyhDBN/pubhtml)

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/) + JSX
- [Vite](https://vitejs.dev/) for fast development
- Modular CSS (`Contramuestras.css`)
- Fetch API + Google Apps Script (no backend server required)

---

## 📦 Local Setup

```bash
git clone https://github.com/leoptr22/contra-muestras.git
cd contra-muestras
npm install
npm run dev
⚠️ No backend is required. Data is sent directly to a public Google Sheet using a Google Apps Script endpoint.

📁 Project Structure
bash
Copiar
Editar
src/
├── App.jsx
├── Contra_muestras.jsx      # Main form component
├── UltimoLote.jsx           # Displays the latest batch
├── ModalUltimoRegistro.jsx  # (Optional) modal for last batch
├── Contramuestras.css       # Component styling
└── ...
🧪 Use Cases
Quality control or lab record-keeping in industrial environments.

Basic batch registration without ERP systems.

Digitization of paper-based logs or manual entry forms.

✨ Contributing
This project is simple and open to improvements. Feel free to fork, suggest enhancements, or open issues!
