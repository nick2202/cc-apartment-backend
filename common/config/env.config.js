module.exports = {
    "port": 3100,
    "appEndpoint": "http://localhost:3100",
    "apiEndpoint": "http://localhost:3100",
    "jwt_secret": "myS33!!creeeT",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    }
};
