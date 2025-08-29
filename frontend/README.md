Data Scraper Chrome Extension

A lightweight Chrome extension built with React that lets users:

🔍 Select elements from any webpage

📑 Extract structured data

📂 Export the data as a CSV file

💡 Get random advice (via free API integration) with a modern yellow–black themed UI

🚀 Features

Element Selection →

🖱️ Single click → Select element

🖱️ Double click → Deselect element

Data Extraction → Collect structured information instantly

Export CSV → Download scraped data in .csv format

Random Advice (API Integration) → Uses the Advice Slip API
 (a free public API) to display random advice

Modern UI → Sleek yellow + black theme with glowing effects

🛠️ Tech Stack

React (Create React App)

JavaScript (Manifest V3 for Chrome Extensions)

HTML & CSS (Custom themed UI)

Advice Slip API (Free API for random advice feature)

📋 Requirements (as per assignment)

✅ Build frontend using React.js, HTML, CSS
✅ Integrate at least one free API → Advice Slip API
✅ Maintain clean, modular, and commented code
✅ Submit project via required format

⚡ Installation

Clone the repository:

git clone https://github.com/RichaKumariDas/data-scraper-extension.git
cd data-scraper-extension/frontend


Install dependencies:

npm install


Build the extension:

npm run build


Load in Chrome:

Open chrome://extensions/

Enable Developer Mode (top right)

Click Load unpacked and select the build/ folder inside frontend/

📦 Folder Structure
data-scraper-extension/
│── frontend/
│   │── public/          # Static assets (icons, index.html)
│   │── src/             # React components & styles
│   │── build/           # Production-ready extension (load this in Chrome)
│   │── manifest.json    # Chrome Extension config
│   │── package.json     # React dependencies
│   │── README.md        # Project documentation

👤 Author

Richa Kumari

📧 Email: richadas9801@gmail.com

💻 GitHub: github.com/RichaKumariDas

🔗 LinkedIn: linkedin.com/in/richadas02