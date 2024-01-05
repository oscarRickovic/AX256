const check = require('../MiddleWare/checkUserJWT');
const userController = require('../controllers/userController');
const setLine = async(socket, value) => {
    let type = (value ? "onLine" : "offLine")
    socket.on(type, async (token) => {
        let result = await check.checkUserJwtMethod(token);
        if(result.status == 200) {
          let user = result.user;
          let res = await userController.setLine(user, value);
          if(res.status == 200) {
            console.log(user.username + " " + type)
          }
        }
    });
}

module.exports = setLine;