# How This Project Was Made

A slightly incomplete guide on how this project was made.

## 1. Dependencies

We use a couple frameworks and resources to help construct this project.

### Node/NPM

We use NPM as our package manager, which helps manage the various libraries we use.

To look at what dependencies we rely on, we recommend checking out `package.json`.

[Here's a basic overview of how to use NPM](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm).

### Vite & React

We use Vite as an easy way to allow people to view the frontend and actually host it on our machine.

For the actual content, we use React. If you've interacted with HTML before, it'll look a little familiar. We recommend taking a course for this just to get a sense of what you're looking at as you go through the codebase.

Here's a couple recommendations:

- [React Tutorial for Beginners (1 hour)](https://www.youtube.com/watch?v=SqcY0GlETPk)
- [Official React Quickstart](https://react.dev/learn)

### The Template

To create your own NPM+Vite+React app, we recommend you use `create-vite`, a convenient NPM tool that creates template projects.

```bash
npm create vite@latest my-react-app -- --template react
```

## 2. Running the frontend

Locally, looking at the frontend very simple. NPM allows you to write scripts in your `package.json`, and you just have to call `npm run [script-name]` to actually run it.

Check our `package.json` to see what our scripts look like. In the case of running the frontend, you should be looking at the `dev` script.

## 3. Deploying the Frontend

While running the frontend locally is simple, allowing others to see it requires a little tool called GitHub Pages.

GitHub, in its enterprise-y generousness, allows us to conveniently host websites.

To do this with NPM, we use a dependency called `gh-pages`. We essentially build the app using Vite, and give GitHub the built application using gh-pages.

```bash
vite build --base 
gh-pages -d dist
```
