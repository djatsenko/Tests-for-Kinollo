// backend/src/controllers/Controller.test.js
const axios = require('axios');

describe('MovieController (API)', () => {
  it('should return movies, including a movie titled Sonic', async () => {
    const response = await axios.get('http://localhost:3000/api/movies'); 

    const movies = response.data;

    expect(movies).toEqual(expect.arrayContaining([
      expect.objectContaining({
        title: 'Sonic',
      }),
    ]));
  });

  it('should not return a movie titled DeadSonic', async () => {
    const response = await axios.get('http://localhost:3000/api/movies'); 

    const movies = response.data;

    expect(movies).not.toEqual(expect.arrayContaining([
      expect.objectContaining({
        title: 'DeadSonic',
      }),
    ]));
  });
});

describe('BookingController (API)', () => {
  it('should return bookings associated with a movie titled Sonic', async () => {
    const response = await axios.get('http://localhost:3000/api/bookings'); 

    const bookings = response.data;

    expect(bookings).toEqual(expect.arrayContaining([
      expect.objectContaining({
        schedule: expect.objectContaining({
          movie: expect.objectContaining({
            title: 'Sonic',
          }),
        }),
      }),
    ]));
  });
});

// Note: That's how test was written inside kinollo code
// A lot of Controllers ain't accessible cause of Cookie Token Admin's troubless
