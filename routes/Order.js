module.exports = function(app, express, client){

     var route = express.Router();
     var push_send = require('./modules/fcm/Push')

     route.post('/complete_and_push', function(req, res){

     	var user_id = req.body.id;
     	//var user_id = req.body.res_email;
     	var device_token = req.body.token;

     	push_send(res, client, user_id, device_token, '경배형', '성공했어요 ㅎㅎㅎㅎ', '1432', function(err, res){

     	});
     });
     //push test

     route.post('/enqueue', function(req, res){

     	var member_id = '\'' + req.body.orderList[0] + '\'';
     	// 전화번호 추가
     	var product_name = '\'' + req.body.orderList[2] + '\'';
     	var amount = '\'' + req.body.orderList[3] + '\'';

     	client.query('INSERT INTO queue VALUES (' + member_id + ', '+ product_name +', ' + amount + ');', function(insert_queue_err, insert_result){
			if(insert_queue_err)
				res.send({order_res: "500"});
			else
				res.send({order_res: "200"});
		});	
     });
     // request order

     route.post('/delete', function(req, res){

//     	var product_name = 
     	var member_id = '\'test\'';
     	var product_name = '\'아메리카노\'';
     	//var 

// query err -> 500
// failed -> 401

     	client.query('DELETE FROM queue WHERE member_id = ' + member_id + ';', function(delete_Queue_err, delete_Queue_result){
		     if(delete_Queue_err)
		     	res.send({order_res: "500"});
		     else
		     	res.send({order_res: "200"});
		});
     });

     route.post('/update', function(req, res){
     	var member_id = '\'test\'';
     	var product_name = '\'아메리카노\'';
     	var changed_amount = 10;

     	client.query('UPDATE queue SET amount = '+ changed_amount +' WHERE member_id ='+ member_id +' AND product_name = '+ product_name +';' , function(update_order_err, update_result){
     	
     		if(update_order_err)
     			res.send({order_res: "500"});
     		else
     			res.send({order_res:"200"});

     	});
     });

     route.post('/offer', function(req, res){
     	var major = '\'6461\'';
     	var minor = '\'6461\'';
     	var member_id = '\'test\'';

     	client.query('SELECT branch_id, product_name, amount FROM beacon NATURAL JOIN queue WHERE major = ' + major + ' AND minor = ' + minor + ';' , function(get_branchID_err, result){
     		
			if(get_branchID_err)
				res.send({order_res: "500"});
			
			else{
				if(result.length == 0)
					res.send({res: "402"});
				// 402: 결과 없음
				else{
					
					for(var i = 0; i < result.length; i++){
						result[i].product_name = '\'' + result[i].product_name + '\'';
						result[i].amount = '\'' + result[i].amount + '\'';
						result[i].branch_id = '\'' + result[i].branch_id + '\'';
						
						client.query('INSERT INTO buy VALUES('+ member_id +', '+ result[i].product_name +', '+ result[i].amount +', now(), '+ result[i].branch_id +');', function(insert_Buy_error, insert_result){
							if(insert_Buy_error)
								res.send({order_Res: "500"});
							else
								message = {order_res:"200"};
		    	 		});
					}

					res.send(message);
				}
			}
     	});
     });

     route.post('/ordered_list', function(req, res){

     	var member_id = '\'test\'';
     	// req.body_user.id;

     	client.query('SELECT product_name, amount, time FROM buy WHERE member_id = ' + member_id + ';', function(get_productList_err, list){
     		if(get_productList_err)
     			res.send(get_productList_err);
     		else
     			res.send(list);
     	});
     });
     // show ordered list

      route.post('/order_list', function(req, res){

     	var member_id = '\'test\'';
     	// req.body_user.id;

     	client.query('SELECT product_name, amount FROM queue WHERE member_id = ' + member_id + ';', function(get_productList_err, list){
     		if(get_productList_err)
     			res.send(get_productList_err);
     		else
     			res.send(list);
     	});
     });
     // show ordered list

     return route;
 };