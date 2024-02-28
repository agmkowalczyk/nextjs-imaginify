import { Control } from 'react-hook-form'
import { z } from 'zod'
import { OnInputChangeHandlerType, formSchema } from '../TransformationForm'
import { CustomField } from '../CustomField'
import { Input } from '@/components/ui/input'

type Props = {
  control: Control<z.infer<typeof formSchema>> | undefined
  onInputChangeHandler: OnInputChangeHandlerType
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
