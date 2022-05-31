'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
      await queryInterface.bulkInsert('Tracks', [
        {userId: 1, name: "Grand Junction Motor SpeedWay", address: "3002 N I 70 Frontage Rd", city: "Grand Junction", state: "Colorado", country: "USA", phone: "(970) 256-0107", web: "http://www.grandjunctionmotorspeedway.com", price: "50"},
        {userId: 1, name: "Utah Motorsports Campus", address: "512 Sheep Ln", city: "Erda", state: "Utah", country: "USA", phone: "(435) 277-8000", web: "http://www.utahmotorsportscampus.com", price: "60"},
        {userId: 1, name: "SBR Motorsports Park", address: "21430 Spencer Rd", city: "Calhan", state: "Colorado", country: "USA", phone: "(719) 492-2635", web: "http://www.sbrmotorsportspark.com", price: "70"},
        {userId: 1, name: "Action Karting", address: "3051 S Rooney Rd", city: "Morrison", state: "Colorado", country: "USA", phone: "(303) 781-4483", web: "http://www.actionkarting.net", price: "80"},
        {userId: 1, name: "IMI Motorsports Complex", address: "5074 Summit Blvd", city: "Dacono", state: "Colorado", country: "USA", phone: "(303) 833-4949", web: "http://www.imimotorsports.com", price: "90"},
        {userId: 1, name: "Pheonix Kart Racing Assoc (PKRA)", address: "22500 43rd Ave E", city: "Glendale", state: "Arizona", country: "USA", phone: "info@PKRA.com", web: "http://www.PKRA.com", price: "55"},
        {userId: 1, name: "Musselman Honda Circuit", address: "11800 S Harrison Rd", city: "Tucson", state: "Arizona", country: "USA", phone: "(520) 245-5278", web: "http://www.mhcircuit.com", price: "65"},
        {userId: 1, name: "Simraceway Kart Track", address: "29355 Arnold Dr", city: "Sonoma", state: "California", country: "USA", phone: "(800) 733-0345 ", web: "http://www.simracewaydrivingschool.com", price: "100"},
        {userId: 1, name: "Sears Point Racing Experience", address: "29359 Arnold Dr", city: "Sonoma", state: "California", country: "USA", phone: "", web: "http://www.searspointracing.com", price: "50"},
        {userId: 1, name: "Motorsports Park Hastings", address: "427 S Showboat Blvd", city: "Hastings", state: "Nebraska", country: "USA", phone: "(402) 303-6427", web: "http://www.racemph.com", price: "75"},
        {userId: 1, name: "CalSpeed Karting Center", address: "9300 Cherry Ave", city: "Fontana", state: "California", country: "USA", phone: "(951) 506-9363", web: "http://www.calspeedkarting.com", price: "51"},
        {userId: 1, name: "Apex Kart Racing", address: "18700 Lake Perris Dr", city: "Perris", state: "California", country: "USA", phone: "(951) 940-0701", web: "http://www.apexracingcenter.com", price: "52"},
        {userId: 1, name: "GoPro Motorplex", address: "130 Motorplex Dr", city: "Mooresville", state: "North Carolina", country: "USA", phone: "(704) 696-2926", web: "http://www.gopromotorplex.com", price: "54"},
        {userId: 1, name: "Andersen RacePark", address: "10101 US-41 N", city: "Palmetto", state: "Florida", country: "USA", phone: "(941) 723-3900", web: "http://www.andersenracepark.com", price: "53"},
        {userId: 1, name: "Orlando Kart Center", address: "10724 Cosmonaut Blvd", city: "Orlando", state: "Florida", country: "USA", phone: "(407) 480-2477", web: "http://www.orlandokartcenter.com", price: "56"},
        {userId: 1, name: "Bushnell Motorsports Park", address: "5821 Pit Rd", city: "Bushnell", state: "Florida", country: "USA", phone: "(352) 568-0778", web: "http://www.bushnellmotorsportpark.com", price: "59"}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
