// backend/src/controllers/bookingController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addBooking = async (req, res) => {
  const { email, seatIds, scheduleId } = req.body;

  if (!email || !seatIds || !scheduleId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const schedule = await prisma.schedule.findUnique({ where: { id: Number(scheduleId) } });
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const newBookings = await Promise.all(
      seatIds.map((seatId) =>
        prisma.booking.create({
          data: {
            email,
            seatId: Number(seatId),
            scheduleId: Number(scheduleId),
            status: "RESERVED",
          },
        })
      )
    );

    res.status(201).json({ message: "Booking added successfully", bookings: newBookings });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({ message: "Failed to add booking." });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        seat: true,
        schedule: {
          include: {
            movie: true,
            room: true,
          },
        },
      },
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings.' });
  }
};

module.exports = { addBooking, getBookings };