const mongoose = require('mongoose');
const { Schema } = mongoose;

const permissionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String
});

module.exports = mongoose.model('Permission', permissionSchema);
