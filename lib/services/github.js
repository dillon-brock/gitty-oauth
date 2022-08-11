const exchangeCodeForToken = async (code) => {
  const client_id = process.env.GH_CLIENT_ID;
  const client_secret = process.env.GH_CLIENT_SECRET;

  await fetch('https://github.com/login/oauth/access_token', 
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ client_id, client_secret, code })
    })
    .then(response => response.json())
    .then(jsonResponse => {
      try {
        return jsonResponse.access_token;
      }
      catch (e) {
        throw new Error(e);
      }
    });

};