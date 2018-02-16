define({ "api": [  {    "type": "get",    "url": "/products/:id",    "title": "Find the product",    "group": "Products",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "id",            "optional": false,            "field": "id",            "description": "<p>product_id</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 201 OK",          "type": "json"        },        {          "title": "Success",          "content": "HTTP/1.1 200 OK\n[{\n  \"product_id\": 12345678\n  \"name\": \"pizza\",\n  \"current_price\": {\n      \"currency_code\": \"USD\"\n      \"value\": 6.99\n  }\n}]",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "product not found",          "content": "HTTP/1.1 404 Not Found",          "type": "json"        },        {          "title": "Find error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/routes/product.router.js",    "groupTitle": "Products",    "name": "GetProductsId"  },  {    "type": "put",    "url": "/products/:id",    "title": "Update a product price",    "group": "Products",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "id",            "optional": false,            "field": "id",            "description": "<p>product_id</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "currency_code",            "description": "<p>Products new currency code</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "value",            "description": "<p>Products new value</p>"          }        ]      },      "examples": [        {          "title": "Input",          "content": "{\n  \"currency_code\": \"USD\",\n  \"value\": 109.99\n}",          "type": "json"        }      ]    },    "success": {      "examples": [        {          "title": "Success",          "content": "HTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Update error",          "content": "HTTP/1.1 500 Internal Server Error",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "./server/routes/product.router.js",    "groupTitle": "Products",    "name": "PutProductsId"  }] });
