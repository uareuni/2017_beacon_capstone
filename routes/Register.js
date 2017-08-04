module.exports = function(app, express, client){

     var route = express.Router();

     route.post('', function(req, res){

          var id = req.body.res_email;
          var pw = req.body.res_pw; 
          var name = req.body.res_name;
          var birth = req.body.res_birth;
          var addr = req.body.res_address;
          var phone = req.body.res_phone;
          var reg_id = req.body.res_reg_id;
          var name = req.body.res_name;

          var message = ' ' ;
          var temp_value = ' ';

          client.query('SELECT id FROM members WHERE id = \'' + id + '\'', function (err, result, fields){

              if(err){
                  message = {register_res: "500"};

                  console.log(message);
                  res.send(message);
              }
              // status code : 500 - query error
              else{

                  var result = JSON.stringify(result);
                  console.log(result);
                       
                  if(result === "[]"){

                      client.query('INSERT INTO members VALUES (\'' + id + '\', password(\'' + pw + '\'), \'' + addr + '\', \'' + birth + '\', \'' + phone + '\', \'' + reg_id + '\', \'' + name + '\')', function (err, result, fields){

                          if(err){
                            message = {register_res: "500"};
                            // 500 : query error
                            console.log(err);
                            res.send(message);
                          }
                          else{

                            var message = {register_res:"200"};
                            //200 : info is successfully registered
                            console.log(message);
                            res.send(message);

                          }
                      });
                  }
                  else{
                      var message = {register_res:"401"};
                      // 401 - sign-up failed : user already registered
                      console.log(message);
                      res.send(message);

                  }
              }
          }); 
     });

// prob : should server give user information?

     return route;
};

