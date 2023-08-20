Store the access token in your app state, not in local storage or in a cookie that can be accessed by JS

Store the refresh token only in an cure cookie that cannot be accessed by JS but can be sent to */refresh* endpoint to get the new refresh token.

