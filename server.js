const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

 app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

 function isPrime(num) {
  const n = Number(num);
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function getHighestLowercaseAlphabet(arr) {
  const lowercaseAlphabets = arr.filter(char => 
    typeof char === 'string' && char.match(/[a-z]/)
  );
  
  return lowercaseAlphabets.length > 0 
    ? [lowercaseAlphabets.sort().reverse()[0]] 
    : [];
}

 app.post('/bfhl', (req, res) => {
  try {
    const { data, file_b64 } = req.body;

     if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

     const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => 
      typeof item === 'string' && /[a-zA-Z]/.test(item)
    );

     const response = {
      is_success: true,
      user_id: 'RISHIKESH_PAWAR_13122003',  
      email: 'rishikeshpawar210492@acropolis.in',
      roll_number: '0827CI211156',
      numbers,
      alphabets,
      highest_lowercase_alphabet: getHighestLowercaseAlphabet(alphabets),
      is_prime_found: numbers.some(isPrime),
      file_valid: !!file_b64,
      file_mime_type: file_b64 ? 'image/png' : null,
      file_size_kb: file_b64 ? Math.round(file_b64.length / 1024) : 0
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      is_success: false, 
      error: error.message 
    });
  }
});

 app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});