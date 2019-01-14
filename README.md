# auth-boiler

1. Clone this to your machine with a new name.
```
$git clone https://github.com/009Kings/auth-boiler.git your-project-name
```

2. Install npm
```
$npm install
```

3. Customise your project
Change your title, logo, etc in the layout.ejs, update the package.json and the readMe.

4. Create/link your database
```
$createdb projectDatabase
```

5. Edit your config.json
This boilerplate was set up using the SQL database postgreSQL. If you are using something else, make sure to update that as well in the json file.

6. Edit the models and corresponding migrations
This comes with a basic user model. If you want to add or delete any information from this, do so in both the model and its corresponding migration.

7. Migrate your database

8. If you have a .env file, you should create it and add it to your .gitignore

9. Check that everything is up and running
Check your http://localhost:3010/ (or whatever you set it to) to see if everything is working.

10. Create a new remote repo and connect to it
Change the remote origin from the original auth to your new repo.
* If you want to check what your remote is at now:
```
$git remote -v
```
Your repsonse should look something like this:
```
origin  git@github.com:009Kings/auth-boiler.git (fetch)
origin  git@github.com:009Kings/auth-boiler.git (push)
```
In order to change it, create a new remote respository on git and copy the html or SSH and change your remote url
```
$ git remote set-url origin git@github.com:USERNAME/newRemoteRepo.git
```

11. Style away! 
