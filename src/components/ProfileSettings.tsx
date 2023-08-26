import React, { useEffect, useRef } from 'react'
import Upload from './Upload'
import { useFilters } from '../hooks/useFilters'
import SelectBox from './SelectBox'
import { authAPI } from '../store/auth/service'
import type { UpdateProfileArgs } from '../store/auth/types'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setProfile } from '../store/auth/slice'
import { z } from 'zod'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Input from './Input'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { uploadAPI } from '../store/upload/service'

const updateProfileFormSchema = z
  .object({
    avatar: z.string().optional(), //instanceof(File).optional(),
    cityId: z.number().optional(),
    countryId: z.number().optional(),
    districtId: z.number().optional(),
    teamName: z.string().optional(),
    password: z.string().min(3, 'Password should be at least 3 characters long').optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: `The 'password' and 'confirm password' fields must match`,
        path: ['confirmPassword'],
      })
    }
  })

// type UpdateProfileFormModel = z.infer<typeof updateProfileFormSchema>
interface ProfileSettingsProps {
  isOpened: boolean
  onClose: () => void
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isOpened, onClose }) => {
  const profile = useAppSelector((state) => state.auth.profile)
  const [updateProfile, { isLoading }] = uploadAPI.useUpdateProfileMutation()
  const dispatch = useAppDispatch()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const {
    cityOptions,
    countryOptions,
    districtOptions,
    setCountryId,
    setCityId,
    setDistrictId,
    cityId,
    districtId,
    countryId,
  } = useFilters()
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal()
      document.body.classList.add('lock') // prevent bg scroll
    } else {
      dialogRef.current?.close()
      document.body.classList.remove('lock')
    }
  }, [isOpened])

  const dialogClickHandler: React.MouseEventHandler = (e) => {
    const dialogDimensions = e.currentTarget.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose()
    }
  }

  return (
    <dialog
      className="profile-settings"
      ref={dialogRef}
      onCancel={onClose}
      onClick={dialogClickHandler}
    >
      <Formik
        enableReinitialize
        validationSchema={toFormikValidationSchema(updateProfileFormSchema)}
        initialValues={{
          teamName: profile?.teamName || '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, { setFieldError }) => {
          const variables: UpdateProfileArgs = {
            avatar: null, // The 'avatar' variable will be populated by the FormData
            teamName: values.teamName,
            countryId: Number(countryId),
            cityId: Number(cityId),
            districtId: Number(districtId),
            password: values.password,
          }
          const file = fileRef.current?.files![0]

          try {
            const response = await updateProfile({ variables, file }).unwrap()
            switch (response.__typename) {
              case 'Profile':
                const { __typename, ...profile } = response
                dispatch(setProfile(profile))
                dispatch(authAPI.util.invalidateTags(['MyStatistic']))
                onClose()
                break
              case 'ValidationErrors':
                response.errors.forEach((error) => setFieldError(error.key, error.message))
                break
              case 'AuthError':
                console.log(response.message)
                break
              default:
                throw new Error('Unexpected __typename in response')
            }
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form method="dialog" className="profile-settings__form">
            <h1>Profile settings</h1>
            {/* <input
              ref={fileRef}
              type="file"
              name="avatar"
              // onChange={(e) => setFieldValue('avatar', e.target.files![0])}
              accept="image/png, image/jpeg, image/jpg"
            /> */}
            <Upload
              text="Upload icon"
              name="avatar"
              ref={fileRef}
              accept="image/png, image/jpeg, image/jpg"
            />
            <ErrorMessage name="avatar" />
            <Field name="teamName" placeholder="Team name" errorMsg={errors.teamName} as={Input} />
            <SelectBox
              name="countryId"
              placeholder="Country"
              options={countryOptions}
              onChange={setCountryId}
              selectedValue={profile?.country?.id}
            />
            <SelectBox
              name="cityId"
              placeholder="City"
              options={cityOptions}
              onChange={setCityId}
              selectedValue={profile?.city?.id}
            />
            <SelectBox
              name="districtId"
              placeholder="District"
              options={districtOptions}
              onChange={setDistrictId}
              selectedValue={profile?.district?.id}
            />
            <Field
              // className="profile-settings__password input"
              type="password"
              placeholder="New password"
              name="password"
              errorMsg={touched.password && errors.password}
              as={Input}
            />
            <Field
              // className="profile-settings__confirm-password input"
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              errorMsg={touched.confirmPassword && errors.confirmPassword}
              as={Input}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="profile-settings__submit-btn btn_black"
            >
              <div className="btn__text">save</div>
            </button>
          </Form>
        )}
      </Formik>
    </dialog>
  )
}

export default ProfileSettings
