# Launchpad Events Platform - Frontend

This is the frontend for the Launchpad Events Platform, a web application designed to facilitate event management and user interaction. The app is built using React and leverages Firebase for user authentication. It also integrates with a custom backend and Google Calendar API for extended functionality.

# Features

General Users

- View Events: Users can browse all available events.
- Sign Up for Events: Users can register their interest in events and have them added to their profile.
- Add Events to Google Calendar: Signed-up events can be added directly to the user's Google Calendar.
- Register an Account: New users can create an account using the app's registration system.

Staff

- Create Events: Staff members can create new events, including setting event details such as name, time, location, and description.
- Delete Events: Staff members can remove events as needed.
- Dynamic Role-Based Rendering
- The app dynamically adjusts its interface and functionality based on the current user's role:

Users: Have access to user-specific features like signing up for events.

Staff: Gain access to staff-specific tools like creating and deleting events.

Authentication Integration: Firebase authentication ensures that users are logged in before accessing event features, and roles are determined by syncing Firebase users with a MongoDB-based user management system.


# View Locally

    npm run dev

  select the local host link and view
