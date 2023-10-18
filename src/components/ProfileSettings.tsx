import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useFilters } from '../hooks/useFilters'
import { authAPI } from '../store/auth/service'
import { setProfile } from '../store/auth/slice'
import { uploadAPI } from '../store/upload/service'
import Button from './Button'
import Input from './Input'
import SelectBox from './SelectBox'
import Upload from './Upload'

const updateProfileFormSchema = z
  .object({
    avatar: z
      .instanceof(File)
      .refine(
        (file) => {
          if (file) return file.size < 1024 * 8
        },
        { message: 'File size should be less than 8Kb ' }
      )
      .nullish(),
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

export type UpdateProfileModel = z.infer<typeof updateProfileFormSchema>
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
          avatar: null,
          teamName: profile?.teamName || '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, { setFieldError }) => {
          const dto: Omit<UpdateProfileModel, 'confirmPassword'> = {
            avatar: fileRef.current?.files![0],
            teamName: values.teamName,
            countryId: Number(countryId),
            cityId: Number(cityId),
            districtId: Number(districtId),
            password: values.password,
          }

          try {
            const response = await updateProfile(dto).unwrap()
            if (!response)
              throw new Error(
                'Null response during profile update (Probably, there is no "images" directory created on the backend)'
              )
            switch (response.__typename) {
              case 'Profile':
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                throw new Error(`Unexpected response`)
            }
          } catch (error) {
            console.log(error)
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form method="dialog" className="profile-settings__form">
            <h1>Profile settings</h1>
            <Upload
              text="Upload icon"
              name="avatar"
              ref={fileRef}
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => setFieldValue('avatar', e.target.files![0])}
            />
            <Field name="teamName" placeholder="Team name" as={Input} />
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
            <Field type="password" placeholder="New password" name="password" as={Input} />
            <Field
              type="password"
              placeholder="Confirm new password"
              name="confirmPassword"
              as={Input}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="profile-settings__submit-btn btn_black"
            >
              <div className="btn__text">save</div>
            </Button>
          </Form>
        )}
      </Formik>
    </dialog>
  )
}

export default ProfileSettings
