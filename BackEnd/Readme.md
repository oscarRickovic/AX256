# For well managing backEnd we create different processes for that

1. Registering.
   The idea behind registering is classical in the start, a user enter 3 important informatrions
   (username, email, password).
   Those information will be sent to server. (Lets use axios for that ex : axios('https://localhost:4000', {informations})).

   - Client ( client 1) => enter username + email + password
   - isAllDataRespectFrontStandards : function that will see if the data are not null and don't have extra characters and client's email is a proper email and the password is good enough for be a password and doesn't containg username.

     -- First Approach of checking Email : Classical Checking --

   - check the unicity of email for this step we are using the classic checking using axios or just fetch we sent the email to server in clear then we check in DB if the email is already in use or not.

     -- Second Approach of Checking Email : Crypting email before send it --

   - When the page "Server.js" is running as backEnd, there is inside function that are running to generate two keys (public, private ) keys.
   - When a user ask for "/Register " first thing that happen is that the server return its public key, and the Client generate two keys public key and private key. (This step after front data validation)
   - The client now have the server key that use to connect with it. (Problem of changing server later for example we have 10 serves).
   - The user enter its data : {name, email, password} and all those data pass the first step wich is front checkUp, the next step is to verify the unicity of the email.
   - To Do that we encrypt all the data using the server key and the result will be something like this:
     {
     name : ldjkfojqefjeflqwnefldsffds2,
     emal : ejdfriojeqfrjewkfeqewoifkoi,
     password : ldmqfjpweifjrdpwefjqwjfep,
     clientPubKey : lkfsdpfjapajsfdjasjfd'asdjkfkajsddslahfhds (Not encrypted using pub Server Key)
     }
     then this Object will be sent to Server that take the email and decrypt it, then it will verify the DB if there is already there,
     if it the case, false response will be return and the client will repeat the same process again and again.
   - Now let's say that the client use a new email this time we decrypt the username also and we store those values :
     {
     name : John,
     emal : John_Doe@gmail.com,
     password : fkegireehiherkweerlwfjlfrl // as you can see the password have been change and always encrypt it because we decrypt it and encryptet again.
     // We will not use the public server key to encrypt the password why because the private key is not the same for all the servers and we need to compare the passwords in the future.
     The idea is using just hashing function as Sha256.
     }
   - When the new user have been register successfully we return a jwt token that the server generate with a timeStamp of 30 days then this jwt(code email wich is the id of users) + random String Key will be crypted using the user public Key + we add the same random genrated String by server crypted by server private key.
   - pay attention there is two different things : ((public key, private key) != random generated String)
     pub key and priv key used for crypto asym and generated String used for sym cryptography.
   - Now whats happen when the user receive crypted JWT + Crypted String?
     Server : user_pub_key_enc(Jwt + String) + server_private_key(String) ==> Client.
     Client will dec using the previous pub server key to get String.
     Client Will dec using its private key to get JWT + String.
     Then we compare the two values.
     If the two values are the same then the Client will Store the jwt in it's local Storage.
     If the two values are not same we ask again the Server to do the same work with same infos to get again the correct infos.

2. Login :

   - What's happen when a user want to login, first the user enter it's own informations (email and password) new public-private keys then it will crypt again the email and password using server public key that will be again returened using "/Login".
   - we associate the user data with it's public key and sent all informations.
   - The server again will decrypt data and check in the dataBase if they are the correct datas.
   - When there is auser with those credentials we will send again a JWT token and Generated String to the User and you will be in page "/Welcome"
   - Public key and private key are stored now in your localStorage.

3. Authorization :
   - In both registration and login we have make return this credential that is JWT is used specially for authorozation, now what happen after that is when the user want to do something what ever it is for example send message get Friends, match with new persons all those operation that are related to the server will need authorozation and using your own JWT we can assert that.
   - When you want to send message from clientX to clientY, first you will need to send it to DB,
     you will get Server pub key by link then you will use it to crypt your message and send your public key again and you will associate the JWt cryted with server public key.
   - Let's explain why we need all those informations:
   - First message is crypted to send it to server without any problems.
   - Client public Key is sent to Server to make server able to return response to user
   - Jwt is crypted with server pub key to send it to Server to decode it two times and read the user id then if the user id is presented in Db then the response will be generated and encrypted with the user pub key.

Achievements :
What we will need as cryptoGraphy things ?

1. npm install axios // for http requests.
2. npm install jsonwebtoken // To generate JWT tokens
3. npm install crypto-js // For cryptographic functions such as hashing.
4. npm install bcryptjs // For hashing and verifying passwords securely.
5. npm install node-rsa // RSA keys
6. npm install uuid // For generating random strings or unique identifiers.
