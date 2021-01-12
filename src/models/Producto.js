const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    name:String,
    status:String,
    category:String,
    brand:String,
    actualPrice:Number,
    originalPrice:Number,
    discount:Number,
    rating:Number,
    opinionQuantity:Number,
    stockSize:Number,
    description:String,
    soldTimes:Number,
    colors:Array,
    imgUrl:String
},{
    timestamps: true
});

productoSchema.index({ name: 'text'});

productoSchema.methods.setImgUrl = function setImgUrl( filename ){
    this.imgUrl = 'http://localhost:3000/public/'+filename;
}

module.exports = model('Producto', productoSchema);