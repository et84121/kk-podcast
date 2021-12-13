# KK-Podcast

面試小作業

## Features

- [Vite](https://github.com/vitejs/vite) ⚡️, [Vue 3](https://github.com/vuejs/vue-next),
- 💨 [Windi CSS](https://github.com/windicss/windicss)
- 📦 [Components auto importing](./src/components)
- Easy to use svg icons based on [Iconify](https://iconify.design) 🔝
- Routing with [Vue Router 4](https://github.com/vuejs/vue-router-next)
- Deploy on Netlify

## Pre-📦

This repo brings few things pre-packed, so you don't need to install them manually everytime.

### Styling

- [Windi CSS](https://github.com/windicss/windicss) with [`vite-plugin-windicss`](https://github.com/windicss/vite-plugin-windicss)
- Default [Google Fonts](https://github.com/stafyniaksacha/vite-plugin-fonts#readme) with `vite-plugin-fonts`

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
  - [PurgeIcons](https://github.com/antfu/purge-icons) with [`vite-plugin-purge-icons](vite-plugin-purge-icons) Think about TailwindCSS + PurgeCSS, but for Icons.
  - Custom icons below `./assets/icons` with

### Plugins

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs
- Component auto-import with [`vite-plugin-components`](https://github.com/antfu/vite-plugin-components)

### Dev tools

- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
- [Windi CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense) - IDE support for Windi CSS
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete

## Commit Message Type

- feat: 新增/修改功能 (feature)。
- fix: 修補 bug (bug fix)。
- docs: 文件 (documentation)。
- style: 格式 (不影響程式碼運行的變動 white-space, formatting, missing semi colons, etc)。
- refactor: 重構 (既不是新增功能，也不是修補 bug 的程式碼變動)。
- perf: 改善效能 (A code change that improves performance)。
- test: 增加測試 (when adding missing tests)。
- chore: 建構程序或輔助工具的變動 (maintain)。
- revert: 撤銷回覆先前的 commit 例如：revert: type(scope): subject (回覆版本：xxxx)。

**Ref:** https://wadehuanglearning.blogspot.com/2019/05/commit-commit-commit-why-what-commit.html

### Project setup

```
yarn
```

### Use it

```
yarn dev
```

This will serve the app at [http://localhost:3260](http://localhost:3260)

### Build it

```
yarn build
```

Builds the app for production to the `dist` folder.<br>
It correctly bundles Vue in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### Deployment

Visit [Netlify](https://app.netlify.com/start) and select your repo, select OK along the way, and your App will be live in a minute.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur). Make sure to enable `vetur.experimental.templateInterpolationService` in settings!

### If Using `<script setup>`

[`<script setup>`](https://github.com/vuejs/rfcs/pull/227) is a feature that is currently in RFC stage. To get proper IDE support for the syntax, use [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) instead of Vetur (and disable Vetur).

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:

### If Using Vetur

1. Install and add `@vuedx/typescript-plugin-vue` to the [plugins section](https://www.typescriptlang.org/tsconfig#plugins) in `tsconfig.json`
2. Delete `src/shims-vue.d.ts` as it is no longer needed to provide module info to Typescript
3. Open `src/main.ts` in VSCode
4. Open the VSCode command palette
5. Search and run "Select TypeScript version" -> "Use workspace version"

![repository-banner.png](https://res.cloudinary.com/alvarosaburido/image/upload/v1612193118/as-portfolio/Repo_Banner_kexozw.png)
