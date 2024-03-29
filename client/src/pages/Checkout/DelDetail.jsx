import React from 'react'

const DelDetail = () => {
  return (
    <div>
    {/* Form for delivery details */}
    <form>
      <label for="first_name">First name:</label>
      <br />
      <input
        type="text"
        id="first_name"
        name="first_name"
        value=""
        required
      />
      <br />
      <label for="last_name">Last name:</label>
      <br />
      <input
        type="text"
        id="last_name"
        name="last_name"
        value=""
        required
      />
      <br />
      <label for="phone">Phone:</label>
      <br />
      <input type="tel" id="phone" name="phone" value="" />
      <br />
      <label for="country_region">Country:</label>
      <br />
      <input
        type="text"
        id="country_region"
        name="country_region"
        value="India"
      />
      <br />
      <label for="address">Address:</label>
      <br />
      <input type="text" id="address" name="address" value="" />
      <br />
      <label for="city">City:</label>
      <br />
      <input type="text" id="city" name="city" value="" />
      <br />
      <label for="region">Region:</label>
      <br />
      <input type="text" id="region" name="region" value="" />
      <br />
      <label for="zip_postal_code">Zip/Postal code:</label>
      <br />
      <input
        type="text"
        id="zip_postal_code"
        name="zip_postal_code"
        value=""
      />
      <br />
    </form>
    {/* Button to save and continue to next section */}
    
  </div>
  )
}

export default DelDetail