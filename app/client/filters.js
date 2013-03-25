var filters = {

  cssFilter: function () {

    return function (input) {

      if (input.status === 'ENOTFOUND' || input.status === 'ECONNREFUSED' || input.status.toString().indexOf('5') === 0) {
        return 'error';
      }

      if (input.status.toString().indexOf('4') === 0) {
        return 'status-4xx';
      }

      if (input.status.toString().indexOf('3') === 0) {
        return 'status-3xx';
      }

      if (input.status.toString().indexOf('2') === 0) {
        return 'status-2xx';
      }

    };

  },

  nameFilter: function () {

    return function (input) {

      if (input.status === 'ENOTFOUND') {
        return 'Not found';
      }

      if (input.status === 'ECONNREFUSED') {
        return 'Refushed';
      }

      return input.status;

    };

  },

  tinyUrlFilter: function () {

    return function (input) {

      input = input.replace(/http(s)?:\/\//, '');

      if (input.length > 20) {
        input = input.substr(0, 20) + '..';
      }

      return input;

    };

  }

};

module.exports = filters;
