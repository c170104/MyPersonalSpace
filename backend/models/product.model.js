const mongoose = require('mongoose'); // Erase if already required
const AutoIncrement = require('mongoose-sequence')(mongoose);

const beautifyUnique = require('mongoose-beautiful-unique-validation');

var productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    description: {
        type:String,
    },
    price: {
        type:Number,
        required:true,
    },
    image_url: {
        type:String,
    },
});

productSchema.plugin(AutoIncrement, {inc_field: 'id'});
productSchema.plugin(beautifyUnique);

module.exports = mongoose.model('Product', productSchema);