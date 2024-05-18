## IMPROVEMENTS

### RefreshToken

Depending on the platform's usage, check how long refresh tokens typically last in terms of expiration on common platforms like Twitch. Assuming a expiration period of 365 days, it would mean that a user could access the platform within a 365-day period before their session expires. There might be cases where a user continuously creates new refresh tokens because they don't have access to the previous ones, either because they were deleted from their browser or because they logged in from an incognito browser. This could lead to an excess of unused refresh tokens in the database. The database should have a procedure to delete those refresh tokens that haven't been used for a certain period. The issue with this is that if we set that certain period to less than 365 days (let's say 30 days), which is the expiration duration of the refreshToken, then having that expiration doesn't make sense anymore because the refreshToken would have expired in 30 days, and thus the session expiration would be 30 days, not 365 days.

One possible solution is to have a database procedure that deletes tokens that have exceeded their expiration date, meaning they have been around for more than 365 days. Additionally, limit the number of tokens a user can have stored. Let's assume a limit of 8 tokens per user. That user can only have 8 active sessions. If they reach the limit of 8 active sessions and try to initiate a new session, the oldest one is deleted (the oldest token) to make room for the new one. If they try to log in with a token from those 8 sessions, there won't be an issue because the old token is deleted and the new one is saved, maintaining the limit of 8 sessions.

For this last solution, we must handle what happens when trying to log in with a token that has already been deleted because currently, this is being detected as an attempt to reuse a token due to a possible hack, leading to the deletion of all tokens from that user and invalidating all sessions. This is a situation that doesn't apply to our previous case. One solution is to sacrifice this security measure of deleting all tokens from that user and treat it as if it were a new token.

### Login

Control the number of logins, meaning that the same user makes numerous logins. This could result in the creation of multiple refresh tokens for the same user, possibly achieved with a browser in incognito mode. To address this, limit the number of consecutive logins by the same user. This could be solved with the solution from the previous step.

### Signup

Control the possibility of someone registering with multiple accounts simultaneously. This could be an attempt to create bots or fake accounts. To address this, limit the number of registrations made from the same IP address and fingerprint.
