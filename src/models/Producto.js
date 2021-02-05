const { Schema, model } = require('mongoose');

const productoSchema = new Schema({
    name:String,
    category:{
        categoryIndex:String,
        categoryName:String
    },
    unsubscribed:Boolean,
    brand:{
        brandIndex:String,
        brandName:String
    },
    actualPrice:Number,
    originalPrice:Number,
    discount:Number,
    rating:Number,
    opinionQuantity:Number,
    stockSize:Number,
    description:String,
    soldTimes:Number,
    imgUrl:String
},{
    timestamps: true
});

productoSchema.index({ name: 'text'});

productoSchema.methods.setImgUrl = function setImgUrl( filename ){
    this.imgUrl = filename;
}

module.exports = model('Producto', productoSchema);