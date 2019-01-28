var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, max: 100},
    family_name: { type: String, required: true, max: 100},
    date_of_birth: { type: Date},
    date_of_death: { type: Date}
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name+', '+this.first_name;
})

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function(){
  return ((this.date_of_death ? this.date_of_death.getFullYear() : new Date().getFullYear()) 
  - this.date_of_birth ? this.date_of_birth.getFullYear() : new Date().getFullYear()).toString
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function(){
  return '/catalog/author/'+this._id;
});

AuthorSchema
.virtual('birthday')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('DD.MM.YYYY') : '';
})

AuthorSchema
.virtual('deathday')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('DD.MM.YYYY') : '';
})

// Export model
module.exports = mongoose.model('Author', AuthorSchema);