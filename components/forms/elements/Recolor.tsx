import { Control } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '../TransformationForm'
import { CustomField } from '../CustomField'
import { Input } from '@/components/ui/input'

type Props = {
  control: Control<z.infer<typeof formSchema>> | undefined
  onInputChangeHandler: (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => void
}

const Recolor = ({ control, onInputChangeHandler }: Props) => {
  return (
    <CustomField
      control={control}
      name='color'
      formLabel='Replacement Color'
      className='w-full'
      render={({ field }) => (
        <Input
          value={field.value}
          className='input-field'
          onChange={(e) =>
            onInputChangeHandler(
              'color',
              e.target.value,
              'recolor',
              field.onChange
            )
          }
        />
      )}
    />
  )
}

export default Recolor
