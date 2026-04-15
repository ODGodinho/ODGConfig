> ⚠️ **Archived Project**
>
> This repository has been **archived** and is no longer actively maintained.  
> The project has been migrated to a **monorepo**.
>
> 👉 **New repository:** https://github.com/ODGodinho/ODGMono
>
> Please update your references and use the monorepo for the latest code and updates.

<h1 align="center">
    <a href="https://github.com/ODGodinho">
        <img
            src="https://raw.githubusercontent.com/ODGodinho/Stanley-TheTemplate/main/public/images/Stanley.jpg"
            alt="Stanley Imagem" width="500"
        />
    </a>
    <br />
    Config Package
    <br />
</h1>

<h4 align="center">Config packages 📦, Using Stanley the template!</h4>

<p align="center">

[![codecov](https://codecov.io/gh/ODGodinho/ODGConfig/branch/main/graph/badge.svg?token=HNBNLLPZ3J)](https://codecov.io/gh/ODGodinho/ODGConfig)
[![Stargazers](https://img.shields.io/github/stars/ODGodinho/ODGConfig?color=F430A4)](https://github.com/ODGodinho/ODGConfig/stargazers)
[![Made by ODGodinho](https://img.shields.io/badge/made%20by-ODGodinho-%2304A361)](https://www.linkedin.com/in/victor-alves-odgodinho/)
[![Forks](https://img.shields.io/github/forks/ODGodinho/ODGConfig?color=CD4D34)](https://github.com/ODGodinho/ODGConfig/network/members)
![Repository size](https://img.shields.io/github/repo-size/ODGodinho/ODGConfig)
[![GitHub last commit](https://img.shields.io/github/last-commit/ODGodinho/ODGConfig)](https://github.com/ODGodinho/ODGConfig/commits/master)
[![License](https://img.shields.io/badge/license-MIT-brightgreen)](https://opensource.org/licenses/MIT)
[![StyleCI](https://github.styleci.io/repos/562306382/shield?branch=main)](https://github.styleci.io/repos/562306382?branch=main)

</p>

# Table of Contents

- [🎇 Benefits](#-benefits)
- [📁 Dependencies](#-dependencies)
- [⏩ Get Started](#-get-started)
  - [🔘 Example Usage](#-example-usage)
  - [🧲 Get Configs](#-get-configs)
  - [💌 Send Configs to class](#-send-configs-to-class)
- [💻 Prepare to develop](#-prepare-to-develop)
- [📍 Start Project](#-start-project)
- [📨 Build and Run](#-build-and-run)
- [🧪 Test Code](#-test-code)

---

## 🎇 Benefits

- 🚀 Speed start new project or package using typescript
- 🚨 Over 800 rules for pattern, possible errors and errors in Linter
- 🎇 Code quality guaranteed
- 📢 AutoReview when opening a pull-request/merge
    ![AutoReview Comment example](https://user-images.githubusercontent.com/3797062/97085944-87233a80-165b-11eb-94a8-0a47d5e24905.png)
- 🧪 Automatic Test when opening pull-request/merge
- 📈 Automatic Code Coverage when opening pull-request/merge
    ![Code Coverage example](https://app.codecov.io/static/media/codecov-report.eeef5dba5ea18b5ed6a4.png)
- 📦 Automatic Package and release generate on merge
- 🪝 Run Lint/Test command pre-commit execute
- ⚙️ IOT/IOC (Inversion of Control) for easy use of libraries

## 📁 Dependencies

- [Node.js](https://nodejs.org) 18 or later
- [Yarn](https://yarnpkg.com/) Optional/Recommended

## ⏩ Get Started

---

### 🔘 Example Usage

Create new instance config class

```typescript
// Example transform config with zod
const zBoolean = zod.union([
    zod.string().transform((value): boolean => value === "true" || value === "1"),
    zod.boolean(),
]);

const myValidator = zod.object({
    USE_HTTPS: zBoolean,
    OPTIONAL: zod.string().optional(),
});

// Container Instance Configuration

const config = new JsonConfig<zod.infer<typeof myValidator>>({ ...process.env }, validator);
await config.init();
```

### 🧲 Get Configs

```typescript
const config: ConfigInterface;

// Get Configs
const useHttps = await config.get("USE_HTTPS");
const optional = await config.get("OPTIONAL", () => "default value");

// Has Config
if (await config.has("OPTIONAL")) {
    // Config key exists
}

// set Config
await config
    .set("OPTIONAL", "filled")
    .set("USE_HTTPS", false);

// All Configs
const all = config.all(); // Return Json with configs

// Prepare class to use
const all = config.init();
```

### 💌 Send Configs to class

> For packages and SDK, always prefer to send an object instead of the entire config class

```typescript
new PackageClass({
    timeout: await config.get("DEFAULT_TIMEOUT", () => 1000),
    attempt: await config.get("ATTEMPT"),
})
```

## 💻 Prepare To Develop

Copy `.env.example` to `.env` and add the values according to your needs.

## 📍 Start Project

First install dependencies with the following command

```bash
yarn install
# or
npm install
```

## 📨 Build and Run

To build the project, you can use the following command

> if you change files, you need to run `yarn build` and `yarn start` again

```bash
yarn build && yarn test
```

## 🧪 Test Code

To Test execute this command

```bash
yarn test
# or
yarn test:watch
```
