'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  aspectRatioOptions,
  defaultValues,
  transformationTypes,
} from '@/constants'
import { CustomField } from './CustomField'
import { useState, useTransition } from 'react'
import { Fill, Prompt, Recolor } from './elements'
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils'
import MediaUploader from '../shared/MediaUploader'
import TransformedImage from '../shared/TransformedImage'
import { updateCredits } from '@/lib/actions/user.actions'

export type OnSelectFieldHandlerType = (
  value: string,
  onChangeField: (value: string) => void
) => void

export type OnInputChangeHandlerType = (
  fieldName: string,
  value: string,
  type: string,
  onChangeField: (value: string) => void
) => void

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type]
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [isTransforming, setIsTransforming] = useState(false)
  const [isPending, startTransition] = useTransition()

  const initialValues =
    data && action === 'Update'
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const onSelectFieldHandler = (
    ...[value, onChangeField]: Parameters<OnSelectFieldHandlerType>
  ): ReturnType<OnSelectFieldHandlerType> => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))

    setNewTransformation(transformationType.config)

    return onChangeField(value)
  }

  const onInputChangeHandler = (
    ...[
      fieldName,
      value,
      type,
      onChangeField,
    ]: Parameters<OnInputChangeHandlerType>
  ): ReturnType<OnInputChangeHandlerType> => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: value,
        },
      }))
    }, 1000)()

    return onChangeField(value)
  }

  const onTransformHandler = () => {
    setIsTransforming(true)

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    )

    setNewTransformation(null)

    startTransition(async () => {
      const creditFee = -1
      await updateCredits(userId, creditFee)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <CustomField
          control={form.control}
          name='title'
          formLabel='Image Title'
          className='w-full'
          render={({ field }) => <Input {...field} className='input-field' />}
        />

        {type === 'fill' && (
          <Fill
            control={form.control}
            onSelectFieldHandler={onSelectFieldHandler}
          />
        )}
        {(type === 'remove' || type === 'recolor') && (
          <div className='prompt-field'>
            <Prompt
              control={form.control}
              type={type}
              onInputChangeHandler={onInputChangeHandler}
            />
            {type === 'recolor' && (
              <Recolor
                control={form.control}
                onInputChangeHandler={onInputChangeHandler}
              />
            )}
          </div>
        )}

        <div className='media-uploader-field'>
          <CustomField
            control={form.control}
            name='publicId'
            className='flex size-full flex-col'
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Button
            type='button'
            className='submit-button capitalize'
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Apply Transformation'}
          </Button>

          <Button
            type='submit'
            className='submit-button capitalize'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformationForm
