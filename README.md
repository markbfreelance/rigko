# Rigko 

**PC part picker for Southeast Asia — built in the Philippines.**

Rigko helps users discover, compare, and plan PC builds using real-time pricing and availability from retailers across Southeast Asia. Inspired by [PCPartPicker](https://pcpartpicker.com), but designed for the SEA market where pricing, availability, and retailer ecosystems are vastly different.

## Why Rigko?

Building a PC in Southeast Asia means juggling tabs across dozens of local retailers, converting currencies, and guessing at compatibility. PCPartPicker doesn't cover the region — Rigko fills that gap.

- **Regional pricing** — aggregated from Philippine and SEA retailers
- **Compatibility checks** — catch issues before you buy
- **Build lists** — save, share, and compare full builds
- **Price tracking** — historical price data so you never overpay

## Tech Stack

| Layer       | Technology               |
| ----------- | ------------------------ |
| Framework   | Next.js 16               |
| UI          | React 19, Tailwind CSS 4 |
| Language    | TypeScript 5             |
| Linting     | ESLint 9                 |

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** (comes with Node)

### Installation

```bash
git clone https://github.com/your-username/rigko.git
cd rigko
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
rigko/
├── app/
│   ├── favicon.ico
│   ├── globals.css       # Global styles & Tailwind config
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## Roadmap

- [ ] Component database (CPUs, GPUs, motherboards, RAM, etc.)
- [ ] Retailer scraping pipeline for PH stores
- [ ] Compatibility engine
- [ ] Build list creation & sharing
- [ ] Price history charts
- [ ] Multi-country support (PH, SG, MY, TH, VN, ID)
- [ ] User accounts & saved builds
- [ ] Community build guides
- [ ] Mobile-responsive build planner

## Contributing

Contributions are welcome! Open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

---

Made with 🇵🇭 from the Philippines.
