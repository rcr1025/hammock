const sql = require("./db.js");

// constructor
const Property = function(property) {
  this.title = property.title;
  this.id = property.id;
  this.description = property.description;
  this.type = property.type;
  this.location = property.location;
  this.guests = property.guests;
  this.beds = property.beds;
  this.baths = property.baths;
  this.amenities = property.amenities;
  this.price = property.price;
  this.main_photo = property.main_photo;
  this.side_photo = property.side_photo;
  this.email = property.email;
};

Property.create = (newProperty, result) => {
  sql.query("INSERT INTO properties SET ?", newProperty, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created property: ", { id: res.insertId, ...newProperty });
    result(null, { id: res.insertId, ...newProperty });
  });
};

Property.findById = (id, result) => {
  sql.query(`SELECT * FROM properties WHERE id LIKE ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found property (via findOne): ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Property.findByLocation = (location, result) => {
  sql.query(`SELECT * FROM properties WHERE location LIKE ${location}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found property (via findOneLocation) : ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Property.getAll = (title, result) => {
  let query = "SELECT * FROM properties";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties by title: ", res);
    result(null, res);
  });
};

Property.getLocation = (location, result) => {
  let query = "SELECT * FROM properties";

  if (location) {
    query += ` WHERE location LIKE '%${location}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties by location: ", res);
    result(null, res);
  });
};

Property.getPrice = (price, result) => {

  let priceArr = price.split(",")
  let min = parseInt(priceArr[0]);
  let max = parseInt(priceArr[1]);

  let query = "SELECT * FROM properties";

  if (price) {
    console.log(` WHERE price BETWEEN '${min}' AND '${max}' `);
    query += ` WHERE price BETWEEN '${min}' AND '${max}' `;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties by price: ", res);
    result(null, res);
  });
};

/**
 * Gets all properties from the database with the specified types (used by search filter)
 * @param type A string structured as a comma separated list, containing list of property types
 */
Property.getType = (type, result) => {

  let query = "SELECT * FROM properties";

  if (type) {
    query += ` WHERE MATCH(type) against('%${type}%') `; // Uses fulltext index in SQL, requires "ALTER TABLE [tablename] ADD FULLTEXT index_name(type);"
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties by type: ", res);
    result(null, res);
  });
};

/**
 * Gets all properties from the database with the specified types (used by search filter)
 * @param amens A string structured as a comma separated list, containing list of property amenities
 */
Property.getAmenities = (amens, result) => {

  let query = "SELECT * FROM properties";

  if (amens) {
    query += ` WHERE MATCH(amenities) against('%${amens}%') `; // Uses fulltext index in SQL, requires "ALTER TABLE [tablename] ADD FULLTEXT index_name(amenities);"
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties by amenities: ", res);
    result(null, res);
  });
};

/**
 * Gets all properties from the database with the specified # of guests (used by search filter)
 * @param guests An integer representing number of guests
 */
Property.getGuests = (guests, result) => {

  let query = "SELECT * FROM properties";

  if (guests) {
    query += ` WHERE guests >= '${guests}' `;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties by # of guests: ", res);
    result(null, res);
  });
};

Property.getLocationAndPrice = (location, price, result) => {
  let query = "SELECT * FROM properties";

  if (price) {
    query += ` WHERE price LIKE '%${price}%' AND location LIKE '%${location}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("properties by price/location: ", res);
    result(null, res);
  });
};


Property.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE properties SET title = ?, description = ? WHERE id = ?",
    [tutorial.title, tutorial.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Property.remove = (id, result) => {
  sql.query("DELETE FROM properties WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Property.removeAll = result => {
  sql.query("DELETE FROM properties", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} properties`);
    result(null, res);
  });
};

module.exports = Property;
