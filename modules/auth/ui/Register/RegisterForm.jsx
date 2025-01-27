import React from 'react'
import { Box, Container, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { registerUsecase } from '@/modules/auth/core/usecases/register.usecase.js'
import useStore from '@/modules/app/hooks/useStore.js'
import CustomButton from '@/modules/app/components/buttons/Button.jsx'

function RegisterForm() {
  const store = useStore()
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm()
  const password = watch('password')

  const onSubmit = (data) => {
    registerUsecase(data)(store)
  }

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
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Complete name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Firstname Lastname"
                variant="outlined"
                size="small"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                fullWidth
                margin="normal"
              />
            )}
          />

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

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                variant="outlined"
                size="small"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
                fullWidth
                margin="normal"
              />
            )}
          />

          <CustomButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="small"
            sx={{ mt: 2 }}
          >
            Sign Up
          </CustomButton>

          <Box mt={2}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/login" color="primary">
                Log in
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

export default RegisterForm
