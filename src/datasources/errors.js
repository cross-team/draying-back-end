export const serverErrorUpdateResponse = error => ({
  success: false,
  message: error.extensions.response.body.message,
  updatedId: null,
})
