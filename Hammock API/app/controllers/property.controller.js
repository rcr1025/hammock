const Property = require("../models/property.model.js");

// Create and Save a new Property
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Property
  const property = new Property({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    location: req.body.location,
    guests: req.body.guests,
    beds: req.body.beds,
    baths: req.body.baths,
    amenities: req.body.amenities,
    price: req.body.price,
    main_photo: req.body.main_photo,
    side_photo: req.body.side_photo,
    email: req.body.email
  });

  // Save Tutorial in the database
  Property.create(property, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the property."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with given condition). Called by '/api/properties/...' route
exports.findAll = (req, res) => {

  // Search for properties by location
  if (req.query.hasOwnProperty('location')) {
      const location = req.query.location;

      // Call to model class to create SQL query and retrieve properties
      Property.getLocation(location, (err, data) => {
        if (err)
          res.status(500).send({
            message:
                err.message || "Error occurred while retrieving properties by location."
          });
        else {
          console.log(`Property with location ${location} was found!` );
          res.send(data);
        }
      });
    }

  // Search by combination of location and price
  else if (req.query.hasOwnProperty('location') && req.query.hasOwnProperty('price')) {
    const location = req.query.location;
    const price = req.query.price;
    Property.getLocationAndPrice(location, price,(err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by location/price."
        });
      else {
        console.log(`Property with location ${location} and price ${price} was found!` );
        res.send(data);
      }
    });
  }

  // Search for properties by price
  else if (req.query.hasOwnProperty('price')) {
    const price = req.query.price;
    Property.getPrice(price, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by price."
        });
      else {
        console.log(`Property with price ${price} was found!` );
        res.send(data);
      }
    });
  }

  // Search for properties by type (eg, hotel, apartment, etc.)
  else if (req.query.hasOwnProperty('type')) {
    const type = req.query.type;
    Property.getType(type, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by property type."
        });
      else {
        console.log(`Property with type ${type} was found!` );
        res.send(data);
      }
    });
  }

  // Search for properties by amenities (eg, 'free breakfast', 'parking', etc.)
  else if (req.query.hasOwnProperty('amenities')) {
    const amens = req.query.amenities;
    Property.getAmenities(amens, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by property amenities."
        });
      else {
        console.log(`Property with amenities ${amens} was found!` );
        res.send(data);
      }
    });
  }

  // Search for properties by type (eg, hotel, apartment, etc.)
  else if (req.query.hasOwnProperty('guests')) {
    const guests = req.query.guests;
    Property.getGuests(guests, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Error occurred while retrieving properties by property # of guests."
        });
      else {
        console.log(`Property with ${guests} or more guests was found!` );
        res.send(data);
      }
    });
  }

  // Default search (retrieves all properties)
  else  {
    const title = req.query.title;
    Property.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving properties."
        });
      else {
        console.log(`Property with ${title} title was found!`);
        res.send(data);
      }
    });

  }
};

// Find a single Property by Id
exports.findOne = (req, res) => {
  Property.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `(findOne) Not found Property with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "(findOne) Error retrieving Property with id " + req.params.id
        });
      }
    } else {
        console.log(`findOne called` );
        res.send(data);
    }
  });
};

// Find single property by location (':/location' route)
exports.findOneLocation = (req, res) => {
  Property.findByLocation(req.params.location, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Property with location ${req.params.location}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Property with location " + req.params.location
        });
      }
    } else {
      console.log("findOneLocation called")
      res.send(data);
    }
  });
};



// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Property.updateById(
    req.params.id,
    new Property(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Property with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Property with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Property with the specified id in the request
exports.delete = (req, res) => {
  Property.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Property with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Properties from the database.
exports.deleteAll = (req, res) => {
  Property.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all properties."
      });
    else res.send({ message: `All Properties were deleted successfully!` });
  });
};
