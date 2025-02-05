import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> February 5, 2025</p>
      <p><strong>Last Updated:</strong> February 5, 2025</p>

      <h2>1. Introduction</h2>
      <p>Welcome to <strong>Select Events</strong>. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our web app to sign up for events and integrate them with Google Calendar.</p>
      <p>By using our web app, you consent to the practices described in this Privacy Policy.</p>

      <h2>2. Information We Collect</h2>
      <p>When you use our web app, we may collect the following types of data:</p>
      <ul>
        <li><strong>Google Account Information:</strong> When you sign in using Google OAuth, we receive access to your Google Calendar based on the permissions you grant.</li>
        <li><strong>Event Data:</strong> When you add an event to your Google Calendar, we process event details (such as event name, date, and time).</li>
        <li><strong>Usage Data:</strong> We may collect anonymized usage statistics to improve our service.</li>
      </ul>
      <p>We <strong>do not</strong> store your personal data, including Google Calendar information, on our servers. All calendar interactions occur via the Google Calendar API.</p>

      <h2>3. How We Use Your Information</h2>
      <p>We only use your information to:</p>
      <ul>
        <li>Allow you to add events to your Google Calendar.</li>
        <li>Modify or update events when necessary (with your permission).</li>
        <li>Ensure a seamless event registration experience.</li>
      </ul>
      <p>We <strong>do not</strong> share, sell, or use your data for any other purpose.</p>

      <h2>4. How We Protect Your Data</h2>
      <ul>
        <li>We use <strong>Google OAuth 2.0</strong> for secure authentication.</li>
        <li>Our app <strong>does not store</strong> Google Calendar data on our servers.</li>
        <li>All data transfers occur via <strong>secure HTTPS encryption</strong>.</li>
        <li>We request <strong>only the minimum necessary permissions</strong> to manage your calendar events.</li>
      </ul>

      <h2>5. Third-Party Services</h2>
      <p>Our web app relies on the <strong>Google Calendar API</strong> to provide event management features. Your use of Google Calendar is subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google’s Privacy Policy</a>.</p>

      <h2>6. Your Choices and Control</h2>
      <p>You have control over your data, including:</p>
      <ul>
        <li><strong>Revoking Access:</strong> You can revoke our app’s access to your Google Calendar at any time via <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">Google Account Permissions</a>.</li>
        <li><strong>Managing Calendar Events:</strong> You can modify or delete events from your Google Calendar directly.</li>
      </ul>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with a revised "Last Updated" date.</p>

      <h2>8. Contact Us</h2>
      <p>If you have any questions or concerns about this Privacy Policy, you can contact us at:</p>
      <p>📧 <strong>jamesowens9614@gmail.com</strong></p>
    </div>
  );
};

export default PrivacyPolicy;

