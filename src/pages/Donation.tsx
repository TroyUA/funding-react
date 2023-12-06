import React, { useRef } from 'react'
import Upload from '../components/Upload'
import SelectBox from '../components/SelectBox'
import { useFunds } from '../hooks/useFilters'
import Button from '../components/Button'
import { z } from 'zod'
import Input from '../components/Input'
import { Field, Form, Formik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { uploadAPI } from '../store/upload/service'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../router'

const donationSchema = z.object({
  file: z
    .instanceof(File, { message: 'Select a file to upload' })
    .refine((file) => file.size < 1024 * 8, { message: 'File size should be less than 8Kb' }),
  amount: z.number().positive('Amount must be greater than 0'),
  fundId: z.string(),
})

export type DonationModel = z.infer<typeof donationSchema>

const Donation: React.FC = () => {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const { fundOptions, setFundId, fundId } = useFunds()
  const [registerDonate, { isLoading }] = uploadAPI.useRegisterDonateMutation()

  return (
    <section className="donation">
      <div className="donation__container container">
        <h1>Register Donation</h1>
        <Formik
          // enableReinitialize
          initialValues={{ amount: '', file: null, fundId }}
          validationSchema={toFormikValidationSchema(donationSchema)}
          onSubmit={async (values, { setFieldError }) => {
            const donation: DonationModel = {
              file: values.file!,
              amount: Number(values.amount),
              fundId: String(values.fundId),
            }
            try {
              const response = await registerDonate(donation).unwrap()
              switch (response.__typename) {
                case 'DonateResultSuccess': {
                  navigate(ROUTES.SUCCESS)
                  break
                }
                case 'ValidationErrors': {
                  response.errors.forEach((error) => setFieldError(error.key, error.message))
                  break
                }
                case 'AuthError': {
                  navigate(ROUTES.LOGIN)
                  break
                }
              }
            } catch (error) {
              console.log(error)
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className="donation__form">
              <Field
                type="number"
                min={0}
                name="amount"
                placeholder="Amount"
                label="US Dollar"
                as={Input}
              />
              <SelectBox
                className="stretched"
                name="fundId"
                placeholder="Funding"
                options={fundOptions}
                onChange={setFundId}
              ></SelectBox>
              <Upload
                text="Upload Screenshot"
                name="file"
                accept="image/png, image/jpeg, image/jpg"
                ref={fileRef}
                onChange={(e) => setFieldValue('file', e.target.files![0])}
              />
              <Button type="submit" className="submit-btn" disabled={isLoading}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default Donation
