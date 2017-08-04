module.exports = function(res, client, user_id, device_token, __title, __body, __data1, __data2){

	var FCM = require('fcm-node');
    var serverKey = 'AAAAUazv_K0:APA91bEb4NaFiLUjIserQIaOUAhhBIYpd2FxHrJm8acZ4U838jZkZB5LrvvFdMQPoHbSUOLZ_7Yn507rsJp_5ZBcTKm_AU7ffVTrkxNjL4ej9NohtM775u_7P0tg9v3p7rjrlsWHBu8g'; 
    //put your server key here 
    var fcm = new FCM(serverKey);

    var __collapse_key = '1ihgenamd;w49ygawpthgamfdsv';
    var __token = '';

    client.query('SELECT reg_id FROM members WHERE id = \'' + user_id + '\';', function(err, token){

        if(err)
            res.send({tokenRes: "500"});

        else if(token.length != 0){
            
            __token = token[0].reg_id;
            
            if(__token != device_token){
                client.query('UPDATE members SET reg_id = \'' + device_token + '\' WHERE id = \'' + user_id + '\';', function(err, result){
                    __token = device_token;

                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
                        to: __token, 
                        collapse_key: __collapse_key,
                            
                        notification: {
                            title: __title, 
                            body: __body 
                        },
                                
                        data: {  //you can send only notification or only data(or include both) 

                        }
                    };
                    
                    fcm.send(message, function(err, response){
                        if (err) {
                            console.log(err);
                            
                            res.send({tokenRes : "401"});
                        }
                        else {
                           console.log(response);
                           res.send({tokenRes : "200"});
                        }
                    });
                });
            }

        }
        else{
            res.send({tokenRes : "401"});
        }
    });
}