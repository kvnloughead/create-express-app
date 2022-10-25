# Create Express App (CEA)

Command line utility to streamline creation of Express projects using MongoDB.

## Setup

- Clone the repo
- Install node modules
- Run `npm link` (applying `sudo` if necessary)

## Usage

Create a minimal express app, without any Mongo schema:

```
mongo-express -n project-name
```

This produces a fairly standard express app structure file structure.

```
root/
  controllers/   # empty
  models/        # empty
  routes/
    index.js
  utils/
    constants.js # exports the DB address
  index.js       # basic boilerplate
  .gitignore     # ignores node_modules and .DS_Store
  package.json
```

It also initializes it as a Git repo and installs the necessary modules (express, mongoose, cors, and validator).

Adding models is accomplished by adding the `-m` flag, followed by a space separated list of models.

```
# creates a file structure like above, but adds files for
mongo-express -n foobar -m foo bar
```

## Development Usage

I've been setting an alias

```bash
alias run-cea'cd ~/dev/testdir && rm -rf project && create-express-app'
```

And then I run

```bash
run-cea -n project
```

to test it.
