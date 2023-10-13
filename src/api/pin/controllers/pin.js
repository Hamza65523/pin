'use strict';
const {getService} = require("@strapi/plugin-users-permissions/server/utils");
/**
 * A set of functions called "actions" for `pin`
 */

const {createCoreController} = require('@strapi/strapi').factories;

function generateRandomPIN() {
  const length = 6; // You can adjust the length as needed
  const characters = '0123456789';
  let pin = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    pin += characters.charAt(randomIndex);
  }
  return pin;
}
function generateRandomToken(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
  }

  return token;
}

module.exports = createCoreController('api::pin.pin', ({strapi}) => ({


  async createPin(ctx){
    const {  latitude, longitude,name,address,locationType,customMinutes} = ctx.request.body;
    const posts = await strapi.db.query('api::pin.pin').create({data:{
      latitude,
      longitude,
      address, 
      name,
      locationType,
      pin:generateRandomPIN(),
      resetToken:generateRandomToken(8),
      expireToken:new Date(Date.now() + customMinutes * 60 * 1000), 
    }});
    const sanitizedEntity = await this.sanitizeOutput(posts, ctx);
    
    return this.transformResponse(sanitizedEntity);
  },
  async getAllPin(ctx){
    const posts = await strapi.db.query('api::pin.pin').findMany();
   
    const sanitizedEntity = await this.sanitizeOutput(posts, ctx);
    return this.transformResponse(sanitizedEntity);
  },
  async getPinId(ctx){
    const pin = ctx.request.params.pin;
console.log(pin)
const posts = await strapi.db.query('api::pin.pin').findOne({
  where: {"pin": pin,"expireToken":{$gt:Date.now()}}
});

    // .findOne({where: {"PrimaryPhone": phone}});
    // const posts = await strapi.db.query('api::post.post').findMany({
    //   where: {
    //     "users_permissions_user": id,
    //   },
    // });
    const sanitizedEntity = await this.sanitizeOutput(posts, ctx);
    return this.transformResponse(sanitizedEntity);
  },

}));