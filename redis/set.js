var redis = require("redis"),
    client = redis.createClient();

client.set("keyfoo", "some val");
