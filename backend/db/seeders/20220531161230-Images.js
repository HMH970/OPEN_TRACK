'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Images', [
        {trackId: 49, url: "https://www.qualityinngrandjunction.com/wp-content/uploads/speedway.jpg"},
        {trackId: 50, url: "https://s3.us-east-1.amazonaws.com/k360uploads/images/20191104-umc-utah.jpg"},
        {trackId: 51, url: "https://www.thecoloradokarter.com/wp-content/uploads/2018/10/The-Karter-Announcements-678x381.png"},
        {trackId: 52, url: "https://www.uncovercolorado.com/wp-content/uploads/2016/09/Action-Karting-Morrison-1280x640.jpg"},
        {trackId: 53, url: "https://ekartingnews.com/wp-content/uploads/2013/05/RMPKC-R3-S1S2.jpg"},
        {trackId: 54, url: "https://ekartingnews.com/wp-content/uploads/2022/02/COTA-2022-PKRA-Sun-Hunter-Pickett.jpg"},
        {trackId: 55, url: "https://img.grouponcdn.com/deal/5a7b0b8d810f440297919c9cf6fe441d/1d/v1/t440x300.jpg"},
        {trackId: 56, url: "https://searspointracing.com/wp-content/uploads/2018/03/0J5A8738.jpg"},
        {trackId: 57, url: "https://i.pinimg.com/originals/92/2f/ee/922fee8bbb58baafcb35b825f121b5dc.jpg"},
        {trackId: 58, url: "https://visitnebraska.com/sites/default/files/styles/listing_slideshow/public/listing_images/profile/2514/mph_green_2.JPG?itok=WjKOhhXN"},
        {trackId: 59, url: "https://www.gokartingtickets.com/wp-content/uploads/2020/06/CalspeedKartingCenter-foto2.jpg"},
        {trackId: 60, url: "https://yellow.place/file/image/cover/0/0/344/hnyenwljsvwhqqxf.jpg"},
        {trackId: 61, url: "https://www.gokartingtickets.com/wp-content/uploads/2020/06/gopro-motorplex-1-1.jpg"},
        {trackId: 62, url: "https://www.andersenracepark.com/wp-content/uploads/2018/07/ARPClubRace-01-1024x515.png"},
        {trackId: 63, url: "https://orlandokartcenter.com/wp-content/uploads/2020/12/OKC-2020.jpg"},
        {trackId: 64, url: "https://bushnellmotorsportspark.com/wp-content/uploads/2020/04/This-Is.png"},


      ], {});
  },

   down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
     return queryInterface.bulkDelete('Images', null, {});
  }
};
