# api-auth-app
BASIC API Authentication on NodeJs Application

##Objective
Develop a simple User Authentication for an API in Node application. The API will consume JSON requests and respond with JSON output. The application should have 1 Public API that can be accessed anonymously, 1 Public API that can be accessed by any authenticated user and 1 Private API which can only be accessed with a certain permissions of a certain user. 

##Design

There are 3 different APIs suggested

 ###1
 API: /products
 Description : This API (public API) returns the list of products as JSON, Authorization header is not required, hence this API can be  accessed by anyone anonymously.
 Method: GET
 Request Data: None
 Response Data Example:
 [
  {
	productId: 1983921,
	name: 'Zantac 150 Maximum Strength Cool Mint Tablets',
	description: 'Look! Sugar-free heartburn relief. Ranitidine tablets 150 mg. Prevents & relieves heartburn associated with acid indigestion & sour stomach. Easy to swallow with water. '
	price: 24.99
   },
     {
	productId: 8273872,
	name: 'Prilosec OTC Frequent Heartburn Medicine and Acid Reducer Tablets, 28CT',
	description: 'Prilosec OTC provides heartburn treatment for frequent heartburn that occurs 2 or more days a week'
	price: 44.99
   },
    {
	productId: 277352,
	name: 'Magox Magnesium Oxide 400 mg Tablets',
	description: 'Dietary Supplement. Pharmaceutical grade. Most concentrated form of magnesium. Just one dose delivers over 120% of the daily value. Doctor recommended. Sugar and gluten-free.'
	price: 13.99
   },
     {
	productId: 1983921,
	name: 'Natural Vitality Natural Calm Anti Stress Original Unflavored Liquid Drink 350mg, 16 OZ',
	description: 'Magnesium and calcium are fundamental nutrients that need to be in balance with each other in order for you to fully experience good health. Their importance on a cellular level is critical. '
	price: 33.99
   }
 ]
 
  ###2
 API: /order
 Description : This API is used submit the order request by authenticated user, Authorization header is required.
 Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
 Method: POST
 Content-Type: application/json
 Request Data Example: 
 [
	{ itemId: 1983921, qty:1},
	{ itemId: 277352, qty:3},
	{ itemId: 8273872, qty:10},
 ]
 
 Response Data Example:
 {
	orderId : WEB9881928198,
	message : 'We have received your order, admin will review and approve the order for the shipment'
 }
 
 
 ###3
 API: /pending
 Method: POST
 Description : This API (Private API) is used by order admin to approve the order request, Authorization header is required.
 Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
 Content-Type: application/json
 Request Data Example:
 {
   orderId: 121983721
   status: 'approved'
 }
 
 
 
