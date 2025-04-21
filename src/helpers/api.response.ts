const apiResponse = (payload = {}) => {
    const DataSymbol = Symbol('data');
    const StatusSymbol = Symbol('status');
    const ErrorsSymbol = Symbol('errors');
    const MessageSymbol = Symbol('message');
  
    class ApiResponse {
      constructor({ data = {}, status = 1, errors = [], message = '' }) {
        this.data = data;
        this.status = status;
        this.errors = errors;
        this.message = message;
      }
  
      get data() {
        return this[DataSymbol];
      }
  
      set data(data) {
        if (typeof data === 'undefined') throw new Error('Data must be defined');
        this[DataSymbol] = data;
      }
  
      get status() {
        return this[StatusSymbol];
      }
  
      set status(status) {
        this[StatusSymbol] = status;
      }
  
      get errors() {
        return this[ErrorsSymbol];
      }
  
      set errors(errors) {
        if (!Array.isArray(errors)) throw new Error('Errors must be an array');
        this[ErrorsSymbol] = errors;
      }
  
      get message() {
        return this[MessageSymbol];
      }
  
      set message(message) {
        if (typeof message !== 'string')
          throw new Error('Message must be a string');
        this[MessageSymbol] = message;
      }
  
      toJSON() {
        return {
          data: this.data,
          status: this.status,
          errors: this.errors.map((e: any) => (e.stack ? e.stack : e)),
          message: this.message,
        };
      }
    }
  
    return new ApiResponse(payload);
  };
  
  export default apiResponse;
  