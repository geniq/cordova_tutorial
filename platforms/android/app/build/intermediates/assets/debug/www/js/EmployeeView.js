var EmployeeView = function (employee) {
  this.initialize = function () {
    this.$el = $('<div/>');
    this.$el.on('click', '.add-location-btn', this.addLocation);
    this.$el.on('click', '.add-contact-btn', this.addToContacts);
    this.$el.on('click', '.change-pic-btn', this.changePicture);
  };

  this.render = function () {
    this.$el.html(this.template(employee));
    return this;
  };

  this.addLocation = function () {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(
      function (position) {
        alert(position.coords.latitude + ',' + position.coords.longitude);
      },
      function () {
        alert('Error getting location');
      });
  };

  this.addToContacts = function () {
    event.preventDefault();
    console.log('addToContacts');
    if (!navigator.contacts) {
      alert("Contacts API not supported", "Error");
      return;
    }
    var contact = navigator.contacts.create();
    contact.name = {givenName: employee.firstName, familyName: employee.lastName};
    var phoneNumbers = [];
    phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
    phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true);
    contact.phoneNumbers = phoneNumbers;
    contact.save();
    return false;
  };

  this.changePicture = function (event) {
    event.preventDefault();
    if (!navigator.camera) {
      alert("Camera API not supported", "Error");
      return;
    }
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: 1,
      encodingType: 0};
    navigator.camera.getPicture(
      function (imgData) {
        $('.media-object', this.$el).attr('src', 'data:image/jpeg;base64,' + imgData);
      },
      function () {
        alert('Error taking picture', 'Error');
      },
      options);

      return false;
  };


  this.initialize();
}
