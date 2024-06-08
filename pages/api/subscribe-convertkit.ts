import { CONFIGS } from 'config';
import isValidEmail from 'utils/validations';

const subscribeConvertkit = async (req, res) => {
  const { email } = JSON.parse(req.body);

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const isValid = isValidEmail(email);

  if (!isValid) {
    return res.status(400).json({ error: 'Email is invalid.' });
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONFIGS.convertKitFromID}/subscribe`,
      {
        body: JSON.stringify({ email, api_key: CONFIGS.convertKitApiKey }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
    );

    // something went wrong on the convertkit server
    if (response.status >= 400) {
      return res
        .status(400)
        .json({ error: 'There was an error subscribing to the list.' });
    }

    // Success
    return res.status(201).json({ error: null });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};

export default subscribeConvertkit;
