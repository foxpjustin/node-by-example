# Install Package With npm

When you install Node.js on your machine, typically it comes bundled with [npm](http://npmjs.com) which is the Node.js Package Manager. In this example we are going to show you how to install packages with npm.

The simplest way to install a package is simply running

```sh
npm install <package-name>
```

But there are many things to consider when installing a package with npm. For example, if you're current directory you're installing in does not have a `package.json` file, npm will emit a warning letting you know that. So you cannot do things like saving the installed package.

```sh
npm install express
~/project
└─┬ express@4.13.4
  | ...
  └── vary@1.0.1

npm WARN enoent ENOENT: no such file or directory, open '~/project/package.json'
npm WARN test No description
npm WARN test No repository field.
npm WARN test No README data
npm WARN test No license field.
```

This does not however stop the installation of the package. You can create a `package.json` file by running

```sh
npm init
```

This will trigger an interactive prompt to start constructing your `package.json` file. Once you have filled out all the relevant information it will generate your `package.json` file, which if you leave it to all default values by hitting return until it's done, you'll have something that looks like this

```sh
cat package.json
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Now when you install `express` the missing `package.json` file error will go away and you'll be left with just a warning about missing description and repository fields.

```sh
npm install express
~/project
└─┬ express@4.13.4
  | ...
  └── vary@1.0.

npm WARN test@1.0.0 No description
npm WARN test@1.0.0 No repository field.
```

Now with the presence of a `package.json` file, we can use the save flags.

```sh
npm install --save express
```

If you look at your `package.json` file, you'll notice something new.

```sh
cat package.json
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.4"
  }
}
```

You have a `dependencies` object now with an entry with the key `express` and the value `^4.13.4`. npm follows [Semver](http://semver.org/) when it comes to installing and saving of dependencies. That's what the `^` before the numbers in the version means. That tells npm that anytime you run `install` with that, no matter what always give me the latest version that is in the same MAJOR version. So if you install after deleting your `node_modules` folder and express has bumped to `4.15.3` Then that's the version that will be installed. But if express is now `5.0.0` you will not get that version, you'll get the last `4.x` version.

Now lets try another example.

```sh
npm install --save-dev lodash
```

Now if you look at your `package.json` file you'll notice something new added.

```sh
cat package.json
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.4"
  },
  "devDependencies": {
    "lodash": "^4.6.1"
  }
}
```

Now you'll see a new object `devDependencies`. This is the same as the `dependencies` except these are for packages in which are meant for being used while in development. This lets you install just the "real" dependencies, to save space and bandwidth, if you want to use the package and not modify it.

To install everything that is declared in `package.json`, you just run it without arguments.

```sh
npm install
```

Sometimes you want to install a command-line utility such as [localtunnel](https://www.npmjs.com/package/localtunnel), but it doesn't belong to any particular project. For this, there's the `--global` flag.

```sh
npm install --global localtunnel
```

**Never, ever, ever use global packages for project dependencies, ever.** It may seem "nice" and "efficient", but you will land in dependency hell. It is not possible to enforce semver constraints on global packages, and things will spontaneously break.

Global packages are *only* for *project-independent*, *system-wide*, *command-line tools*.
