import React, { useId } from 'react'
import Upload from '../components/Upload'
import SelectBox from '../components/SelectBox'
import { useFunds } from '../hooks/useFilters'
import Button from '../components/Button'
import { z } from 'zod'

const donationSchema = z.object({
  file: z.instanceof(File),
  amount: z.number().gt(0),
  fundId: z.string(),
})

export type DonationModel = z.infer<typeof donationSchema>

const submitHandler: React.FormEventHandler = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)
  const data = Object.fromEntries(formData)

  console.log({ formData, data })
}

const Donation = () => {
  const { fundOptions, setFundId, fundId } = useFunds()
  const amountInputId = useId()
  return (
    <section className="donation">
      <div className="donation__container container">
        <h1>Register Donation</h1>
        <form onSubmit={submitHandler} className="donation__form">
          <fieldset className="fieldset">
            <label htmlFor={amountInputId}>US Dollar</label>
            <input
              className="amount"
              type="number"
              min={0}
              name="amount"
              id={amountInputId}
              step={5}
              placeholder="Amount"
            />
          </fieldset>
          <SelectBox
            className="stretched"
            name="fundId"
            placeholder="Funding"
            options={fundOptions}
            onChange={setFundId}
          ></SelectBox>
          {/* <Upload text='Upload Screenshot' name="file" /> */}
          <input type="file" name="file" />
          <Button type="submit" className="submit-btn stretched">
            Submit
          </Button>
        </form>
      </div>
    </section>
  )
}

export default Donation
