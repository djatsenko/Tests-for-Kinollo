🎮 Cinema Project – Automated Test Report

This report describes the testing performed for our cinema web application project.Due to authentication restrictions (admin access requires secure cookies), we created a mini-version of the project, placed in the folder secretfolder, to implement and demonstrate automated testing independently.

✅ What We Tested

🔹 1. Unit Tests (Jest)

Located in: secretfolder/controllers/movieController.test.js

Tested functions:

getMovies() – returns a list of movies or an error on failure.

deleteMovie() – deletes a movie by ID, handles "not found" and error cases.

We used mocking to simulate PrismaClient methods and isolate logic.

🔹 2. API Integration Tests (Jest + Supertest)

Located in: secretfolder/api.test.js

Tested endpoints via a minimal Express app (secretfolder/app.js):

GET /api/movies – returns a mocked movie list.

DELETE /api/movies/:id – handles both success and not-found cases.

⚠️ Note About Admin Features

The full version of the cinema project protects admin functionality (like adding or deleting movies) behind HTTP-only authentication cookies.These cookies are not easily simulated in automated tests without a real login flow.Because of this, we extracted the logic into a separate testable folder called secretfolder, where the code structure and functionality mirror the real app, but run independently.

🛠 Tools Used

Jest – for unit and API tests

Supertest – for HTTP request simulation

Express – for a minimal mock API server

Node.js with mocked Prisma Client

📁 Project Structure

repo-root/
├── secretfolder/
│   ├── controllers/
│   │   ├── movieController.js           # App logic (copied from real backend)
│   │   └── movieController.test.js      # Unit tests (Jest)
│   ├── app.js                           # Minimal Express server
│   ├── api.test.js                      # API tests (Supertest + Jest)
│   ├── package.json                     # Test dependencies & scripts
│   └── README.md                        # This report

✅ Status

✔ All tests are passing✔ Code matches the real project structure✔ Ready for extension (e.g. POST, PUT, E2E)❗ Admin logic tested in isolation due to authentication
