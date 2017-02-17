var redis = require("redis"),
    client = redis.createClient();

client.get("keyfoo", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});
