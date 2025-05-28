# 🎮 Cinema Project – Automated Test Report

## 📝 Description

This report describes the testing performed for our cinema web application project.

Due to authentication restrictions (admin access requires secure cookies), we created a mini-version of the project**, placed in the folder secretfolder, to implement and demonstrate automated testing independently.

We used mocking to simulate PrismaClient methods and isolate logic.

---

## ✅ What We Tested

### 🔹 Unit Tests (Jest)

Tests isolated controller logic without a real database.

### 🔹 API Integration Tests (Jest + Supertest)

Simulated HTTP requests using a minimal Express server.

### ⚠️ Admin Logic Note

The full version of the cinema project protects admin functionality (like adding or deleting movies) behind HTTP-only authentication cookies.
These cookies are not easily simulated in automated tests without a real login flow.

Because of this, we extracted the logic into a separate testable folder called secretfolder, where the code structure and functionality mirror the real app, but are run independently.

## 🛠 Tools Used

Jest – for unit and API tests

Supertest – for HTTP request simulation

Express – for a minimal mock API server

Node.js – with mocked Prisma Client

## 📁 Project Structure

- /controllers/
- ├── movieController.js             # Original controller logic (reference)
- ├── movieController.test.js        # Unit tests for original controller
- ├── package-lock.json
- ├── package.json

- /node_modules/                    # Dependencies

### The Kinollo's code for tests
- /secretfolder/
- ├── bookingController.js           # Booking logic (copied from real app)
- ├── Controller.test.js             # Unit tests for booking logic
- ├── movieController.js             # Logic for movie operations

- .gitignore                        # Git exclusions
- api.test.js                       # API integration tests
- app.js                            # Express server setup
- package-lock.json
- package.json
- README.md                         # This test report

## 📊 Status

### ✅ All tests are passing

### ✅ Code matches the real project structure

### ✅ Ready for extension (e.g. POST, PUT, E2E)

### ❗ Admin logic tested in isolation due to authentication

## 👨‍💻 Author

Name: Vladislav Djatsenko, Artemiy Vorozun, Kristofer Beljakov

