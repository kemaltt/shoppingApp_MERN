// MongoDB initialization script
db = db.getSiblingDB('shopping_app');

// Create collections
db.createCollection('users');
db.createCollection('products');
db.createCollection('carts');
db.createCollection('orders');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.products.createIndex({ "name": "text", "description": "text" });
db.products.createIndex({ "category": 1 });
db.products.createIndex({ "price": 1 });
db.carts.createIndex({ "userId": 1 });
db.orders.createIndex({ "userId": 1 });
db.orders.createIndex({ "createdAt": -1 });

print('MongoDB initialized successfully for shopping_app');