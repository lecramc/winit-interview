import React from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'

function LoginForm({ onSubmit }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        p={3}
        boxShadow={3}
        borderRadius={2}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                variant="outlined"
                size="small"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                fullWidth
                margin="normal"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                variant="outlined"
                size="small"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
                fullWidth
                margin="normal"
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            sx={{ mt: 2 }}
          >
            Log In
          </Button>

          <Box mt={2}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="/register" replace>
                Sign up
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default LoginForm
