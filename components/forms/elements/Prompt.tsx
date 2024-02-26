import { Control } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '../TransformationForm'
import { CustomField } from '../CustomField'
import { Input } from '@/components/ui/input'

type Props = {
  control: Control<z.infer<typeof formSchema>> | undefined
  type: string
  onInputChangeHandler: (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => void
}

const Prompt = ({ control, type, onInputChangeHandler }: Props) => {
  return (
    <CustomField
      control={control}
      name='prompt'
      formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
      className='w-full'
      render={({ field }) => (
        <Input
          value={field.value}
          className='input-field'
          onChange={(e) =>
            onInputChangeHandler('prompt', e.target.value, type, field.onChange)
          }
        />
      )}
    />
  )
}

export default Prompt
