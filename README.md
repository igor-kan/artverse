# artverse

[![CI Status](https://github.com/igor-kan/artverse/workflows/CI/badge.svg)](https://github.com/igor-kan/artverse/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Last Commit](https://img.shields.io/github/last-commit/igor-kan/artverse)](https://github.com/igor-kan/artverse/commits/main)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)](https://tailwindcss.com/)

> Modern web application built with cutting-edge technologies

## ✨ Features

- 🚀 **Next.js 15** with App Router for optimal performance
- 💎 **TypeScript** for type safety and enhanced developer experience
- 🎨 **Tailwind CSS** for modern, responsive design
- ⚡ **Server-Side Rendering** for improved SEO and performance
- 🔧 **Modern Development Tools** with ESLint, Prettier, and automated workflows

## 🚀 Quick Start

### Prerequisites

- Node.js 20.11.0 or later
- npm or bun package manager
- Git version control

### Installation

```bash
# Clone the repository
git clone https://github.com/igor-kan/artverse.git
cd artverse

# Install dependencies
npm install
# or
bun install
```

### Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration

### Development

```bash
# Start development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:3000` (or appropriate port).

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── app/            # Next.js App Router pages
├── lib/            # Utility functions
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
└── styles/         # Global styles
public/             # Static assets
__tests__/          # Test files
```

## 🌐 Deployment

### GitHub Pages

```bash
npm run deploy
```

### Docker

```bash
docker build -t artverse .
docker run -p 3000:3000 artverse
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🐳 Docker Support

Docker support not yet implemented.

## 📄 Environment Variables

See [.env.example](.env.example) for required environment variables.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/artverse.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Install dependencies: `npm install`
5. Make your changes and test thoroughly
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to your branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern development tools and best practices
- Inspired by the open-source community
- Thanks to all contributors and users

## 📞 Support

- 📧 **Email**: Available through GitHub profile
- 🐛 **Issues**: [GitHub Issues](https://github.com/igor-kan/artverse/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/igor-kan/artverse/discussions)

## 🔗 Links

- 🌐 **Live Demo**: https://igor-kan.github.io/artverse
- 📚 **Documentation**: [Full Documentation](docs/)
- 🎯 **Project Board**: [GitHub Projects](https://github.com/igor-kan/artverse/projects)

---

**Made with ❤️ by [Igor Kan](https://github.com/igor-kan)**