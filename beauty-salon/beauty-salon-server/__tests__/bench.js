const siege = require('siege');

siege()
    .on(8481)
    .concurrent(5)
    .for(1000).times
    .get('/main')
    .attack();
