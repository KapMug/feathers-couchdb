import errors from '@feathersjs/errors'

export default function errorHandler(error) {
  let feathersError = error
  if (error.name === 'CouchError') {
    const ErrorType = (error.code === 404 || error.headers.status === 404) ? errors.NotFound : errors.GeneralError
    feathersError = new ErrorType(error, {
      ok: error.ok,
      code: error.code,
    })
  }

  throw feathersError
}
