module.exports = function(app, express, client){

    var route = express.Router();

    route.post('', function(req, res){
        // request : '/login' & method : post 

        var id = req.body.user_id;
        var pw = req.body.user_pw;
        var message = '';

        console.log(id, pw);

        client.query('SELECT id, pw FROM members WHERE id = \'' + id + '\'' + 'AND pw = password(\'' + pw + '\');', function(err, result, fields){
            
            if(err){ 

                message = {login_res:"500"};

                console.log(result);
                res.send(message);
            }else{

                var temp = JSON.stringify(result);

                if(temp === "[]"){
                    //undefined -- error

                    message = {login_res : "400"};
                    //400 : log-in failed - Not registered yet 
                    console.log(message);
                    res.send(message);
                } 
                //failed
                else{
                    message = {login_res : "200"};
                    //200 : log-in success
                    console.log(message);
                    res.send(message);
                }
                // success
            }
        });
    });

    return route;
};