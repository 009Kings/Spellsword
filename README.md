# SpellSword


6. Edit the models and corresponding migrations
This comes with a basic user model. If you want to add or delete any information from this, do so in both the model and its corresponding migration.

7. Migrate your database

8. If you have a .env file, you should create it and add it to your .gitignore

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
