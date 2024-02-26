import { CustomField } from '../CustomField'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'
import { aspectRatioOptions } from '@/constants'
import { AspectRatioKey } from '@/lib/utils'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from '../TransformationForm'

type Props = {
  control: Control<z.infer<typeof formSchema>> | undefined
}

const Fill = ({ control }: Props) => {
  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {}

  return (
    <CustomField
      control={control}
      name='aspectRatio'
      formLabel='Aspect Ratio'
      className='w-full'
      render={({ field }) => (
        <Select
          onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
          value={field.value}
        >
          <SelectTrigger className='select-field'>
            <SelectValue placeholder='Select size' />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(aspectRatioOptions).map((key) => (
              <SelectItem key={key} value={key} className='select-item'>
                {aspectRatioOptions[key as AspectRatioKey].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  )
}

export default Fill
