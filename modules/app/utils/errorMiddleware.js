export const withErrorHandling = (handler) => async (req, res) => {
  try {
    await handler(req, res)
  } catch (error) {
    console.error('Error:', error)
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    })
  }
}
