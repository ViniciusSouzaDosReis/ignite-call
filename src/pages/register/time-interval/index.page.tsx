import {
  Heading,
  MultiStep,
  Checkbox,
  TextInput,
  Button,
  Text,
} from '@poc-design-system-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalItem,
  IntervalDay,
  IntervalInputs,
} from './styles'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { getWeekDays } from '@/utils/get-week-days'

export default function TimeIntervals() {
  const { control, handleSubmit, register, watch } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, start: '09:00', end: '18:00' },
        { weekDay: 1, enabled: true, start: '09:00', end: '18:00' },
        { weekDay: 2, enabled: true, start: '09:00', end: '18:00' },
        { weekDay: 3, enabled: true, start: '09:00', end: '18:00' },
        { weekDay: 4, enabled: true, start: '09:00', end: '18:00' },
        { weekDay: 5, enabled: true, start: '09:00', end: '18:00' },
        { weekDay: 6, enabled: false, start: '09:00', end: '18:00' },
      ],
    },
  })
  const watchIntervals = watch('intervals')

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  const weekDays = getWeekDays()

  function handleSetTimeIntervals() {}

  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horário que você está disponível em cada dia da
          semana.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((interval, index) => (
            <IntervalItem key={interval.id}>
              <IntervalDay>
                <Controller
                  control={control}
                  name={`intervals.${index}.enabled`}
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked: boolean | 'indeterminate') =>
                        field.onChange(checked === true)
                      }
                    />
                  )}
                />
                <Text>{weekDays[interval.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.start`)}
                  disabled={!watchIntervals[index].enabled}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.end`)}
                  disabled={!watchIntervals[index].enabled}
                />
              </IntervalInputs>
            </IntervalItem>
          ))}
        </IntervalContainer>
        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
