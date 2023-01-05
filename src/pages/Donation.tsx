import React from 'react'
import Upload from '../components/Upload'

const Donation = () => {
  return (
    <section className="donation">
      <div className="donation-container container">
        <h1>Register Donation</h1>
        <form>
          <div>
            <label htmlFor="amount">US Dollar</label>
            <input
              type="number"
              min={5}
              className="input"
              name="amount"
              id="amount"
              placeholder="Amount"
            />
          </div>
          <select name="funding" id="funding">
            <option selected hidden>
              Funding
            </option>
          </select>
          <Upload text={'Upload Screenshot'} />
        </form>
      </div>
    </section>
  )
}

export default Donation
