import React, { FormEvent, FormEventHandler, useEffect, useRef, useState } from 'react'
import Upload from './Upload'
import { useFilters } from '../hooks/useFilters'
import SelectBox from './SelectBox'
import { authAPI } from '../store/auth/service'
import { UpdateProfileArgs } from '../store/auth/types'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setProfile } from '../store/auth/slice'
import { z } from 'zod'
import { useFormik } from 'formik'

const updateProfileFormSchema = z
  .object({
    avatar: z.instanceof(File),
    cityId: z.string(),
    countryId: z.string(),
    districtId: z.string(),
    teamName: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      })
    }
  })

type UpdateProfileFormModel = z.infer<typeof updateProfileFormSchema>
interface ProfileSettingsProps {
  isOpened: boolean
  onClose: () => void
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isOpened, onClose }) => {
  const profile = useAppSelector((state) => state.auth.profile)
  const [updateProfile, { isError, isLoading }] = authAPI.useUpdateProfileMutation()
  const dispatch = useAppDispatch()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { cityOptions, countryOptions, districtOptions, setCountryId, setCityId, setDistrictId } =
    useFilters()
  const formik = useFormik({
    initialValues: {
      teamName: profile?.teamName || '',
    },
    onSubmit: async (values) => {
      console.log(values)
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal()
      document.body.classList.add('lock') // prevent bg scroll
    } else {
      dialogRef.current?.close()
      document.body.classList.remove('lock')
    }
  }, [isOpened])

  const submitHandler: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData) as unknown as UpdateProfileFormModel

    const profileArgs: Partial<UpdateProfileArgs> = {
      avatar: data.avatar?.name ? data.avatar : undefined,
      cityId: Number(data.cityId) || undefined,
      countryId: Number(data.countryId) || undefined,
      districtId: Number(data.districtId) || undefined,
      password: data.password || undefined,
      teamName: data.teamName || undefined,
    }
    try {
      const response = await updateProfile(profileArgs).unwrap()
      console.log(JSON.stringify(response, null, 2))
      if (response.__typename === 'Profile') {
        const { __typename, ...profile } = response
        dispatch(setProfile(profile))
        dispatch(authAPI.util.invalidateTags(['MyStatistic']))
        onClose()
      } else if (response.__typename === 'AuthError') {
        console.log('AuthError: ', response.message)
      } else if (response.__typename === 'ValidationErrors') {
        console.log('ValidationErrors: ', response.errors)
      }
    } catch (error) {
      console.error(error)
    }
  }

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
      <form method="dialog" className="profile-settings__form" onSubmit={submitHandler}>
        <h1>Profile settings</h1>
        <Upload text="Upload icon" name="avatar" />
        <input
          className="profile-settings__team input"
          type="text"
          name="teamName"
          placeholder="Team name"
          defaultValue={profile?.teamName}
        />

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

        <input
          className="profile-settings__password input"
          type="password"
          placeholder="New password"
          name="password"
        />
        <input
          className="profile-settings__confirm-password input"
          type="password"
          placeholder="Confirm new password"
          name="confirmPassword"
        />
        <button type="submit" className="profile-settings__submit-btn btn_black">
          <div className="btn__text">save</div>
        </button>
      </form>
    </dialog>
  )
}

export default ProfileSettings
