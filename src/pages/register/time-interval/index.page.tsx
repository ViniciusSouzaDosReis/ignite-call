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
import { useFieldArray, useForm } from 'react-hook-form'
import { getWeekDays } from '@/utils/get-week-days'

export default function TimeIntervals() {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, isSelected: false, start: '09:00', end: '18:00' },
        { weekDay: 1, isSelected: true, start: '09:00', end: '18:00' },
        { weekDay: 2, isSelected: true, start: '09:00', end: '18:00' },
        { weekDay: 3, isSelected: true, start: '09:00', end: '18:00' },
        { weekDay: 4, isSelected: true, start: '09:00', end: '18:00' },
        { weekDay: 5, isSelected: true, start: '09:00', end: '18:00' },
        { weekDay: 6, isSelected: false, start: '09:00', end: '18:00' },
      ],
    },
  })

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
                <Checkbox />
                <Text>{weekDays[interval.weekDay]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.start`)}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.end`)}
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
