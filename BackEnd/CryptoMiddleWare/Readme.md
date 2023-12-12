# this folder will contains all the js files that will be an intermidiare between the result of react wich is a crypted values and the controllers methods that are called from routes pages.

for example in .Controllers/userController we have method createUser that takes the req of body as this

# const {username, email, password} = req.body

but in reality the req body is completly different from this.
the body will be only one hashed String that first we need to decrypt then we need to extract the data that are needed for the controller

so the result will be :

# const {username, email, password} = cryptoMiddleWareFunction(req.body);

and the same result need to appear.

and the same Idea with all part that need cryptography
