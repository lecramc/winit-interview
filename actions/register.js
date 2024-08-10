import dbConnect from '@/utils/dbConnect'
const User = require('@/db-schemas/User')
const bcrypt = require('bcryptjs')

export const register = async (values) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Registration failed' };
    }

    return await response.json();
  } catch (error) {
    return { error: error.message || 'An error occurred during registration' };
  }
};
