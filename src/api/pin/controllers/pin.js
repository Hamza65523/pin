'use strict';

/**
 *  pin controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
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

module.exports = createCoreController('api::pin.pin',({strapi})=>({
    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
        
      // some custom logic here
      ctx.query = { ...ctx.query, local: 'en' }
  
      // Calling the default core action
      const { data, meta } = await super.find(ctx);
  
      // some more custom logic
      meta.date = Date.now()
  
      return { data, meta };
    },
    
    async create(ctx) {
      ctx.query = { ...ctx.query, local: 'en' }
  
      // Calling the default core action
      ctx.request.body.data={
        ...ctx.request.body.data,
        pin:generateRandomPIN()
      }
      const { data, meta } = await super.create(ctx);
  
      // some more custom logic
      meta.date = Date.now()
  
      return { data, meta };
    },
  
  }));















//   const twilio = {
//     id: "YOUR_TWILIO_ACCOUNT_ID",
//     token: "TWILIO_ACCOUNT_TOKEN",
//     phone: "TWILIO_PHONE_NO"
//   }
  
//   const smsClient = require('twilio')(twilio.id, twilio.token);
  
//   async create(ctx) {
  
//       const { phone, username } = ctx.request.body;
  
//       if (!phone) return ctx.badRequest('missing.phone');
//       if (!username) return ctx.badRequest('missing.username');
  
  
//       const userWithThisNumber = await strapi
//         .query('user', 'users-permissions')
//         .findOne({ phone });
  
//       if (userWithThisNumber) {
//         return ctx.badRequest(
//           null,
//           formatError({
//             id: 'Auth.form.error.phone.taken',
//             message: 'Phone already taken.',
//             field: ['phone'],
//           })
//         );
//       }
  
//       const token = Math.floor(Math.random() * 90000) + 10000;
      
//       const user = {
//               username,
//         phone,
//         provider: 'local',
//         token
//       };
  
//       const advanced = await strapi
//         .store({
//           environment: '',
//           type: 'plugin',
//           name: 'users-permissions',
//           key: 'advanced',
//         })
//         .get();
  
//       const defaultRole = await strapi
//         .query('role', 'users-permissions')
//         .findOne({ type: advanced.default_role }, []);
  
//       user.role = defaultRole.id;
  
  
//       try {
//         const data = await strapi.plugins['users-permissions'].services.user.add(user);
//         await smsClient.messages.create({
//           to: phone,
//           from: twilio.phone,
//           body: `Your verification code is ${token}`
//         })
//         ctx.created(sanitizeUser(data));
//       } catch (error) {
//         ctx.badRequest(null, formatError(error));
//       }
//     }




// async verifyAccount(ctx) {

//     const { phone, token } = ctx.request.body;

//     if (!phone) return ctx.badRequest('missing.phone');
//     if (!token) return ctx.badRequest('missing.token');


//     const verifyUserCode = await strapi
//       .query('user', 'users-permissions')
//       .findOne({ phone, token });

//     if (!verifyUserCode) {
//       return ctx.badRequest(
//         null,
//         formatError({
//           id: 'Auth.form.error.code.invalid',
//           message: 'Invalid Code or Number',
//           field: ['phone'],
//         })
//       );
//     }

//  let updateData = {
//       token: '',
//       confirmed: true
//     };


//     const data = await strapi.plugins['users-permissions'].services.user.edit({ id }, updateData);
//     const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
//       id: data.id,
//     })
//     ctx.send({ jwt, user: sanitizeUser(data) });
//   }