function SendDataError(status, response) {
    this.name = "SendCryptionError";
    this.status = status || 401;
    this.response = response || "Not authorized";
}
SendDataError.prototype = Object.create(Error.prototype);
SendDataError.prototype.constructor = SendDataError;

module.exports = SendDataError;

